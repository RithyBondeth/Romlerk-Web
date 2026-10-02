import { gsap } from "gsap";

export function useMotion() {
  const reduced = ref(false);
  let query: MediaQueryList | undefined;
  const menuPadding = new WeakMap<
    Element,
    { paddingTop: string; paddingBottom: string }
  >();
  const animations = new Set<gsap.core.Tween>();
  function sync() {
    reduced.value = !!query?.matches;
    if (reduced.value) animations.forEach((animation) => animation.progress(1));
  }
  onMounted(() => {
    query = window.matchMedia("(prefers-reduced-motion: reduce)");
    sync();
    query.addEventListener("change", sync);
  });
  onBeforeUnmount(() => {
    query?.removeEventListener("change", sync);
    animations.forEach((animation) => animation.kill());
    animations.clear();
  });
  function animate(target: gsap.TweenTarget, vars: gsap.TweenVars) {
    let tween: gsap.core.Tween;
    tween = gsap.to(target, {
      duration: reduced.value ? 0 : 0.32,
      ease: "power2.out",
      overwrite: "auto",
      ...vars,
      onInterrupt() {
        animations.delete(tween);
        vars.onInterrupt?.();
      },
      onComplete() {
        animations.delete(tween);
        vars.onComplete?.();
      },
    });
    if (tween.isActive()) animations.add(tween);
    return tween;
  }
  function enter(element: Element, done: () => void) {
    // Vue can cancel a leave midway; continue from that position instead of jumping.
    if (!(element as HTMLElement).style.opacity) {
      gsap.set(element, { opacity: 0, y: reduced.value ? 0 : 6 });
    }
    const menu = element.classList.contains("mobile-nav");
    if (menu) {
      if (!menuPadding.has(element)) {
        const style = getComputedStyle(element);
        menuPadding.set(element, {
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
        });
      }
      (element as HTMLElement).style.overflow = "hidden";
      if (!(element as HTMLElement).style.height)
        gsap.set(element, { height: 0, paddingTop: 0, paddingBottom: 0 });
    }
    animate(element, {
      ...(menu ? { height: "auto", ...menuPadding.get(element) } : {}),
      opacity: 1,
      y: 0,
      clearProps: "opacity,transform,height,overflow,paddingTop,paddingBottom",
      onComplete: done,
    });
  }
  function leave(element: Element, done: () => void) {
    animate(element, {
      ...(element.classList.contains("mobile-nav")
        ? { height: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden" }
        : {}),
      opacity: 0,
      y: reduced.value ? 0 : -4,
      duration: reduced.value ? 0 : 0.16,
      onComplete: done,
    });
  }
  function cancel(element: Element) {
    gsap.killTweensOf(element);
  }
  return { animate, enter, leave, cancel, reduced };
}
