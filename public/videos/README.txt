Drop video files here.

A file at   public/videos/low-orbit.mp4
is served at  /videos/low-orbit.mp4

Reference that path in src/routes/index.tsx:
  - hero loop:  const heroVideoUrl = "/videos/hero.mp4";
  - a project:  video: "/videos/low-orbit.mp4"

Keep self-hosted files small (under ~10MB). For finished films, paste a
YouTube or Vimeo link into a project's `video` field instead — it streams
better and costs you no bandwidth.
