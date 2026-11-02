// Build-time switches. Only a PREVIEW deploy sets them (`vercel deploy --build-env NEW_SITE=1`), so a
// production deploy from HEAD always builds today's live site until Alex says yes at a checkpoint
// (orchestration/assembly/VERDICT.md, W9 and W16). RULES.md rule 1: he sees every change on a preview.

/** The new structure from the verdict: the recommend carousel, the Your page pill, the restacks. */
export const NEW_SITE = process.env.NEW_SITE === "1";

/** /videos, the wall of his videos (VERDICT.md W13). Its own flag, because Alex promotes it on its own glance (M1). */
export const VIDEO_WALL = NEW_SITE && process.env.VIDEO_WALL === "1";

/** /skills, the reusable skills (VERDICT.md W14). Its own flag for the same reason. */
export const SKILLS_PAGE = NEW_SITE && process.env.SKILLS_PAGE === "1";

/** "production" on a `vercel deploy --prod` build, "preview" on any other Vercel build, else unset. */
export const IS_PRODUCTION_BUILD = process.env.VERCEL_ENV === "production";
