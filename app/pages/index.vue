<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  FileText,
  Globe2,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "@lucide/vue";
const { t, localePath } = useLocale();
const landing = ref<HTMLElement>();
useLandingMotion(landing);
const config = useRuntimeConfig();
const downloadLabel = computed(() => config.public.appStoreUrl || config.public.playStoreUrl ? "Get Romlerk" : "Check availability");
const openDownloads = inject<() => void>("openDownloads")!;
useSeoMeta({
  title: () => t("Romlerk | Your day, a little lighter"),
  description: () => t("Everyday thoughts, turned into tasks. Private, offline, and ready for English and Khmer."),
  ogTitle: () => t("Romlerk | Your day, a little lighter"),
  ogDescription: () => t("Everyday thoughts, turned into tasks. Private, offline, and ready for English and Khmer."),
});
const questions = [
  {
    title: "Does Romlerk work without internet?",
    answer:
      "Yes. Your tasks, notes, search, and local reminders work offline. English and Khmer rules-based capture works without a model. Enhanced AI and voice depend on on-device availability; the operating system may need to download a model first.",
  },
  {
    title: "Do I need an account?",
    answer:
      "No. Romlerk keeps its task database on your device, so you can start without signing in or creating a profile.",
  },
  {
    title: "Does my phone need AI?",
    answer:
      "No. Romlerk includes its own English and Khmer parser and manual editing. On eligible devices, Apple Foundation Models or Gemini Nano can enhance capture. If a model is unavailable, the rules parser takes over.",
  },
  {
    title: "Can I capture tasks in Khmer?",
    answer:
      "Yes. Romlerk supports English and Khmer task capture and interface text. Voice recognition is available only when your phone supports on-device recognition for your spoken language.",
  },
  {
    title: "What happens to my tasks if I change phones?",
    answer:
      "Create a full JSON backup in Settings, then restore it on your new phone. It includes tasks, standalone notes, daily plans, and preferences. Task-only JSON and CSV exports cannot be used for full restore. Phone backup is enabled by default; there is no account or automatic cross-device sync.",
  },
  {
    title: "How much will Romlerk cost?",
    answer: "Pricing and any purchase options will be announced before public launch. There are no purchases or subscriptions available on this website.",
  },
  {
    title: "Which phones will be supported?",
    answer: "Romlerk is being built for iOS and Android. Final supported OS versions and device requirements will be confirmed before release. Core tasks do not require an AI model; enhanced AI and on-device voice have separate device and language requirements.",
  },
  {
    title: "Can I use it with my calendar?",
    answer: "You can preview a task and share it as an ICS calendar file. Opening it depends on your installed calendar apps. Later task edits are not automatically synced, and calendar import is not currently available.",
  },
];
</script>

<template>
  <div ref="landing" class="landing-page">
  <div class="reading-progress" aria-hidden="true" />
  <section class="hero container">
    <div class="hero-copy">
      <p class="hero-kicker"><span class="kicker-dot" />{{ t("A little space for what matters.") }}</p>
      <h1><span class="hero-line">{{ t("Your day,") }}</span><span class="hero-line">{{ t("a little") }} <em>{{ t("lighter.") }}</em></span></h1>
      <p class="hero-description">
        {{ t("Everyday thoughts, turned into tasks and reminders. A private little space on your phone, in English or Khmer.") }}
      </p>
      <div class="hero-actions">
        <button class="button" @click="openDownloads">
          {{ t(downloadLabel) }}<ArrowUpRight :size="18" /></button
        ><a class="button button-quiet" href="#how-it-works"
          >{{ t("See how it works") }}<ArrowRight :size="17"
        /></a>
      </div>
      <p class="hero-platforms">
        <Smartphone :size="15" />{{ t("Coming soon for iOS & Android") }}
      </p>
      <div class="hero-note"><img class="app-illustration" src="/illustrations/coffee.svg" alt="" width="160" height="120" /><span>{{ t("Room for your plans.") }}<br /><strong>{{ t("And the rest of your life.") }}</strong></span></div>
    </div>
    <div class="hero-visual">
      <svg class="hero-orbit" viewBox="0 0 480 650" aria-hidden="true"><path class="ink-path" d="M63 87 C-54 206 36 540 253 594 C431 638 488 437 421 309 C363 197 233 228 333 107 M316 109 L334 105 L327 126" /></svg>
      <div class="hero-stage" aria-hidden="true" /><span class="hero-sticker"><ShieldCheck :size="17" />{{ t("Just you. Your phone. Your plans.") }}</span>
      <PhoneShowcase />
    </div>
  </section>

  <div class="promise-strip container">
    <span><WifiOff :size="19" />{{ t("A whole day, offline.") }}</span
    ><span><LockKeyhole :size="19" />{{ t("Private by design.") }}</span
    ><span
      ><MessageCircle :size="19" />{{ t("English &") }} <span lang="km">ខ្មែរ</span>.</span
    >
  </div>

  <section id="how-it-works" class="section container capture-section">
    <div class="section-copy">
      <p class="eyebrow"><span class="section-number">01</span>{{ t("From thought to task") }}</p>
      <h2>{{ t("Write it down.") }}<br />{{ t("Let your mind move on.") }}</h2>
      <p>
        {{ t("“Call Mom tomorrow at 9.” That’s enough. Romlerk picks out the details, and you decide what to save.") }}
      </p>
      <div class="capture-steps">
        <div>
          <span class="step-icon"><MessageCircle :size="18" /></span>
          <div>
            <h3>{{ t("Say it naturally") }}</h3>
            <p>{{ t("Type a thought, or speak on supported devices.") }}</p>
          </div>
        </div>
        <div>
          <span class="step-icon"><CalendarDays /></span>
          <div>
            <h3>{{ t("Make it yours") }}</h3>
            <p>{{ t("Review the date, time, and details before saving.") }}</p>
          </div>
        </div>
        <div>
          <span class="step-icon"><Check :size="19" /></span>
          <div>
            <h3>{{ t("Get on with your day") }}</h3>
            <p>{{ t("A local reminder brings it back when you need it.") }}</p>
          </div>
        </div>
      </div>
    </div>
    <CaptureDemo />
  </section>

  <section id="made-for-you" class="section container everyday-section">
    <div class="section-heading">
      <p class="eyebrow"><span class="section-number">02</span>{{ t("Made for real life") }}</p>
      <h2>{{ t("Less juggling.") }}<br />{{ t("More living.") }}</h2>
      <p>{{ t("A simple place for your plans, with room for the rest of your life.") }}</p>
    </div>
    <div class="everyday-grid">
      <article class="feature-today">
        <div>
          <span class="feature-icon"><Check :size="22" /></span>
          <h3>{{ t("A clear view of today.") }}</h3>
          <p>
            {{ t("See what’s ahead, what needs a little attention, and what you’ve already done.") }}
          </p>
        </div>
        <img
          class="app-illustration"
          src="/illustrations/chilling.svg"
          :alt="t('A person relaxing with their feet up')"
          width="360"
          height="270"
          loading="lazy"
        />
      </article>
      <article class="feature-language">
        <Globe2 :size="26" />
        <h3>{{ t("Your words.") }}<br />{{ t("Your language.") }}</h3>
        <p>
          {{ t("Capture in English or Khmer. Keep the thought in the language it came in.") }}
        </p>
        <div class="language-examples">
          <span lang="en">Read a little tonight</span
          ><span lang="km">អានសៀវភៅយប់នេះ</span>
        </div>
      </article>
      <article class="feature-details">
        <div>
          <h3>{{ t("A routine. A note.") }}<br />{{ t("A nudge at the right time.") }}</h3>
          <p>
            {{ t("Add recurring tasks, tags, priorities, and notes. Keep the small things together.") }}
          </p>
        </div>
        <img class="app-illustration details-illustration" src="/illustrations/strolling.svg" alt="" width="200" height="150" loading="lazy" />
        <div class="detail-tags">
          <span><RotateCcw />{{ t("Every Sunday") }}</span
          ><span><FileText />{{ t("A note to self") }}</span
          ><span><Bell />{{ t("Tomorrow, 9 AM") }}</span>
        </div>
      </article>
    </div>
  </section>

  <DayStory />

  <section class="section container privacy-section">
    <div class="privacy-art">
      <img
        class="app-illustration"
        src="/illustrations/reading.svg"
        :alt="t('A person sitting quietly with a book')"
        width="400"
        height="300"
        loading="lazy"
      /><span><ShieldCheck :size="18" />{{ t("A personal space, on your phone.") }}</span>
    </div>
    <div class="section-copy">
      <p class="eyebrow"><span class="section-number">03</span>{{ t("A little peace of mind") }}</p>
      <h2>{{ t("On your phone.") }}<br />{{ t("On your terms.") }}</h2>
      <p>
        {{ t("Your thoughts don’t need a cloud account. Romlerk processes capture on your device and keeps your tasks in a local database.") }}
      </p>
      <ul class="privacy-points">
        <li><Check :size="17" />{{ t("No account or cloud AI required") }}</li>
        <li><Check :size="17" />{{ t("Works with or without an on-device model") }}</li>
        <li><Check :size="17" />{{ t("You choose phone backup and export") }}</li>
      </ul>
      <NuxtLink class="inline-link" :to="localePath('/privacy')"
        >{{ t("Read about your privacy") }}<ArrowUpRight :size="16"
      /></NuxtLink>
    </div>
  </section>

  <section id="questions" class="section container faq-section">
    <div class="section-heading">
      <p class="eyebrow">{{ t("Before you get started") }}</p>
      <h2>{{ t("Good questions.") }}<br />{{ t("Simple answers.") }}</h2>
      <NuxtLink class="inline-link" :to="localePath('/help')"
        >{{ t("More about Romlerk") }}<ArrowUpRight :size="16"
      /></NuxtLink>
    </div>
    <div class="faq-list">
      <SmoothFaq
        v-for="question in questions"
        :key="question.title"
        :title="t(question.title)"
        :answer="t(question.answer)"
      />
    </div>
  </section>

  <section class="closing-section container">
    <img class="closing-illustration app-illustration" src="/illustrations/meditating.svg" alt="" width="240" height="180" loading="lazy" />
    <span class="closing-symbol closing-logo"
      ><img src="/branding/romlerk-logo.png" alt="" width="96" height="96"
    /></span>
    <h2><span class="closing-line">{{ t("Carry your day.") }}</span><span class="closing-line"><em>{{ t("Not everything in your head.") }}</em></span></h2>
    <p>{{ t("A thought. A task. A little peace of mind.") }}</p>
    <button class="button" @click="openDownloads">
      {{ t(downloadLabel) }}<ArrowUpRight :size="18" /></button
    ><span class="closing-note">{{ t("Coming soon for iOS & Android") }}</span>
  </section>
  </div>
</template>
