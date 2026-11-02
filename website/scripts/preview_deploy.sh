#!/usr/bin/env bash
# PREVIEW deploy of HEAD with the new site on (NEW_SITE=1), the 94-post wall (WALL_FULL=1) /videos (VIDEO_WALL=1) and /skills (SKILLS_PAGE=1). Never --prod.
#   bash scripts/preview_deploy.sh              export HEAD to $CLAUDE_JOB_DIR/tmp/clean-deploy, then deploy a preview
#   EXPORT_ONLY=1 bash scripts/preview_deploy.sh   export only (for a local check from that folder; see HANDOFF.md)
# Stop any dev server running in the export folder first: this deletes and rebuilds it.
set -e
cd "/c/Users/alder/Desktop/Hire me hackaton"
D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"
# A junctioned node_modules (local checks) must go first, by rmdir: a recursive delete would follow it
# into the real website\node_modules.
if [ -e "$D/node_modules" ]; then cmd //c rmdir "$(cygpath -w "$D/node_modules")"; fi
if [ -e "$D/node_modules" ]; then echo "node_modules junction still there, stopping"; exit 1; fi
rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/public/people" "$D/public/demos" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"
cp website/public/addvery/* "$D/public/addvery/"; cp website/public/people/* "$D/public/people/"
cp -r website/public/demos/linkedin-voice "$D/public/demos/"; cp website/app/demos/_og/glow.jpg "$D/app/demos/_og/"
cp -r website/public/about "$D/public/"
cp -r website/local/org-diagrams.json website/local/research website/local/about "$D/local/"
echo "wall-full files in export: $(ls "$D/public/about/wall-full" | wc -l)"
[ -n "$EXPORT_ONLY" ] && { echo "export only, no deploy"; exit 0; }
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --yes --build-env WALL_FULL=1 --build-env NEW_SITE=1 --build-env VIDEO_WALL=1 --build-env SKILLS_PAGE=1 2>&1
