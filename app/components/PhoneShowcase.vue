<script setup lang="ts">
import { MoveHorizontal, Pause, Play } from "@lucide/vue";
import type { gsap } from "gsap";
const { t, locale } = useLocale();
const { animate, reduced } = useMotion();
const screens = [
  { id: "today", title: "Today", caption: "A little plan for your day.", detail: "Try completing a task or planning your day." },
  { id: "upcoming", title: "Upcoming", caption: "Make room for what’s next.", detail: "Future tasks, neatly gathered by day." },
  { id: "notes", title: "Notes", caption: "A home for your ideas.", detail: "Keep longer thoughts close to your tasks." },
  { id: "search", title: "Search", caption: "Find a thought in a moment.", detail: "Search your tasks and notes in one place." },
];
const active = ref(0);
const showcase = ref<HTMLElement>();
const playback = ref<HTMLButtonElement>();
const hintId = useId();
const scene = ref<HTMLElement>();
const cards = ref<HTMLElement[]>([]);
const selected = computed(() => screens[active.value]!);
const dragging = ref(false);
const paused = ref(false);
const hovered = ref(false);
const focused = ref(false);
const visible = ref(false);
const announce = ref(false);
let mounted = false;
let autoTimer: ReturnType<typeof setTimeout> | undefined;
let visibilityObserver: IntersectionObserver | undefined;
let gesture: { id: number; x: number; y: number; dx: number; origin: number; horizontal: boolean } | undefined;
let suppressClick = false;
let spread = 55;
const motion = { position: 0 };
let destination = 0;
let travel: gsap.core.Tween | undefined;
let dragFrame = 0;
function stopAuto() {
  clearTimeout(autoTimer);
  autoTimer = undefined;
}
function canRotate() {
  return mounted && visible.value && !paused.value && !reduced.value && !hovered.value && !focused.value && !gesture && !document.hidden;
}
function scheduleAuto() {
  stopAuto();
  if (!canRotate()) return;
  autoTimer = setTimeout(() => {
    if (canRotate()) select(active.value + 1, false, true);
  }, 6000);
}
function hover(event: PointerEvent, value: boolean) {
  if (event.pointerType !== "mouse") return;
  hovered.value = value;
  if (!value && gesture && !gesture.horizontal) {
    gesture = undefined;
    scheduleAuto();
  }
}
function focusin(event: FocusEvent) {
  // The playback control itself stays available without preventing explicit resume.
  focused.value = event.target !== playback.value;
}
function focusout(event: FocusEvent) {
  if (!showcase.value?.contains(event.relatedTarget as Node | null)) focused.value = false;
}
function wrap(value: number) {
  return (value % screens.length + screens.length) % screens.length;
}
function render() {
  // Wrap only at the invisible rear position. All poses share one continuous playhead.
  cards.value.forEach((card, index) => {
    const offset = wrap(index - motion.position + screens.length / 2) - screens.length / 2;
    const depth = Math.abs(offset);
    const rotation = reduced.value ? 0 : offset * 7 - 2;
    const rotationY = reduced.value ? 0 : offset * -10;
    // Write one composed transform per phone, rather than separate transform setters.
    card.style.transform = `translate3d(${offset * spread}px, ${depth * 20}px, 0) rotate(${rotation}deg) rotateY(${rotationY}deg) scale(${1 - depth * 0.15})`;
    // This smooth curve reaches zero before a phone wraps to the opposite side.
    card.style.opacity = String(depth <= 1 ? 1 - depth * 0.24 : 0.76 * (2 - depth) ** 2);
    const layer = String(Math.round((2 - depth) * 100));
    if (card.style.zIndex !== layer) card.style.zIndex = layer;
  });
}
function settle(fromDrag = false) {
  travel?.kill();
  travel = animate(motion, {
    position: destination,
    duration: fromDrag ? 0.48 : 0.68,
    ease: fromDrag ? "power3.out" : "power2.inOut",
    onUpdate: render,
    onComplete: render,
  });
}
function select(index: number, fromDrag = false, automatic = false) {
  announce.value = !automatic;
  // Keep the destination unwrapped so rapid clicks and the last-to-first step continue.
  destination += wrap(index - destination + screens.length / 2) - screens.length / 2;
  active.value = wrap(destination);
  settle(fromDrag);
  scheduleAuto();
}
function keydown(event: KeyboardEvent) {
  // Arrow keys inside the interactive phone remain available for native scrolling.
  if (event.target !== event.currentTarget) return;
  if (event.key === " " && !reduced.value) {
    event.preventDefault();
    paused.value = !paused.value;
    return;
  }
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  select(event.key === "Home" ? 0 : event.key === "End" ? screens.length - 1 : active.value + (event.key === "ArrowRight" ? 1 : -1));
}
function pointerdown(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || gesture) return;
  suppressClick = false;
  stopAuto();
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, origin: motion.position, horizontal: false };
}
function pointermove(event: PointerEvent) {
  if (!gesture || gesture.id !== event.pointerId) return;
  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;
  if (!gesture.horizontal) {
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      gesture = undefined;
      scheduleAuto();
      return;
    }
    if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return;
    gesture.horizontal = true;
    travel?.kill();
    gesture.origin = motion.position;
    destination = Math.round(motion.position);
    active.value = wrap(destination);
    dragging.value = true;
    suppressClick = true;
    scene.value?.setPointerCapture(event.pointerId);
  }
  gesture.dx = dx;
  if (!dragFrame) dragFrame = requestAnimationFrame(renderDrag);
}
function renderDrag() {
  dragFrame = 0;
  if (!gesture?.horizontal) return;
  motion.position = gesture.origin - Math.max(-0.95, Math.min(0.95, gesture.dx / 180));
  render();
}
function finish(event: PointerEvent) {
  if (!gesture || gesture.id !== event.pointerId) return;
  const { dx, horizontal } = gesture;
  cancelAnimationFrame(dragFrame);
  if (horizontal) renderDrag();
  gesture = undefined;
  dragging.value = false;
  if (scene.value?.hasPointerCapture(event.pointerId)) scene.value.releasePointerCapture(event.pointerId);
  if (event.type === "pointerup" && horizontal && Math.abs(dx) >= 45) select(active.value + (dx < 0 ? 1 : -1), true);
  else if (horizontal) settle(true);
  scheduleAuto();
}
function click(event: MouseEvent) {
  if (!suppressClick) return;
  suppressClick = false;
  if (event.detail === 0) return;
  event.preventDefault();
  event.stopPropagation();
}
function resize() {
  // Match the CSS spread once per resize, rather than reading layout during a drag.
  spread = Math.max(55, Math.min(100, window.innerWidth * 0.07));
  render();
}
onMounted(() => {
  mounted = true;
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", scheduleAuto);
  visibilityObserver = new IntersectionObserver(([entry]) => {
    visible.value = !!entry?.isIntersecting && entry.intersectionRatio >= 0.4;
  }, { threshold: [0, 0.4] });
  if (scene.value) visibilityObserver.observe(scene.value);
});
onBeforeUnmount(() => {
  mounted = false;
  stopAuto();
  visibilityObserver?.disconnect();
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", scheduleAuto);
  cancelAnimationFrame(dragFrame);
  travel?.kill();
});
watch(reduced, () => {
  travel?.kill();
  motion.position = destination;
  render();
});
watch([paused, reduced, hovered, focused, visible], scheduleAuto);
</script>

<template>
  <section ref="showcase" class="phone-showcase" role="region" :aria-label="t('Explore Romlerk screens')" :aria-roledescription="t('carousel')" :aria-describedby="hintId" tabindex="0" @keydown="keydown" @pointerenter="hover($event, true)" @pointerleave="hover($event, false)" @focusin="focusin" @focusout="focusout">
    <div ref="scene" class="showcase-scene" :class="{ dragging }" @pointerdown="pointerdown" @pointermove="pointermove" @pointerup="finish" @pointercancel="finish" @lostpointercapture="finish" @click.capture="click" @dragstart.prevent>
      <div v-for="(screen, index) in screens" :key="screen.id" :ref="el => { if (el) cards[index] = el as HTMLElement; }" class="showcase-card" role="group" :aria-roledescription="t('slide')" :aria-label="t('{screen}, {number} of {total}', { screen: t(screen.title), number: index + 1, total: screens.length })" :aria-hidden="index !== active" :inert="index !== active" :style="{ '--offset': index > 2 ? index - 4 : index, zIndex: index === 0 ? 4 : index === 2 ? 0 : 2, opacity: index === 2 ? 0 : 1 }">
        <TodayPreview v-if="screen.id === 'today'" embedded />
        <div v-else class="phone-preview screenshot-phone">
          <div class="phone-status" aria-hidden="true"><span>9:41</span><div class="camera-pill" /><span class="status-signal">▰</span></div>
          <div class="showcase-screenshot" role="img" :aria-label="t('{screen} app screenshot', { screen: t(screen.title) })">
            <img class="screen-light" :src="`/showcase/${locale}-light-${screen.id}.png`" alt="" width="780" height="1688" loading="eager" decoding="async" draggable="false" />
            <img class="screen-dark" :src="`/showcase/${locale}-dark-${screen.id}.png`" alt="" width="780" height="1688" loading="eager" decoding="async" draggable="false" />
          </div>
        </div>
      </div>
    </div>
    <button v-if="!reduced" ref="playback" class="showcase-playback" :aria-label="t(paused ? 'Resume automatic preview' : 'Pause automatic preview')" :title="t(paused ? 'Resume automatic preview' : 'Pause automatic preview')" @click="paused = !paused"><Play v-if="paused" :size="16" /><Pause v-else :size="16" /></button>
    <div class="showcase-caption" :aria-live="announce ? 'polite' : 'off'" aria-atomic="true"><p class="showcase-title">{{ t(selected.caption) }}</p><p>{{ t(selected.detail) }}</p><span class="sr-only">{{ t('{screen}, {number} of {total}', { screen: t(selected.title), number: active + 1, total: screens.length }) }}</span></div>
    <p :id="hintId" class="showcase-hint"><MoveHorizontal :size="15" /><span>{{ t('Swipe left or right to explore') }}</span><span class="showcase-count" aria-hidden="true">{{ active + 1 }} / {{ screens.length }}</span><span class="sr-only">{{ t('Use arrow keys to explore. Press Space to pause or resume.') }}</span></p>
  </section>
</template>

<style scoped>
.phone-showcase { position: relative; width: 100%; padding-top: 16px; border-radius: 24px; }
.showcase-scene { position: relative; height: 666px; perspective: 1200px; touch-action: pan-y; cursor: grab; }
.showcase-scene.dragging { cursor: grabbing; user-select: none; }
.showcase-card { --offset: 0; position: absolute; top: 16px; left: 50%; width: 280px; margin-left: -140px; transform: translateX(calc(var(--offset) * clamp(55px, 7vw, 100px))) rotate(-2deg); transform-origin: 50% 60%; }
.showcase-card[inert] { pointer-events: none; user-select: none; }
.showcase-card :deep(.phone-preview) { width: 280px; height: 630px; transform: none; display: flex; flex-direction: column; }
.showcase-card :deep(.phone-status) { flex-shrink: 0; }
.showcase-card :deep(.phone-content) { flex: 1; overflow-y: auto; scrollbar-width: thin; }
.showcase-card :deep(.phone-controls) { flex-shrink: 0; }
.showcase-screenshot { flex: 1; min-height: 0; overflow: hidden; }
.showcase-screenshot img { display: block; width: 100%; height: 100%; object-fit: cover; }
.showcase-screenshot .screen-dark { display: none; }
:global(:root[data-theme='dark'] .phone-showcase .screen-light) { display: none; }
:global(:root[data-theme='dark'] .phone-showcase .screen-dark) { display: block; }
@media (prefers-color-scheme: dark) {
  :global(:root:not([data-theme='light']) .phone-showcase .screen-light) { display: none; }
  :global(:root:not([data-theme='light']) .phone-showcase .screen-dark) { display: block; }
}
.showcase-playback { position: absolute; top: 22px; right: 0; z-index: 3; display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 50%; background: var(--raised); color: var(--muted); transition: background 180ms, color 180ms; }
.showcase-playback:hover { background: var(--accent-soft); color: var(--accent); }
.showcase-caption { min-height: 78px; padding: 14px 8px 0; text-align: center; color: var(--muted); font-size: 12px; }
.showcase-caption .showcase-title { color: var(--ink); font-weight: 500; font-size: 17px; margin-bottom: 3px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
.showcase-hint { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 11px; color: var(--muted); margin-top: 4px; }
.showcase-count { flex-shrink: 0; border-left: 1px solid var(--line); padding-left: 9px; font-variant-numeric: tabular-nums; }
@media (max-width: 370px) {
  .showcase-card { width: 252px; margin-left: -126px; }
  .showcase-card :deep(.phone-preview) { width: 252px; height: 570px; }
  .showcase-scene { height: 607px; }
  .showcase-caption { min-height: 96px; }
}
@media (prefers-reduced-motion: reduce) {
  .showcase-card { transform: translateX(calc(var(--offset) * clamp(55px, 7vw, 100px))); }
  .showcase-playback { transition: none; }
}
</style>
