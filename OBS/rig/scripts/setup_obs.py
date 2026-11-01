"""Task 3: build the Hackathon OBS profile and scene collection. Safe to rerun.

OBS creates its own profile and collection over the websocket. Only the encoder
settings go in a file, because the websocket can't set them.
"""
import base64
import json
import re
import secrets
import sys
import time
from pathlib import Path

import obs_client as oc

RECORD_DIR = "D:/OBS Outputs/To process"
ENCODER = "obs_nvenc_h264_tex"  # Read from obs-nvenc.dll in OBS 33.0.0.
ENCODER_SETTINGS = {
    "rate_control": "CQP",
    "cqp": 21,
    "preset2": "p5",
    "tune": "hq",
    "multipass": "disabled",
    "profile": "high",
    "keyint_sec": 2,
    "bf": 2,
}
PROFILE_PARAMS = [
    ("Output", "Mode", "Advanced"),
    ("AdvOut", "RecType", "Standard"),
    ("AdvOut", "RecFilePath", RECORD_DIR),
    ("AdvOut", "RecFormat2", "hybrid_mp4"),
    ("AdvOut", "RecEncoder", ENCODER),
    ("AdvOut", "RecTracks", "7"),  # Tracks 1, 2 and 3 (R2).
    ("AdvOut", "RecSplitFile", "true"),
    ("AdvOut", "RecSplitFileType", "Time"),
    ("AdvOut", "RecSplitFileTime", "15"),
]
WIDTH, HEIGHT, FPS = 1920, 1080, 30


def enable_websocket() -> None:
    """Turn the server on and set a password. OBS must be closed."""
    password = oc.read_env().get("OBS_WS_PASSWORD")
    if not password:
        password = secrets.token_urlsafe(24)
        oc.write_env_value("OBS_WS_PASSWORD", password)
    config = json.loads(oc.WEBSOCKET_CONFIG.read_text(encoding="utf-8"))
    config.update(
        server_enabled=True,
        server_port=oc.WS_PORT,
        auth_required=True,
        server_password=password,
        alerts_enabled=False,
        first_load=False,
    )
    oc.WEBSOCKET_CONFIG.write_text(json.dumps(config, indent=4), encoding="utf-8")


def wait_until(check, limit: float = 15) -> None:
    """OBS applies profile and collection changes after replying, so poll for them."""
    deadline = time.monotonic() + limit
    while not check():
        if time.monotonic() > deadline:
            raise TimeoutError("OBS didn't apply the change in time")
        time.sleep(0.25)


def use_profile(client) -> None:
    current = lambda: client.get_profile_list().current_profile_name  # noqa: E731
    if oc.PROFILE not in client.get_profile_list().profiles:
        client.create_profile(oc.PROFILE)
        wait_until(lambda: oc.PROFILE in client.get_profile_list().profiles)
    elif current() != oc.PROFILE:
        client.set_current_profile(oc.PROFILE)
    wait_until(lambda: current() == oc.PROFILE)


def use_collection(client) -> None:
    listing = client.get_scene_collection_list
    current = lambda: listing().current_scene_collection_name  # noqa: E731
    if oc.COLLECTION not in listing().scene_collections:
        client.create_scene_collection(oc.COLLECTION)
        wait_until(lambda: oc.COLLECTION in listing().scene_collections)
    elif current() != oc.COLLECTION:
        client.set_current_scene_collection(oc.COLLECTION)
    wait_until(lambda: current() == oc.COLLECTION)


def build(client) -> None:
    use_profile(client)
    use_collection(client)

    for category, name, value in PROFILE_PARAMS:
        client.set_profile_parameter(category, name, value)
    client.set_video_settings(FPS, 1, WIDTH, HEIGHT, WIDTH, HEIGHT)

    scenes = [s["sceneName"] for s in client.get_scene_list().scenes]
    if oc.SCENE not in scenes:
        client.create_scene(oc.SCENE)
    client.set_current_program_scene(oc.SCENE)
    for name in scenes:
        if name != oc.SCENE:
            client.remove_scene(name)

    inputs = [i["inputName"] for i in client.get_input_list().inputs]
    if oc.SCREEN_INPUT not in inputs:
        client.create_input(oc.SCENE, oc.SCREEN_INPUT, "monitor_capture", {}, True)

    items = client.get_input_properties_list_property_items(
        oc.SCREEN_INPUT, "monitor_id"
    ).property_items
    monitors = []
    for item in items:
        print(f"  monitor option: {item['itemName']}")
        found = re.search(r"(\d+)x(\d+) @ (-?\d+),(-?\d+)", item["itemName"])
        if found:
            monitors.append((int(found[3]), int(found[1]), item))
    left_x, left_width, left = min(monitors, key=lambda m: m[0])
    if left_x >= 0 or left_width != WIDTH:
        raise RuntimeError(f"Leftmost monitor isn't the expected one: {left['itemName']}")
    client.set_input_settings(
        oc.SCREEN_INPUT,
        {"monitor_id": left["itemValue"], "capture_cursor": True},
        True,
    )
    print(f"  chose: {left['itemName']}")
    configure_audio(client)


def track_map(*on: int) -> dict[str, bool]:
    return {str(n): n in on for n in range(1, 7)}


def configure_audio(client) -> None:
    """R2: mic on track 2, desktop on track 3, both mixed on track 1."""
    inputs = [i["inputName"] for i in client.get_input_list().inputs]
    if oc.MIC_INPUT not in inputs:
        client.create_input(oc.SCENE, oc.MIC_INPUT, "wasapi_input_capture", {}, True)
    if oc.DESKTOP_INPUT not in inputs:
        client.create_input(
            oc.SCENE, oc.DESKTOP_INPUT, "wasapi_output_capture", {"device_id": "default"}, True
        )

    devices = client.get_input_properties_list_property_items(
        oc.MIC_INPUT, "device_id"
    ).property_items
    mic = next(d for d in devices if d["itemName"] == oc.MIC_DEVICE)
    client.set_input_settings(oc.MIC_INPUT, {"device_id": mic["itemValue"]}, True)

    client.set_input_audio_tracks(oc.MIC_INPUT, track_map(1, 2))
    client.set_input_audio_tracks(oc.DESKTOP_INPUT, track_map(1, 3))
    print(f"  mic device: {mic['itemName']}")


def write_encoder_settings() -> None:
    """OBS reads this file when the profile loads, so OBS must be closed."""
    path = oc.OBS_CONFIG / "basic" / "profiles" / oc.PROFILE / "recordEncoder.json"
    path.write_text(json.dumps(ENCODER_SETTINGS, indent=4), encoding="utf-8")


def verify(client, shot: Path) -> bool:
    version = client.get_version()
    profile = client.get_profile_list().current_profile_name
    collection = client.get_scene_collection_list().current_scene_collection_name
    print(f"  OBS {version.obs_version}, websocket {version.obs_web_socket_version}")
    print(f"  profile: {profile}, scene collection: {collection}")

    ok = profile == oc.PROFILE and collection == oc.COLLECTION
    for category, name, value in PROFILE_PARAMS:
        stored = client.get_profile_parameter(category, name).parameter_value
        match = stored == value
        ok &= match
        print(f"  [{category}] {name} = {stored}{'' if match else f' (wanted {value})'}")

    video = client.get_video_settings()
    print(
        f"  video: {video.base_width}x{video.base_height} to "
        f"{video.output_width}x{video.output_height} at {video.fps_numerator} fps"
    )
    ok &= video.base_width == WIDTH and video.output_width == WIDTH

    wanted_tracks = {oc.MIC_INPUT: track_map(1, 2), oc.DESKTOP_INPUT: track_map(1, 3)}
    for name, tracks in wanted_tracks.items():
        stored = client.get_input_audio_tracks(name).input_audio_tracks
        match = stored == tracks
        ok &= match
        print(f"  {name} tracks: {[n for n, on in stored.items() if on]}"
              f"{'' if match else ' (wrong)'}")

    record = client.get_record_status()
    print(f"  GetRecordStatus answered: active={record.output_active}")
    print(f"  record directory: {client.get_record_directory().record_directory}")

    data = client.get_source_screenshot(oc.SCREEN_INPUT, "png", 480, 270, -1).image_data
    shot.write_bytes(base64.b64decode(data.split(",", 1)[1]))
    return ok


def main() -> int:
    if oc.is_running():
        print("OBS is already running. Close it first.")
        return 1
    shot = Path(sys.argv[1])

    enable_websocket()
    print("Step 1: OBS builds the profile and scene collection")
    proc = oc.launch()
    client = None
    try:
        client = oc.wait_for_websocket()
        build(client)
    finally:
        print(f"  closed cleanly: {oc.close(proc, client)}")

    write_encoder_settings()

    print("Step 2: reopen on the profile and verify")
    proc = oc.launch("--profile", oc.PROFILE, "--collection", oc.COLLECTION)
    client = None
    try:
        client = oc.wait_for_websocket()
        passed = verify(client, shot)
    finally:
        print(f"  closed cleanly: {oc.close(proc, client)}")

    print("PASS" if passed else "FAIL")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
