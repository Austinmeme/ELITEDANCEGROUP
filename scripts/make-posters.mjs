/**
 * Regenerates public/posters/*.jpg — one still per clip in public/videos/,
 * used as each <video poster>. Run after adding or replacing a reel:
 *
 *   npm run posters
 *
 * Also remuxes any clip whose metadata sits at the end of the file. Browsers
 * cannot paint a frame until they have read that metadata, so such a clip has
 * to download in full before it shows anything — the reason the grid used to
 * stall. `-movflags +faststart` moves it to the front; `-c copy` keeps the
 * video stream untouched, so this costs no quality.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync, statSync, renameSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const VIDEOS = "public/videos";
const POSTERS = "public/posters";
const ffmpeg = process.env.FFMPEG ?? "ffmpeg";

mkdirSync(POSTERS, { recursive: true });

for (const file of readdirSync(VIDEOS).filter((f) => f.endsWith(".mp4"))) {
  const src = join(VIDEOS, file);
  const base = file.replace(/\.mp4$/, "");

  const tmp = join(tmpdir(), `faststart-${file}`);
  execFileSync(ffmpeg, ["-nostdin", "-v", "error", "-y", "-i", src, "-c", "copy", "-movflags", "+faststart", tmp]);
  if (statSync(tmp).size > 0) renameSync(tmp, src);

  execFileSync(ffmpeg, [
    "-nostdin", "-v", "error", "-y",
    "-ss", "0.5", "-i", src,
    "-frames:v", "1",
    "-vf", "scale='min(640,iw)':-2",
    "-q:v", "6",
    join(POSTERS, `${base}.jpg`),
  ]);
  console.log(`poster + faststart: ${file}`);
}
