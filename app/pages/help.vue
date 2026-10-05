<script setup lang="ts">
import { ArrowLeft, ArrowUpRight } from "@lucide/vue";
const { t, localePath } = useLocale();
const config = useRuntimeConfig();
const openDownloads = inject<() => void>("openDownloads")!;
useSeoMeta({
  title: () => t("Help & support | Romlerk"),
  description: () => t("Get started with Romlerk: capture, reminders, offline availability, and data export."),
  ogTitle: () => t("Help & support | Romlerk"),
  ogDescription: () => t("Get started with Romlerk: capture, reminders, offline availability, and data export."),
});
</script>
<template>
  <article class="legal-page container">
    <NuxtLink class="inline-link" :to="localePath('/')"
      ><ArrowLeft :size="16" />{{ t("Back to Romlerk") }}</NuxtLink
    >
    <p class="eyebrow">{{ t("A LITTLE HELP") }}</p>
    <h1>{{ t("Find your way") }}<br />{{ t("around Romlerk.") }}</h1>
    <p class="legal-lead">
      {{ t("A few useful things to know before making yourself at home.") }}
    </p>
    <div class="prose">
      <h2>{{ t("Start with a thought") }}</h2>
      <p>
        {{ t("Tap “What needs doing?” and type a task, such as “Call Mom tomorrow at 9am.” Continue to review the extracted details, correct anything you need, then save. Capture also understands a supported set of Khmer date and time phrases.") }}
      </p>
      <h2>{{ t("Find the right view") }}</h2>
      <p>
        {{ t("Today gathers tasks due today and overdue tasks. Upcoming holds future tasks. Inbox keeps tasks without dates. Notes is a place for longer thoughts, and Search finds tasks and standalone notes by text; status, priority, tag, and due-window filters apply to tasks.") }}
      </p>
      <h2>{{ t("If a reminder is not arriving") }}</h2>
      <p>
        {{ t("Check that notifications are allowed in your phone’s settings. Romlerk shows a warning when a task is saved but its reminder cannot be scheduled. Device battery settings and OS scheduling rules can affect delivery.") }}
      </p>
      <h2>{{ t("If AI or voice is unavailable") }}</h2>
      <p>
        {{ t("You can still capture tasks with the rules parser and edit them manually. Voice appears only when your phone supports on-device recognition. A model may be unavailable because it is disabled, downloading, unsupported, or busy.") }}
      </p>
      <h2>{{ t("Take your tasks with you") }}</h2>
      <p>
        {{ t("Settings offers Create full backup and Restore full backup. A full JSON backup includes tasks, standalone notes, tags, daily plans, preferences, and unfinished capture drafts. Restore previews the file before replacing local data. Keep backup files private: they contain readable data. Task-only JSON and CSV exports are separate and cannot be used for full restore. There is no automatic cross-device sync.") }}
      </p>
      <h2>{{ t("Make a plan for today") }}</h2>
      <p>{{ t("Use Plan my day to choose today’s priorities. Your selections are saved for the day and progress updates as you complete them. What should I do now? offers a starting point from your active tasks.") }}</p>
      <h2>{{ t("Capture from anywhere") }}</h2>
      <p>{{ t("Widgets, launcher shortcuts, and shared text open task capture for review. Unfinished capture is kept locally so you can resume or discard it later. Completing or deleting an item offers a brief Undo action.") }}</p>
      <h2>{{ t("Share with your calendar") }}</h2>
      <p>{{ t("Preview a task and share an ICS file with an installed calendar app. It exports one occurrence; later edits are not automatically synced. Calendar import and automatic sync are not currently available.") }}</p>
      <h2>{{ t("Pricing and compatibility") }}</h2>
      <p>{{ t("Romlerk is being built for iOS and Android. Pricing and final supported OS versions will be confirmed before public launch. Core task features work without an AI model. Enhanced AI and voice depend on device, OS, language, and on-device availability.") }}</p>
      <h2>{{ t("Get the app") }}</h2>
      <p>{{ t("Public downloads are coming soon. Check availability below.") }}</p>
      <button class="button button-small" @click="openDownloads">
        {{ t("Check availability") }}<ArrowUpRight :size="16" /></button
      ><template v-if="config.public.supportEmail"
        ><h2>{{ t("Contact support") }}</h2>
        <p>
          <a :href="`mailto:${config.public.supportEmail}`">{{
            config.public.supportEmail
          }}</a>
        </p></template
      >
    </div>
  </article>
</template>
