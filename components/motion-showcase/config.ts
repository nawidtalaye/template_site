/**
 * Every number the cinematic showcase motion depends on lives here, so the
 * motion can be tuned in one place instead of hunting for magic numbers spread
 * across the component and the stylesheet.
 *
 * Card width, height and gap are NOT here: they are viewport-relative and are
 * declared as CSS custom properties in motion-showcase.module.css, then read
 * back from the DOM once per resize.
 */
export const MOTION = {
  /** Seconds it takes for one poster to travel from the focal line to the next. */
  secondsPerCard: 1.45,

  /**
   * How far from the focal line a poster has to be before it reaches its
   * minimum scale/opacity/brightness, expressed in card pitches (card + gap).
   * 2.2 means the second neighbour is already close to the floor values.
   */
  falloff: 2.2,

  /** Interpolated between the floor (far away) and the ceiling (dead centre). */
  scale: { min: 0.745, max: 1 },
  opacity: { min: 0.55, max: 1 },
  brightness: { min: 0.86, max: 1 },

  /** Px the focused poster rises; pure depth cue, never enough to read as a hop. */
  lift: 10,

  /** Max blur in px applied to the outermost posters. 0 disables the filter. */
  blur: 1.2,

  /** Below this width the blur is dropped: it is the one expensive filter here. */
  blurMinViewport: 768,

  /**
   * Below this width the poster is treated as low power: the per-frame filter
   * and shadow writes are dropped and the stylesheet carries a flat shadow
   * instead. Repainting a 60px shadow on every poster on every frame is what
   * turns the travel into a stutter on a phone.
   */
  lowPowerViewport: 768,

  /**
   * Steps the focus value is quantised into before it is allowed to touch a
   * property that repaints. Fine enough to be invisible, coarse enough that a
   * poster repaints a handful of times per pitch instead of sixty.
   */
  paintSteps: 24,

  /** Shadow alpha at the focal line and at the far edge. */
  shadow: { min: 0.18, max: 0.42 },

  /**
   * Time constant, in seconds, of the exponential blend from the velocity the
   * user threw the track at back to the autoplay velocity. Small enough to feel
   * responsive, large enough that the hand-off is never a visible snap.
   */
  resumeTau: 0.45,

  /** Pointer travel, in px, past which a drag stops counting as a click. */
  dragThreshold: 6,

  /**
   * Horizontal travel, in px, a touch has to make before it is taken as a drag
   * of the track. Until then the finger belongs to the page: a mostly vertical
   * swipe scrolls without dragging the posters sideways.
   */
  touchEngage: 10,

  /** Autoplay does not start until the posters are decoded, or this expires. */
  imageTimeoutMs: 2000,
} as const;

/** Copies of the poster list rendered back to back so the wrap is never seen. */
export const TRACK_COPIES = 2;
