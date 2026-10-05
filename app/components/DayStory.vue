<script setup lang="ts">
import { ArrowUpRight, CalendarDays, Check, FileText, HardDriveDownload, RotateCcw, Sunrise } from "@lucide/vue";
const { t, localePath } = useLocale();
</script>

<template>
  <section class="day-story section container" aria-labelledby="day-story-title">
    <div class="story-heading">
      <Sunrise class="story-sun" :size="42" :stroke-width="1.3" />
      <h2 id="day-story-title">{{ t('A little structure.') }}<br /><em>{{ t('A lot more space.') }}</em></h2>
      <p>{{ t('From your first thought to your next phone. Keep the useful things close, and let the rest of your day unfold.') }}</p>
      <NuxtLink class="inline-link" :to="localePath('/help')">{{ t('Explore what Romlerk can do') }}<ArrowUpRight :size="17" /></NuxtLink>
      <img class="story-illustration app-illustration" src="/illustrations/chilling.svg" alt="" width="320" height="240" loading="lazy" />
      <svg class="story-stroke" viewBox="0 0 280 100" aria-hidden="true"><path class="ink-path" d="M8 30 C70 0 180 12 214 48 C251 88 136 98 131 63 C128 36 204 34 261 69 M244 48 L264 70 L237 74" /></svg>
    </div>
    <div class="story-papers">
      <article class="story-paper paper-plan">
        <div class="paper-art plan-art" aria-hidden="true">
          <span class="paper-date"><Sunrise :size="19" />{{ t('A plan for today') }}</span>
          <div class="paper-task"><span class="paper-check done"><Check :size="16" /></span>{{ t('Pick up a few groceries') }}</div>
          <div class="paper-task"><span class="paper-check" />{{ t('Call Mom') }}<span class="paper-time">4:00 PM</span></div>
          <div class="paper-task"><span class="paper-check" />{{ t('Make time for a little reading') }}</div>
          <div class="paper-progress"><span /></div>
        </div>
        <h3>{{ t('Choose a day you can actually do.') }}</h3>
        <p>{{ t('Pick the tasks that matter for today. Your daily plan keeps your choices and shows your progress. Need a starting point? Ask what to do now.') }}</p>
      </article>
      <article class="story-paper paper-calendar">
        <div class="paper-art calendar-art" aria-hidden="true">
          <CalendarDays :size="34" :stroke-width="1.4" />
          <div class="calendar-slip"><span>{{ t('Make time for a little reading') }}</span><strong>20 min</strong><span class="calendar-line" /><span class="calendar-line short" /></div>
          <span class="calendar-file"><FileText :size="17" />.ics<ArrowUpRight :size="16" /></span>
        </div>
        <h3>{{ t('Make room beyond your task list.') }}</h3>
        <p>{{ t('Share a task with your calendar as an ICS file. Capture from widgets, shortcuts, or shared text, then review it in Romlerk. Calendar export is a snapshot, not automatic sync.') }}</p>
      </article>
      <article class="story-paper paper-backup">
        <div class="paper-art backup-art" aria-hidden="true">
          <div class="backup-sheet"><FileText :size="22" /><span>{{ t('Tasks & notes') }}</span></div>
          <div class="backup-sheet"><RotateCcw :size="22" /><span>{{ t('Plans & preferences') }}</span></div>
          <div class="backup-seal"><HardDriveDownload :size="26" /><span>{{ t('Full backup') }}</span></div>
        </div>
        <h3>{{ t('Your plans can come with you.') }}</h3>
        <p>{{ t('Create a full JSON backup and restore it on another phone, including standalone notes, daily plans, and preferences. Task-only JSON and CSV exports are also available.') }}</p>
      </article>
    </div>
  </section>
</template>
