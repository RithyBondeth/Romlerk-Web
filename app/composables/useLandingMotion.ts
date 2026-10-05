import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** All choreography belongs to this page and is reverted on navigation. */
export function useLandingMotion(root: Ref<HTMLElement | undefined>) {
  let media: gsap.MatchMedia | undefined;
  let observer: ResizeObserver | undefined;
  let frame = 0;
  let alive = true;
  onMounted(() => {
    if (!root.value) return;
    gsap.registerPlugin(ScrollTrigger);
    const element = root.value;
    media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const select = gsap.utils.selector(element);
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from(select(".hero-line"), { y: 28, rotation: 0.5, opacity: 0.5, duration: 0.75, stagger: 0.12 })
        .from(select(".hero-kicker, .hero-description, .hero-actions, .hero-platforms, .hero-note"), { y: 16, opacity: 0.5, duration: 0.55, stagger: 0.06 }, "-=0.6")
        .from(select(".hero-visual"), { y: 28, rotation: -2, scale: 0.97, duration: 0.95 }, 0.12);
      element.querySelectorAll<SVGPathElement>(".ink-path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.4,
          scrollTrigger: { trigger: path.closest("section"), start: "top 80%", once: true },
        });
      });
      gsap.to(select(".reading-progress"), { scaleX: 1, ease: "none", scrollTrigger: {
        trigger: element, start: "top top", end: "bottom bottom", scrub: 0.25,
      } });
      gsap.from(select(".capture-steps > div"), { x: -20, opacity: 0.4, stagger: 0.16, duration: 0.7,
        scrollTrigger: { trigger: ".capture-section", start: "top 70%", once: true } });
      gsap.from(select(".capture-demo"), { y: 40, rotation: 2, duration: 0.9,
        scrollTrigger: { trigger: ".capture-section", start: "top 70%", once: true } });
      gsap.from(select(".everyday-grid article"), { y: 32, opacity: 0.5, stagger: 0.14, duration: 0.8,
        scrollTrigger: { trigger: ".everyday-grid", start: "top 85%", once: true } });
      select(".story-paper").forEach((paper: HTMLElement, index: number) => {
        gsap.from(paper, { y: 60, rotation: index % 2 ? 3 : -3, scale: 0.94, ease: "none",
          scrollTrigger: { trigger: paper, start: "top 95%", end: "top 42%", scrub: 0.6 } });
        gsap.from(paper.querySelectorAll(".paper-art > *"), { y: 18, opacity: 0.4, stagger: 0.12, duration: 0.65,
          scrollTrigger: { trigger: paper, start: "top 65%", once: true } });
      });
      if (context.conditions?.desktop) {
        ScrollTrigger.create({ trigger: ".day-story", start: "top 130px", end: "bottom bottom-=90px",
          pin: select(".story-heading")[0], pinSpacing: false, invalidateOnRefresh: true });
        gsap.to(select(".hero-visual"), { y: -45, rotation: -2, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });
      }
      gsap.from(select(".privacy-art img"), { scale: 0.88, y: 32, ease: "none",
        scrollTrigger: { trigger: ".privacy-section", start: "top 90%", end: "center 55%", scrub: 0.7 } });
      gsap.from(select(".closing-line"), { y: 28, opacity: 0.4, stagger: 0.18, duration: 0.85,
        scrollTrigger: { trigger: ".closing-section", start: "top 80%", once: true } });
    }, element);
    // Disclosure/demo height changes must not leave later triggers at stale positions.
    let lastHeight = element.offsetHeight;
    observer = new ResizeObserver(() => {
      if (Math.abs(element.offsetHeight - lastHeight) < 2) return;
      lastHeight = element.offsetHeight;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(element);
    void document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
  });
  onBeforeUnmount(() => {
    alive = false;
    observer?.disconnect();
    cancelAnimationFrame(frame);
    media?.revert();
  });
}
