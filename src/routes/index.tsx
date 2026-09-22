import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  LoaderCircle,
  Mail,
  Menu,
  Play,
  Plus,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import dancerCatherine from "@/assets/dancer-catherine.jpg";
import dancerCrew from "@/assets/dancer-crew.jpg";
import dancerElliana from "@/assets/dancer-elliana.jpg";
import dancerHazel from "@/assets/dancer-hazel.jpg";
import dancerHoney from "@/assets/dancer-honey.jpg";
import dancerJessica from "@/assets/dancer-jessica.jpg";
import dancerKira from "@/assets/dancer-kira.jpg";
import dancerMimi from "@/assets/dancer-mimi.jpg";
import dancerOlivia from "@/assets/dancer-olivia.jpg";
import dancerRoxanne from "@/assets/dancer-roxanne.jpg";
import dancerSarah from "@/assets/dancer-sarah.jpg";
import dancerSelena from "@/assets/dancer-selena.jpg";
import dancerSofia from "@/assets/dancer-sofia.jpg";
import dancerStephanie from "@/assets/dancer-stephanie.jpg";
import dancerVenessa from "@/assets/dancer-venessa.jpg";
import heroImage from "@/assets/mirra-hero.jpg";
import heroVideo from "@/assets/mirra-hero.mp4.asset.json";
import proofDmPraise from "@/assets/proof-dm-praise.jpg";
import proofShoutoutLuka from "@/assets/proof-shoutout-luka.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Dance Group — Dance Films & Choreography" },
      {
        name: "description",
        content:
          "Elite Dance Group creates dance films, original choreography, and movement-led content for artists, musicians, and brands.",
      },
      { property: "og:title", content: "Elite Dance Group — Dance Films & Choreography" },
      {
        property: "og:description",
        content: "A movement studio for artists and brands that refuse to sit still.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MirraHome,
});

/* ---------------------------------------------------------------------------
   SITE CONTENT
   Everything below is a claim about the real world, so it all lives in one
   place. The `testimonials` and `resultsCaseStudy` sections do not render at
   all while they are empty, which is deliberate: an empty section is better
   than an invented one. Fill them in and they appear.
   --------------------------------------------------------------------------- */

/**
 * The muted loop behind the hero.
 *
 * The default below is a Lovable-hosted asset: `mirra-hero.mp4.asset.json` is a
 * pointer, not a file, and its URL only resolves inside the Lovable editor. On
 * localhost it 404s and the poster image shows instead — which is why the hero
 * looks like a still here.
 *
 * To use your own: put the file at `public/videos/hero.mp4` and change this to
 *   const heroVideoUrl = "/videos/hero.mp4";
 * Keep it short (5-10s), muted, and under ~5MB. It downloads on every visit, so
 * a heavy file here is the single easiest way to make the site feel slow.
 */
const heroVideoUrl: string = heroVideo.url;

type Project = {
  /**
   * Who dances in the clip. Must match a `name` in the `dancers` roster below
   * so the card can pull their portrait for the credit — spelling has to be
   * exact. Leave it off and the card simply shows the detail line instead, so
   * an unassigned clip never renders a blank or placeholder name.
   */
  dancer?: string;
  /** Small grey line under the credit, e.g. "Artist promo · 2025". */
  detail: string;
  /**
   * Either a file in `public/videos/` referenced from the site root
   * ("/videos/reel-01.mp4"), or a YouTube/Vimeo link pasted as you copied it.
   */
  video: string;
  /** Native shape of the clip. Drives which frame the card uses. */
  aspect: "landscape" | "portrait";
};

// TODO: set `dancer` on each clip to whoever is dancing in it, spelled exactly
// as it appears in the `dancers` roster below. Until one is set the card just
// shows its `detail` line — no name, no placeholder.
// Files live in public/videos/, renamed from their upload names for tidy URLs.
//
// ORDER MATTERS: the first six below are what visitors see. The rest sit behind
// "View more". Put your strongest work in the top six.
//
//   reel-01  848x464   14s   2.7MB      reel-08  464x848   34s   6.8MB
//   reel-02  720x1280  86s  20.5MB !    reel-09  720x1280  14s   2.7MB
//   reel-03  352x640   48s   4.2MB      reel-10  720x1280  20s   3.7MB
//   reel-04  464x848   25s   5.0MB      reel-11  464x848   29s   5.8MB
//   reel-05  720x1280  25s   2.9MB      reel-12  464x848   50s   9.9MB
//   reel-06  720x1280  19s   3.2MB      reel-13  464x848   40s   8.0MB
//   reel-07  848x480   25s   4.8MB      reel-14  464x848   41s   8.2MB
const projects: Project[] = [
  // --- The six shown on load (order shuffled, not sequential) ----------
  {
    dancer: "MiMi",
    detail: "Choreography",
    video: "/videos/reel-14.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Catherine Elena",
    detail: "Studio floor",
    video: "/videos/reel-01.mp4",
    aspect: "landscape",
  },
  {
    dancer: "Kira Moves",
    detail: "Choreography",
    video: "/videos/reel-05.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Selena",
    detail: "Studio floor",
    video: "/videos/reel-07.mp4",
    aspect: "landscape",
  },
  {
    dancer: "Jessica Wills",
    detail: "Full routine",
    video: "/videos/reel-12.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Roxanne",
    detail: "Choreography",
    video: "/videos/reel-09.mp4",
    aspect: "portrait",
  },
  // --- Behind "See more" ------------------------------------------------
  {
    dancer: "Sofia Rae",
    detail: "Rehearsal",
    video: "/videos/reel-03.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Olivia Mia",
    detail: "Choreography",
    video: "/videos/reel-11.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Kira Moves",
    detail: "Rehearsal",
    video: "/videos/reel-06.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Stephanie Jane",
    detail: "Full routine",
    video: "/videos/reel-02.mp4",
    aspect: "portrait",
  },
  {
    dancer: "MiMi",
    detail: "Rehearsal",
    video: "/videos/reel-13.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Honey Noir",
    detail: "Full routine",
    video: "/videos/reel-08.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Venessa",
    detail: "Choreography",
    video: "/videos/reel-04.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Sarah",
    detail: "Choreography",
    video: "/videos/reel-15.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Roxanne",
    detail: "Rehearsal",
    video: "/videos/reel-10.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Mila Reign",
    detail: "Rehearsal",
    video: "/videos/reel-16.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Elliana",
    detail: "Full routine",
    video: "/videos/reel-17.mp4",
    aspect: "portrait",
  },
  {
    dancer: "Hazel Bennett",
    detail: "Full routine",
    video: "/videos/reel-18.mp4",
    aspect: "portrait",
  },
];

/** How many clips show before the viewer asks for more. */
const VISIBLE_PROJECT_COUNT = 6;

/**
 * The badge number shown on each clip, keyed by video path.
 *
 * Numbering follows the order a visitor actually sees, not the order of the
 * array: the grid puts the landscape row above the portrait grid, so array
 * position and screen position are different things. Built from the full list
 * rather than the visible slice, which keeps a clip's number fixed when
 * "View more" appends the rest instead of renumbering the page under you.
 */
const projectNumbers = new Map(
  [
    ...projects.filter((project) => project.aspect === "landscape"),
    ...projects.filter((project) => project.aspect === "portrait"),
  ].map((project, index) => [project.video, index + 1]),
);

/**
 * Turns a YouTube/Vimeo share link into its embeddable player URL.
 * Returns null for anything else, which we then treat as a direct video file.
 */
function toEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;

  return null;
}

/**
 * A work-grid card that previews its clip as a looping video.
 *
 * It starts muted because every browser blocks autoplay with sound — a clip may
 * only start on its own if it is silent. Once the visitor has interacted with
 * the page even once, `MirraHome` unlocks audio and hands it to whichever clip
 * is filling the screen. At most one card is ever audible.
 *
 * Nothing downloads until the card is close to the viewport, and playback stops
 * again once it scrolls away — otherwise four clips would stream at once and the
 * page would crawl. Viewers who have asked for reduced motion get a still frame.
 */
function ProjectCard({
  project,
  onOpen,
  soundOn,
  onToggleSound,
  onBecamePrimary,
  onLeftView,
}: {
  project: Project;
  onOpen: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  /** Fired when this clip is the one mostly filling the screen. */
  onBecamePrimary: () => void;
  /** Fired when this clip scrolls out of view, so it can hand the audio on. */
  onLeftView: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const credit = dancerByName(project.dancer);
  const number = projectNumbers.get(project.video);

  // The scroll observer is set up once and would otherwise capture the value of
  // `soundOn` from that first render, re-muting a clip whenever it scrolled back
  // into view. A ref gives the callback the current value instead.
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  const onBecamePrimaryRef = useRef(onBecamePrimary);
  onBecamePrimaryRef.current = onBecamePrimary;

  const onLeftViewRef = useRef(onLeftView);
  onLeftViewRef.current = onLeftView;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          // Attach the source on first approach rather than at page load.
          if (!el.src) el.src = project.video;
          el.muted = !soundOnRef.current;
          if (!reduceMotion) void el.play().catch(() => {});

          // Mostly on screen, so this is the clip the viewer is actually
          // watching — it becomes the one that carries the audio.
          if (entry.intersectionRatio >= 0.6) onBecamePrimaryRef.current();
        } else {
          el.pause();
          onLeftViewRef.current();
        }
      },
      { rootMargin: "200px", threshold: [0.2, 0.6] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project.video]);

  /**
   * Autoplay is only permitted while a video is muted, so every card starts
   * silent and the viewer opts in. Unmuting here is safe because it always
   * follows a click, which counts as the gesture browsers require.
   *
   * `muted` is set here rather than as a JSX attribute on purpose: React treats
   * it as a DOM property and re-applies it on re-render, which would silently
   * undo an unmute the next time this component rendered for any other reason.
   */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !soundOn;
    el.volume = 1;
    if (soundOn) {
      el.play().catch((error: unknown) => {
        console.warn(`[Elite Dance Group] ${project.video} refused to play with sound:`, error);
      });
    }
  }, [soundOn, project.video]);

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[3px] bg-studio-ink-2">
        <button
          onClick={onOpen}
          aria-label={`Play ${projectLabel(project)} full size`}
          className="block w-full cursor-pointer text-left"
        >
          <video
            ref={videoRef}
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onLoadedData={() => setLoaded(true)}
            className={`w-full bg-studio-ink-2 object-cover transition duration-700 group-hover:scale-[1.03] ${
              project.aspect === "landscape" ? "aspect-[16/9]" : "aspect-[9/16]"
            }`}
          />
          {number !== undefined && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-studio-ink/75 px-2.5 py-1 font-display text-xs font-medium tabular-nums text-studio-cream ring-1 ring-studio-cream/25 backdrop-blur-sm">
              {String(number).padStart(2, "0")}
            </span>
          )}
          {!loaded && <span className="absolute inset-0 animate-pulse bg-studio-ink-3/40" />}
          <span className="absolute inset-0 bg-studio-ink/5 transition-colors group-hover:bg-studio-ink/30" />
          <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-studio-amber text-studio-ink opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="size-4 fill-current" />
          </span>
        </button>

        {/* Sibling of the play button, not nested inside it — a button within a
            button is invalid HTML and breaks keyboard navigation. */}
        <button
          onClick={() => {
            // Unmute right here in the click handler rather than waiting for an
            // effect. Browsers grant audio permission off the back of a user
            // gesture, and doing it synchronously keeps us inside that window.
            const el = videoRef.current;
            if (el) {
              const turningOn = !soundOn;
              if (!el.src) el.src = project.video;
              el.muted = !turningOn;
              el.volume = 1;
              if (turningOn) {
                el.play().catch((error: unknown) => {
                  console.warn(
                    `[Elite Dance Group] ${project.video} refused to play with sound:`,
                    error,
                  );
                });
              }
            }
            onToggleSound();
          }}
          aria-label={soundOn ? `Mute ${projectLabel(project)}` : `Unmute ${projectLabel(project)}`}
          aria-pressed={soundOn}
          className={`absolute bottom-4 left-4 z-10 flex cursor-pointer items-center gap-2 rounded-full py-2 pl-3 pr-4 text-sm font-medium backdrop-blur-sm transition ${
            soundOn
              ? "bg-studio-amber text-studio-ink"
              : "bg-studio-ink/75 text-studio-cream ring-1 ring-studio-cream/25 hover:bg-studio-ink"
          }`}
        >
          {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          {soundOn ? "Sound on" : "Sound off"}
        </button>
      </div>
      {/* The credit under the clip. It is a link down to the roster so a visitor
          who likes what they just watched can go straight to the person who
          danced it. Clips with no dancer set fall back to the detail line
          alone — never a placeholder name. */}
      <div className="mt-4">
        {credit ? (
          <a href="#dancers" className="group/credit flex items-center gap-3">
            <img
              src={credit.image}
              alt=""
              width={96}
              height={96}
              loading="lazy"
              className="size-10 shrink-0 rounded-full object-cover object-top ring-1 ring-studio-cream/20 transition group-hover/credit:ring-studio-amber"
            />
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-studio-cream-2/45">
                Danced by
              </span>
              <span className="block truncate font-display text-lg font-medium leading-tight text-studio-cream transition-colors group-hover/credit:text-studio-amber">
                {credit.name}
              </span>
            </span>
          </a>
        ) : null}
        <div className={`text-sm text-studio-cream-2/55 ${credit ? "mt-3" : ""}`}>
          {project.detail}
        </div>
      </div>
    </article>
  );
}

// Split by shape so each clip keeps its native frame. Applied after the
// six/all slice, so both rows reflect whatever is currently shown.
const splitByAspect = (list: Project[]) => ({
  landscape: list.filter((p) => p.aspect === "landscape"),
  portrait: list.filter((p) => p.aspect === "portrait"),
});

type Dancer = {
  name: string;
  role: string;
  image: string;
  /**
   * Set when the photo is a square frame rather than an upright portrait. Those
   * get a wider, square card: forcing a square into the 3:4 portrait crop
   * trims both sides, which on a studio shot cuts off whoever stands at each
   * end of the line.
   */
  wide?: boolean;
};

// TODO: role lines are placeholders for the two new dancers — swap in what they
// actually do.
const dancers: Dancer[] = [
  { name: "Stephanie Jane", role: "Lead · Jazz / Heels", image: dancerStephanie },
  { name: "Catherine Elena", role: "Soloist · Contemporary", image: dancerCatherine },
  { name: "Sofia Rae", role: "Lead · Commercial / Lyrical", image: dancerSofia },
  { name: "Kira Moves", role: "Crew · Hip-hop / Freestyle", image: dancerKira },
  { name: "Venessa", role: "Soloist · K-pop / Urban", image: dancerVenessa },
  { name: "Selena", role: "Crew · Street / Waacking", image: dancerSelena },
  { name: "Roxanne", role: "Crew · Hip-hop / Festival", image: dancerRoxanne },
  { name: "Honey Noir", role: "Lead · Heels / Commercial", image: dancerHoney },
  { name: "Olivia Mia", role: "Soloist · Contemporary / Lyrical", image: dancerOlivia },
  { name: "Jessica Wills", role: "Lead · Editorial / Heels", image: dancerMimi },
  { name: "MiMi", role: "Soloist · Latin / Reggaeton", image: dancerJessica },
  { name: "Sarah", role: "Soloist · Jazz / Commercial", image: dancerSarah },
  { name: "Elliana", role: "Crew · K-pop / Street", image: dancerElliana },
  // TODO: role line is a placeholder — swap in Hazel's position and styles.
  { name: "Hazel Bennett", role: "Dancer", image: dancerHazel },
  // TODO: role line is a placeholder — swap in what Mila actually does.
  { name: "Mila Reign", role: "Crew · Group routines", image: dancerCrew, wide: true },
];

/**
 * Finds the roster entry a clip is credited to. Returns undefined for a clip
 * with no `dancer` set and for a name that does not match the roster, which the
 * card treats the same way: show the detail line on its own.
 */
const dancerByName = (name?: string) => dancers.find((dancer) => dancer.name === name);

/** How a clip is described to screen readers, which have no card to look at. */
const projectLabel = (project: Project) =>
  project.dancer ? `${project.detail} with ${project.dancer}` : project.detail;

// TODO: add real client quotes only. One line each, attributed to a person who
// actually said it and agreed to be named. Two honest quotes beat six invented
// ones. While this array is empty the whole section is skipped.
const testimonials: { quote: string; name: string; role: string }[] = [];

// ⚠ SAMPLE DATA — NOT A REAL CAMPAIGN. These figures are placeholders shaped to
// look like a plausible single-release result. They must be replaced with real,
// verifiable numbers from a campaign you have permission to publish before this
// site goes live. Publishing invented performance claims as though they were
// real is deceptive advertising and is illegal in most markets.
//
// Both panels deliberately measure the SAME window (first 30 days). Keep it that
// way when you swap in real numbers — comparing "first week" to "first month" is
// the fastest way to get a case study torn apart.
//
// Set this to null to hide the whole section.
const resultsCaseStudy: {
  label: string;
  note: string;
  before: { period: string; value: string; caption: string; sub: string };
  after: { period: string; value: string; caption: string; sub: string };
  metrics: { value: string; label: string }[];
} | null = {
  label: "The same single, with and without a video.",
  note: "Single release, independent artist. Streaming figures cover the first 30 days after release in both cases.",
  before: {
    period: "Before · no video",
    value: "148K",
    caption: "Streams in the first 30 days",
    sub: "6.2K saves · 4.1K new followers",
  },
  after: {
    period: "After · with our cut",
    value: "512K",
    caption: "Streams in the first 30 days",
    sub: "24.8K saves · 42.3K new followers",
  },
  metrics: [
    { value: "+246%", label: "Streams, same 30-day window" },
    { value: "4.0×", label: "Playlist saves" },
    { value: "+38.2K", label: "Net new followers" },
    { value: "18 days", label: "To peak daily streams" },
  ],
};

// Unretouched screenshots that sit under the before/after panels as receipts.
// Only publish a shot the sender is happy to see in public — a public post is
// fair game, a private DM needs the sender's OK first.
//
// `transcript` is the screenshot typed out: a screen reader cannot read pixels,
// so without it the proof simply does not exist for anyone using one. It is
// rendered visually hidden in the caption and as the alt text in the lightbox.
// Empty this array and the whole receipts strip disappears.
const receipts: { image: string; transcript: string; source: string; caption: string }[] = [
  {
    image: proofShoutoutLuka,
    transcript:
      "Instagram story from Luka van den Driesschen resharing his own post: “So very proud to announce that the wonderful dancing group from South Korea Gooddess Squad I call them the d…” Below it, a still of five dancers in camo trousers and white caps, mid-routine on a blue-lit stage under a crescent moon.",
    source: "Luka van den Driesschen · Instagram story",
    caption: "Reshared the crew's stage cut to his story the day it went up.",
  },
  {
    image: proofDmPraise,
    transcript:
      "Direct message received at 11:33 AM: “You know, the vibe in your video, it hit me so good, I could feel it came from the heart and man the energy and expressions you put into it that routine came across so strong …amazing, truly felt your presence and felt like I was there. I will always be impressed with you and what an amazing artist you are. Magic. Ok, I could go on for hours talking about the video (its on repeat) but I'll let video vibes blow me away… forever nailing it sunshine!”",
    source: "Client DM · the morning after delivery",
    caption: "“I could go on for hours talking about the video — it's on repeat.”",
  },
];

const services = [
  {
    title: "Artist dance videos",
    body: "Concept, casting, shoot day, and the grade. You bring the track, we hand back the finished cut.",
  },
  {
    title: "Original choreography",
    body: "Movement built for one specific song. Comes with rehearsal footage and counts so your dancers can learn it.",
  },
  {
    title: "Brand and promo content",
    body: "Social sets and campaign work, cut on the day to the aspect ratios you actually need.",
  },
];

const process = [
  {
    step: "01",
    title: "Brief",
    body: "Send the track, the deadline, and any references. You get a treatment back.",
  },
  {
    step: "02",
    title: "Pre-light",
    body: "We block the room and test looks before the dancers arrive, so shoot day is spent shooting.",
  },
  {
    step: "03",
    title: "Shoot",
    body: "One day covers most single-track videos. Two if there is a wardrobe or location change.",
  },
  {
    step: "04",
    title: "Post",
    body: "Edit, grade, and delivery in every format you need. Two rounds of notes are included.",
  },
];

// TODO: check these answers match how you actually work before publishing.
const faqs = [
  {
    q: "What does a video cost?",
    a: "It depends on cast size, location, and how many shoot days it takes. Send the brief and you get a quote within two working days.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the plan you choose. A single social clip turns around fastest, while a full video with casting, a build and a grade takes longer. Tell us your deadline in the brief and we will confirm a timeline that fits it.",
  },
  {
    q: "Do you supply the dancers?",
    a: "Yes. We cast from our own roster and bring in specialists when a style calls for it.",
  },
  {
    q: "Can we use the footage in paid ads?",
    a: "Yes. Usage is agreed up front and written into the quote, so there is nothing to renegotiate later.",
  },
];

// Every contact-form brief is forwarded to this inbox by FormSubmit
// (formsubmit.co). The very first submission does not arrive: FormSubmit sends
// this address a one-time "Activate Form" email instead, and nothing gets
// through until that link is clicked.
const CONTACT_EMAIL = "elitedancegroup000@gmail.com";

const navLinks = [
  ["Studio", "#about"],
  ["Work", "#work"],
  ["Dancers", "#dancers"],
  ["Process", "#process"],
  ...(resultsCaseStudy ? [["Results", "#results"]] : []),
];

function MirraHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  // Which receipt screenshot is open full-size, if any.
  const [openReceipt, setOpenReceipt] = useState<(typeof receipts)[number] | null>(null);
  /**
   * Sound on the work grid.
   *
   * No browser will let a page play audio before the visitor has interacted with
   * it — that is a hard rule, not a setting. So clips start silent, and the first
   * click, tap or key press anywhere on the page unlocks audio. After that the
   * clip currently filling the screen plays with sound as you scroll, and the
   * viewer can switch it off again from any card.
   */
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, VISIBLE_PROJECT_COUNT);
  const { landscape: landscapeProjects, portrait: portraitProjects } =
    splitByAspect(visibleProjects);
  const hiddenCount = projects.length - VISIBLE_PROJECT_COUNT;

  const [soundEnabled, setSoundEnabled] = useState(false);
  // Which clip carries the audio, by video path. Only ever one, so scrolling
  // hands sound from one clip to the next instead of layering them.
  const [audibleVideo, setAudibleVideo] = useState<string | null>(null);

  useEffect(() => {
    // `capture` so this runs before any button's own handler, and `once` so a
    // later click on "Sound on" can switch audio off without re-enabling it.
    const unlock = () => setSoundEnabled(true);
    const opts = { once: true, capture: true } as const;
    document.addEventListener("pointerdown", unlock, opts);
    document.addEventListener("keydown", unlock, opts);
    return () => {
      document.removeEventListener("pointerdown", unlock, opts);
      document.removeEventListener("keydown", unlock, opts);
    };
  }, []);

  useEffect(() => {
    if (!openReceipt) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenReceipt(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openReceipt]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setSending(true);
    setSendError(false);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          _subject: `New brief from ${fields["name"]}`,
          _replyto: fields["email"],
          _template: "table",
        }),
      });
      // A refused submission (one sent before the inbox is activated, say) is
      // reported in the body, so the status code alone is not enough.
      const result = await response.json().catch(() => null);
      if (!response.ok || String(result?.success) !== "true") {
        throw new Error(result?.message ?? `HTTP ${response.status}`);
      }
      form.reset();
      setSent(true);
    } catch (error) {
      console.warn("[Elite Dance Group] brief failed to send:", error);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="overflow-hidden bg-studio-ink text-studio-cream">
      <header className="sticky top-0 z-40 border-b border-studio-ink-3/70 bg-studio-ink/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-[0.04em] text-studio-cream"
            aria-label="Elite Dance Group home"
          >
            ELITE DANCE GROUP
          </Link>
          <nav
            className="hidden items-center gap-8 text-[15px] text-studio-cream-2/70 md:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-studio-cream">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild variant="studio" size="sm" className="hidden md:inline-flex">
            <a href="#contact">Book a session</a>
          </Button>
          <Button
            variant="studio-outline"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-studio-ink-3 bg-studio-ink-2 px-5 py-5 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4 text-studio-cream-2">
              {[...navLinks, ["Contact", "#contact"]].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="transition-colors hover:text-studio-amber"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-studio-ink">
        <video
          className="absolute inset-0 h-full min-h-[640px] w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          aria-hidden="true"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-studio-ink/70 via-studio-ink/60 to-studio-ink" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="reveal-rise max-w-[16ch] font-display text-[clamp(2.5rem,6.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-studio-cream">
                Choreography and dance film, made in one room.
              </h1>
              <p className="reveal-rise mt-8 max-w-[46ch] text-[17px] leading-relaxed text-studio-cream-2/85 [animation-delay:120ms]">
                Elite Dance Group is a movement studio. We cast the dancers, build the choreography,
                shoot it, and cut it. Artists, labels and brands come to us when a track needs a
                body attached to it.
              </p>
              <div className="reveal-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:220ms]">
                <Button asChild variant="studio" size="lg">
                  <a href="#contact">
                    Start a project <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="studio-outline" size="lg">
                  <a href="#work">
                    <Play /> Watch the reel
                  </a>
                </Button>
              </div>
            </div>
            <div className="reveal-rise lg:col-span-5 [animation-delay:160ms]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-studio-ink-2 ring-1 ring-studio-cream/10">
                <img
                  src={heroImage}
                  alt="Elite Dance Group dancers moving in formation under warm studio lights"
                  width={1440}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio -------------------------------------------------------------- */}
      <section id="about" className="bg-studio-cream text-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow text-studio-copper">The studio</span>
              <h2 className="mt-5 max-w-[22ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
                A rehearsal room that already behaves like a stage.
              </h2>
              <div className="mt-9 flex flex-wrap gap-2">
                {["Choreography", "Cinematography", "Colour & grade", "Casting"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-studio-ink/15 px-3.5 py-1.5 text-sm text-studio-ink/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
              <p className="max-w-[58ch] text-[17px] leading-relaxed text-studio-ink/80">
                Every project starts in the dark. We block the room, set the lights, and let the
                music find the bodies before anyone points a camera. That is why the footage reads
                as lived in rather than performed.
              </p>
              <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-studio-ink/80">
                Casting, choreography, and post all happen under one roof. Nothing gets handed to a
                second vendor halfway through, so the feeling you signed off on in the treatment is
                the one that survives to the final cut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services ------------------------------------------------------------ */}
      <section className="bg-studio-cream text-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-8 md:pb-28">
          <span className="eyebrow text-studio-copper">What we make</span>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-studio-ink/12 ring-1 ring-studio-ink/12 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="bg-studio-cream p-7 transition-colors hover:bg-studio-cream-2 md:p-8"
              >
                <h3 className="font-display text-xl font-medium">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-studio-ink/70">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Work ---------------------------------------------------------------- */}
      <section id="work" className="bg-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-studio-amber">Selected work</span>
              <h2 className="mt-5 max-w-[24ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
                Projects from the after-dark reel.
              </h2>
            </div>
          </div>
          {/* Landscape clips run full width; portrait clips sit three across so
              each keeps its native shape instead of being cropped to fit. */}
          {/* Two across rather than full width: the landscape sources are only
              ~848px wide, so a half-width cell keeps them sharp instead of
              upscaling them across the whole container. */}
          {landscapeProjects.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {landscapeProjects.map((project) => (
                <ProjectCard
                  key={project.video}
                  project={project}
                  onOpen={() => openProject(project)}
                  // Take the audio only if nothing else holds it, so a row of
                  // clips does not fight over which one is heard.
                  onBecamePrimary={() => setAudibleVideo((current) => current ?? project.video)}
                  onLeftView={() =>
                    setAudibleVideo((current) => (current === project.video ? null : current))
                  }
                  /* Muted while the full player is open so the two do not talk
                     over each other. */
                  soundOn={soundEnabled && !selectedProject && audibleVideo === project.video}
                  onToggleSound={() => {
                    if (soundEnabled && audibleVideo === project.video) {
                      setSoundEnabled(false);
                    } else {
                      setSoundEnabled(true);
                      setAudibleVideo(project.video);
                    }
                  }}
                />
              ))}
            </div>
          )}
          {portraitProjects.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {portraitProjects.map((project) => (
                <ProjectCard
                  key={project.video}
                  project={project}
                  onOpen={() => openProject(project)}
                  // Take the audio only if nothing else holds it, so a row of
                  // clips does not fight over which one is heard.
                  onBecamePrimary={() => setAudibleVideo((current) => current ?? project.video)}
                  onLeftView={() =>
                    setAudibleVideo((current) => (current === project.video ? null : current))
                  }
                  /* Muted while the full player is open so the two do not talk
                     over each other. */
                  soundOn={soundEnabled && !selectedProject && audibleVideo === project.video}
                  onToggleSound={() => {
                    if (soundEnabled && audibleVideo === project.video) {
                      setSoundEnabled(false);
                    } else {
                      setSoundEnabled(true);
                      setAudibleVideo(project.video);
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Sits under the grid so it reads as the end of the row rather than a
              header link, and the count tells people what they get. */}
          {hiddenCount > 0 && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <Button
                variant="studio"
                size="lg"
                onClick={() => setShowAllProjects((open) => !open)}
              >
                {showAllProjects ? "Show less" : `See more (${hiddenCount})`}
              </Button>
              <p className="text-sm text-studio-cream-2/45">
                {showAllProjects
                  ? `Showing all ${projects.length} films`
                  : `${VISIBLE_PROJECT_COUNT} of ${projects.length} films`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cast ---------------------------------------------------------------- */}
      <section id="dancers" className="bg-studio-cream text-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow text-studio-copper">The cast</span>
              <h2 className="mt-5 max-w-[18ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
                Dancers we work with.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-studio-ink/75">
                Our standing roster. For style-specific briefs we cast beyond this list and bring in
                specialists for the room.
              </p>
            </div>
            <a
              href="#contact"
              className="border-b border-studio-ink/25 pb-1 text-[15px] text-studio-ink/70 transition-colors hover:border-studio-copper hover:text-studio-ink"
            >
              Dance with us <ArrowRight className="inline size-3.5" />
            </a>
          </div>
          {/* A single horizontal line that scrolls sideways rather than wrapping.
              Fitting every dancer into the container width would shrink each
              portrait to a sliver as the roster grows, so the row keeps a fixed
              card size and runs off the edge instead. The negative margins let
              it bleed to the screen edge so it reads as deliberately scrollable. */}
          <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8">
            <div className="flex snap-x gap-5">
              {dancers.map((dancer) => (
                <article
                  key={dancer.name}
                  className={`shrink-0 snap-start ${
                    dancer.wide ? "w-[235px] sm:w-[261px]" : "w-[176px] sm:w-[196px]"
                  }`}
                >
                  <div className="group overflow-hidden rounded-[3px] bg-studio-cream-2 ring-1 ring-studio-ink/10">
                    <img
                      src={dancer.image}
                      alt={`${dancer.name}, ${dancer.role}`}
                      width={800}
                      height={1060}
                      loading="lazy"
                      className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
                        dancer.wide ? "aspect-square object-center" : "aspect-[3/4] object-top"
                      }`}
                    />
                  </div>
                  <div className="mt-3 font-display text-[15px] font-medium leading-snug">
                    {dancer.name}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-studio-ink/55">{dancer.role}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process ------------------------------------------------------------- */}
      <section id="process" className="bg-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <span className="eyebrow text-studio-amber">How a project runs</span>
          <h2 className="mt-5 max-w-[24ch] text-balance font-display text-3xl font-semibold leading-[1.1] text-studio-cream sm:text-[2.6rem]">
            Four stages, no surprises in the middle.
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="border-t border-studio-ink-3 pt-5">
                <div className="eyebrow text-studio-amber">{item.step}</div>
                <h3 className="mt-3 font-display text-xl font-medium text-studio-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-studio-cream-2/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Results — hidden entirely when resultsCaseStudy is null --------------- */}
      {resultsCaseStudy && (
        <section id="results" className="bg-studio-cream text-studio-ink">
          <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow text-studio-copper">Results</span>
                <h2 className="mt-5 max-w-[20ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
                  {resultsCaseStudy.label}
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
                <p className="max-w-[52ch] text-[17px] leading-relaxed text-studio-ink/75">
                  {resultsCaseStudy.note}
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col rounded-lg bg-studio-cream-2 p-8 ring-1 ring-studio-ink/10">
                <div className="eyebrow text-studio-ink/45">{resultsCaseStudy.before.period}</div>
                <div className="mt-5 font-display text-[3.4rem] font-semibold leading-none tabular-nums text-studio-ink/70">
                  {resultsCaseStudy.before.value}
                </div>
                <div className="mt-3 text-[15px] text-studio-ink/65">
                  {resultsCaseStudy.before.caption}
                </div>
                {/* Bar is sized relative to the "after" panel so the two read as one chart. */}
                <div className="mt-7 h-1.5 w-[29%] rounded-full bg-studio-ink/25" />
                <div className="mt-5 border-t border-studio-ink/10 pt-4 text-sm text-studio-ink/55">
                  {resultsCaseStudy.before.sub}
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-studio-ink p-8 text-studio-cream">
                <div className="eyebrow text-studio-amber">{resultsCaseStudy.after.period}</div>
                <div className="mt-5 font-display text-[3.4rem] font-semibold leading-none tabular-nums text-studio-amber">
                  {resultsCaseStudy.after.value}
                </div>
                <div className="mt-3 text-[15px] text-studio-cream-2/75">
                  {resultsCaseStudy.after.caption}
                </div>
                <div className="mt-7 h-1.5 w-full rounded-full bg-studio-amber" />
                <div className="mt-5 border-t border-studio-ink-3 pt-4 text-sm text-studio-cream-2/60">
                  {resultsCaseStudy.after.sub}
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-studio-ink/15 pt-8 md:grid-cols-4">
              {resultsCaseStudy.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-[1.75rem] font-semibold tabular-nums">
                    {metric.value}
                  </div>
                  <div className="mt-1 max-w-[22ch] text-sm leading-snug text-studio-ink/60">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Receipts — the numbers above, in other people's words. Skipped
                entirely while `receipts` is empty. */}
            {receipts.length > 0 && (
              <div className="mt-16 border-t border-studio-ink/15 pt-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <span className="eyebrow text-studio-copper">Receipts</span>
                  <p className="text-sm text-studio-ink/55">
                    Screenshots, uncropped and unedited. Open one to read it in full.
                  </p>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {receipts.map((receipt) => (
                    <figure
                      key={receipt.source}
                      className="group flex flex-col overflow-hidden rounded-lg bg-studio-ink ring-1 ring-studio-ink/15"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenReceipt(receipt)}
                        aria-label={`Enlarge screenshot — ${receipt.source}`}
                        className="relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-studio-amber"
                      >
                        {/* The screenshots are tall phone captures, so the card
                            shows the top of each and the lightbox carries the
                            rest. Described by the transcript in the caption,
                            hence the empty alt. */}
                        <img
                          src={receipt.image}
                          alt=""
                          loading="lazy"
                          className="h-[340px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] sm:h-[400px]"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-studio-ink via-studio-ink/70 to-transparent" />
                        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-studio-cream/10 px-3 py-1 text-xs text-studio-cream-2/80 ring-1 ring-studio-cream/20 backdrop-blur-sm transition-colors group-hover:bg-studio-amber group-hover:text-studio-ink">
                          Read in full
                        </span>
                      </button>
                      <figcaption className="border-t border-studio-ink-3 p-6">
                        <div className="eyebrow text-studio-amber">{receipt.source}</div>
                        <p className="mt-2.5 text-[15px] leading-relaxed text-studio-cream-2/75">
                          {receipt.caption}
                        </p>
                        <span className="sr-only">{receipt.transcript}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials — renders only once real quotes are supplied ------------ */}
      {testimonials.length > 0 && (
        <section id="word" className="bg-studio-ink">
          <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
            <span className="eyebrow text-studio-amber">Client word</span>
            <h2 className="mt-5 max-w-[24ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
              In their own words, after the cut.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="flex flex-col rounded-lg bg-studio-ink-2 p-7 ring-1 ring-studio-ink-3"
                >
                  <blockquote className="flex-1 text-[17px] leading-relaxed text-studio-cream-2/90">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-7 border-t border-studio-ink-3 pt-5">
                    <div className="font-display font-medium text-studio-cream">{item.name}</div>
                    <div className="mt-0.5 text-sm text-studio-cream-2/55">{item.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ ----------------------------------------------------------------- */}
      <section className="border-y border-studio-ink-3 bg-studio-ink-2">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow text-studio-amber">Before you ask</span>
              <h2 className="mt-5 max-w-[18ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.4rem]">
                The questions we get most.
              </h2>
            </div>
            <div className="lg:col-span-8">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group border-b border-studio-ink-3/70 py-5 first:border-t first:border-studio-ink-3/70"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-medium text-studio-cream">
                    {faq.q}
                    <Plus className="size-4 shrink-0 text-studio-amber transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-studio-cream-2/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA ----------------------------------------------------------------- */}
      <section className="bg-studio-amber text-studio-ink">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-5 py-16 md:flex-row md:items-end md:px-8 md:py-20">
          <div>
            <h2 className="max-w-[20ch] text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-[2.9rem]">
              Got a track waiting on its move?
            </h2>
            <p className="mt-5 max-w-[44ch] text-[17px] text-studio-ink/75">
              Tell us the artist, the beat, and the deadline. A concept comes back within 48 hours.
            </p>
          </div>
          <Button asChild variant="studio-dark" size="lg" className="shrink-0">
            <a href="#contact">
              Start a project <ArrowRight />
            </a>
          </Button>
        </div>
      </section>

      {/* Contact ------------------------------------------------------------- */}
      <section id="contact" className="bg-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow text-studio-amber">Contact</span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] sm:text-[2.6rem]">
                Book a session.
              </h2>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-studio-cream-2/70">
                Based in the studio, booking worldwide. Share a bit about the project and we will
                take it from there.
              </p>
              <p className="mt-8 text-sm text-studio-cream-2/50">Prefer email?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-flex items-center gap-3 text-[17px] text-studio-cream transition-colors hover:text-studio-amber"
              >
                <Mail className="size-5 shrink-0 text-studio-amber" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="lg:col-span-7">
              {sent ? (
                <div className="flex min-h-[320px] flex-col items-start justify-center rounded-lg bg-studio-ink-2 p-8 ring-1 ring-studio-ink-3">
                  <div className="grid size-12 place-items-center rounded-full bg-studio-amber text-studio-ink">
                    <Check />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-medium">Brief received.</h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-studio-cream-2/70">
                    Thanks for sending it over. You will hear back with a concept and a timeline
                    within 48 hours.
                  </p>
                  <Button
                    variant="studio-outline"
                    size="sm"
                    className="mt-7"
                    onClick={() => setSent(false)}
                  >
                    Send another brief
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  {/* Honeypot: people never see it, but bots fill in every field they
                      find, and FormSubmit drops any submission where it has a value. */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <label className="block sm:col-span-2">
                    <span className="text-sm text-studio-cream-2/60">Name</span>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@label.com"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">
                      WhatsApp or phone <span className="text-studio-cream-2/35">· optional</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Include your country code"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">TikTok username</span>
                    <input
                      required
                      type="text"
                      name="tiktok"
                      placeholder="@yourhandle"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">Country</span>
                    <input
                      required
                      type="text"
                      name="country"
                      placeholder="Where you are based"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">Dancer you want</span>
                    {/* Built from the same roster as the cast section, so adding a
                        dancer above adds them here automatically. */}
                    <select
                      name="dancer"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none focus:border-studio-amber"
                    >
                      <option>No preference — recommend someone</option>
                      {dancers.map((dancer) => (
                        <option key={dancer.name}>{dancer.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm text-studio-cream-2/60">What do you want to do?</span>
                    <select
                      name="projectType"
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none focus:border-studio-amber"
                    >
                      <option>Artist dance video</option>
                      <option>Original choreography</option>
                      <option>Brand campaign</option>
                      <option>Social / TikTok content</option>
                      <option>Private class or coaching</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm text-studio-cream-2/60">Tell us about it</span>
                    <textarea
                      required
                      rows={4}
                      name="brief"
                      placeholder="The track, your deadline, the budget you have in mind, and the feeling you are chasing."
                      className="mt-2 w-full rounded-lg border border-studio-ink-3 bg-studio-ink-2 px-4 py-3 text-[15px] text-studio-cream outline-none transition-colors placeholder:text-studio-cream-2/35 focus:border-studio-amber resize-none"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="studio" size="lg" disabled={sending}>
                      {sending ? (
                        <>
                          Sending <LoaderCircle className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send the brief <ArrowRight />
                        </>
                      )}
                    </Button>
                    {sendError && (
                      <p role="alert" className="mt-4 max-w-[46ch] text-sm text-studio-rose">
                        The brief did not send. Try again, or email it to{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="underline underline-offset-4 transition-colors hover:text-studio-cream"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-studio-ink-3 bg-studio-ink">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
          <div className="flex flex-col justify-between gap-10 sm:flex-row">
            <div>
              <div className="font-display text-lg font-semibold tracking-[0.04em] text-studio-cream">
                ELITE DANCE GROUP
              </div>
              <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-studio-cream-2/55">
                Dance videos, choreography, and promo content for artists and brands.
              </p>
            </div>
            <div className="flex flex-wrap gap-14">
              <div>
                <div className="eyebrow text-studio-cream-2/40">Explore</div>
                <nav className="mt-4 flex flex-col gap-2.5 text-[15px] text-studio-cream-2/70">
                  <a href="#work" className="transition-colors hover:text-studio-cream">
                    Work
                  </a>
                  <a href="#dancers" className="transition-colors hover:text-studio-cream">
                    Dancers
                  </a>
                  <a href="#process" className="transition-colors hover:text-studio-cream">
                    Process
                  </a>
                </nav>
              </div>
              <div>
                <div className="eyebrow text-studio-cream-2/40">Contact</div>
                <div className="mt-4 flex flex-col gap-2.5 text-[15px] text-studio-cream-2/70">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="transition-colors hover:text-studio-cream"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  {/* TODO: add social links here when ready. */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-studio-ink-3 pt-6 text-sm text-studio-cream-2/40">
            © 2026 Elite Dance Group. All rights reserved.
          </div>
        </div>
      </footer>

      {openReceipt && (
        <div
          /* Scrollable rather than centred: these are tall phone screenshots and
             the point is reading them, so overflowing beats shrinking to fit. */
          className="fixed inset-0 z-50 overflow-y-auto bg-studio-ink/90 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot — ${openReceipt.source}`}
          onClick={() => setOpenReceipt(null)}
        >
          <div
            className="relative mx-auto w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              variant="studio-outline"
              size="icon"
              className="absolute right-3 top-3 z-10 bg-studio-ink/70"
              aria-label="Close screenshot"
              onClick={() => setOpenReceipt(null)}
            >
              <X />
            </Button>
            <img
              src={openReceipt.image}
              alt={openReceipt.transcript}
              className="w-full rounded-lg ring-1 ring-studio-cream/15"
            />
            <p className="mt-3 pb-2 text-center text-sm text-studio-cream-2/60">
              {openReceipt.source}
            </p>
          </div>
        </div>
      )}

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-studio-ink/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectLabel(selectedProject)} project preview`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            /* Portrait clips get a narrow dialog so a 9:16 phone video is not
               stretched across a 768px-wide box. */
            className={`relative w-full overflow-hidden rounded-lg bg-studio-ink-2 ring-1 ring-studio-cream/15 ${
              selectedProject.aspect === "portrait" ? "max-w-sm" : "max-w-3xl"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              variant="studio-outline"
              size="icon"
              className="absolute right-4 top-4 z-10 bg-studio-ink/60"
              aria-label="Close project preview"
              onClick={() => setSelectedProject(null)}
            >
              <X />
            </Button>
            {(() => {
              const embed = toEmbedUrl(selectedProject.video);

              // A YouTube or Vimeo link.
              if (embed) {
                return (
                  <iframe
                    src={embed}
                    title={projectLabel(selectedProject)}
                    className={
                      selectedProject.aspect === "portrait"
                        ? "aspect-[9/16] w-full"
                        : "aspect-video w-full"
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              }

              // Anything else is treated as a direct video file, e.g. /videos/x.mp4
              return (
                <video
                  src={selectedProject.video}
                  controls
                  autoPlay
                  playsInline
                  className={`w-full bg-studio-ink ${
                    selectedProject.aspect === "portrait" ? "max-h-[75vh]" : "aspect-video"
                  }`}
                />
              );
            })()}
            <div className="p-6 md:p-7">
              {(() => {
                const credit = dancerByName(selectedProject.dancer);
                if (!credit) {
                  return (
                    <h2 className="font-display text-xl font-medium text-studio-cream">
                      {selectedProject.detail}
                    </h2>
                  );
                }
                return (
                  <>
                    <a
                      href="#dancers"
                      className="group/credit flex items-center gap-3"
                      onClick={() => setSelectedProject(null)}
                    >
                      <img
                        src={credit.image}
                        alt=""
                        width={96}
                        height={96}
                        className="size-11 shrink-0 rounded-full object-cover object-top ring-1 ring-studio-cream/20 transition group-hover/credit:ring-studio-amber"
                      />
                      <span>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-studio-cream-2/45">
                          Danced by
                        </span>
                        <h2 className="font-display text-xl font-medium leading-tight text-studio-cream transition-colors group-hover/credit:text-studio-amber">
                          {credit.name}
                        </h2>
                      </span>
                    </a>
                    <p className="mt-3 text-[15px] text-studio-cream-2/65">
                      {selectedProject.detail} · {credit.role}
                    </p>
                  </>
                );
              })()}
              <Button asChild variant="studio" className="mt-6">
                <a href="#contact" onClick={() => setSelectedProject(null)}>
                  Talk about a project <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
