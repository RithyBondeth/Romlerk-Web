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
const openDownloads = inject<() => void>("openDownloads")!;
useSeoMeta({
  ogTitle: "Romlerk | Your day, a little lighter",
  ogDescription:
    "Everyday thoughts, turned into tasks. Private, offline, and ready for English and Khmer.",
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
      "You can export tasks as JSON or CSV. Phone backup is enabled by default and can be turned off in Settings; changing that choice takes effect at the next launch. There is currently no Romlerk account or cross-device sync.",
  },
];
</script>

<template>
  <section class="hero container">
    <div class="hero-copy">
      <p class="eyebrow">
        <span class="eyebrow-rule" />A LITTLE SPACE FOR WHAT MATTERS
      </p>
      <h1>Your day,<br />a little <span>lighter.</span></h1>
      <p class="hero-description">
        Everyday thoughts, turned into tasks and reminders. A private little
        space on your phone, in English or Khmer.
      </p>
      <div class="hero-actions">
        <button class="button" @click="openDownloads">
          Get Romlerk<ArrowUpRight :size="18" /></button
        ><a class="button button-quiet" href="#how-it-works"
          >See how it works<ArrowRight :size="17"
        /></a>
      </div>
      <p class="hero-platforms">
        <Smartphone :size="15" />Coming soon for iOS & Android
      </p>
    </div>
    <TodayPreview />
  </section>

  <div class="promise-strip container">
    <span><WifiOff :size="19" />A whole day, offline.</span
    ><span><LockKeyhole :size="19" />Private by design.</span
    ><span
      ><MessageCircle :size="19" />English & <span lang="km">ខ្មែរ</span>.</span
    >
  </div>

  <section id="how-it-works" class="section container capture-section">
    <div class="section-copy">
      <p class="eyebrow">FROM THOUGHT TO TASK</p>
      <h2>Write it down.<br />Let your mind move on.</h2>
      <p>
        “Call Mom tomorrow at 9.” That’s enough. Romlerk picks out the details,
        and you decide what to save.
      </p>
      <div class="capture-steps">
        <div>
          <span class="step-icon"><MessageCircle :size="18" /></span>
          <div>
            <h3>Say it naturally</h3>
            <p>Type a thought, or speak on supported devices.</p>
          </div>
        </div>
        <div>
          <span class="step-icon"><CalendarDays /></span>
          <div>
            <h3>Make it yours</h3>
            <p>Review the date, time, and details before saving.</p>
          </div>
        </div>
        <div>
          <span class="step-icon"><Check :size="19" /></span>
          <div>
            <h3>Get on with your day</h3>
            <p>A local reminder brings it back when you need it.</p>
          </div>
        </div>
      </div>
    </div>
    <CaptureDemo />
  </section>

  <section id="made-for-you" class="section container everyday-section">
    <div class="section-heading">
      <h2>Less juggling.<br />More living.</h2>
      <p>A simple place for your plans, with room for the rest of your life.</p>
    </div>
    <div class="everyday-grid">
      <article class="feature-today">
        <div>
          <span class="feature-icon"><Check :size="22" /></span>
          <h3>A clear view of today.</h3>
          <p>
            See what’s ahead, what needs a little attention, and what you’ve
            already done.
          </p>
        </div>
        <img
          class="app-illustration"
          src="/illustrations/chilling.svg"
          alt="A person relaxing with their feet up"
          width="360"
          height="270"
          loading="lazy"
        />
      </article>
      <article class="feature-language">
        <Globe2 :size="26" />
        <h3>Your words.<br />Your language.</h3>
        <p>
          Capture in English or Khmer. Keep the thought in the language it came
          in.
        </p>
        <div class="language-examples">
          <span>Read a little tonight</span
          ><span lang="km">អានសៀវភៅយប់នេះ</span>
        </div>
      </article>
      <article class="feature-details">
        <div>
          <h3>A routine. A note.<br />A nudge at the right time.</h3>
          <p>
            Add recurring tasks, tags, priorities, and notes. Keep the small
            things together.
          </p>
        </div>
        <div class="detail-tags">
          <span><RotateCcw />Every Sunday</span
          ><span><FileText />A note to self</span
          ><span><Bell />Tomorrow, 9 AM</span>
        </div>
      </article>
    </div>
  </section>

  <section class="section container privacy-section">
    <div class="privacy-art">
      <img
        class="app-illustration"
        src="/illustrations/reading.svg"
        alt="A person sitting quietly with a book"
        width="400"
        height="300"
        loading="lazy"
      /><span><ShieldCheck :size="18" />A personal space, on your phone.</span>
    </div>
    <div class="section-copy">
      <p class="eyebrow">YOUR LIFE IS YOUR BUSINESS</p>
      <h2>On your phone.<br />On your terms.</h2>
      <p>
        Your thoughts don’t need a cloud account. Romlerk processes capture on
        your device and keeps your tasks in a local database.
      </p>
      <ul class="privacy-points">
        <li><Check :size="17" />No account or cloud AI required</li>
        <li><Check :size="17" />Works with or without an on-device model</li>
        <li><Check :size="17" />You choose phone backup and export</li>
      </ul>
      <NuxtLink class="inline-link" to="/privacy"
        >Read about your privacy<ArrowUpRight :size="16"
      /></NuxtLink>
    </div>
  </section>

  <section id="questions" class="section container faq-section">
    <div class="section-heading">
      <h2>Good questions.<br />Simple answers.</h2>
      <NuxtLink class="inline-link" to="/help"
        >More about Romlerk<ArrowUpRight :size="16"
      /></NuxtLink>
    </div>
    <div class="faq-list">
      <SmoothFaq
        v-for="question in questions"
        :key="question.title"
        :title="question.title"
        :answer="question.answer"
      />
    </div>
  </section>

  <section class="closing-section container">
    <span class="closing-symbol"><Check :size="31" :stroke-width="1.7" /></span>
    <h2>Carry your day.<br />Not everything in your head.</h2>
    <p>A thought. A task. A little peace of mind.</p>
    <button class="button" @click="openDownloads">
      Get Romlerk<ArrowUpRight :size="18" /></button
    ><span class="closing-note">Coming soon for iOS & Android</span>
  </section>
</template>
