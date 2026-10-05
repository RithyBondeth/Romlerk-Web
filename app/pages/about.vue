<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, CodeXml, Globe2, Languages, Mail, ShieldCheck, Sun } from "@lucide/vue";
const { t, localePath } = useLocale();
const { public: profile } = useRuntimeConfig();
useSeoMeta({
  title: () => t("About the developer | Romlerk"),
  description: () => t("Meet the work behind Romlerk: a thoughtful, private task app for everyday life in English and Khmer."),
  ogTitle: () => t("About the developer | Romlerk"),
  ogDescription: () => t("Meet the work behind Romlerk: a thoughtful, private task app for everyday life in English and Khmer."),
});
</script>

<template>
  <article class="developer-page container">
    <NuxtLink class="inline-link" :to="localePath('/')">
      <ArrowLeft :size="16" />{{ t("Back to Romlerk") }}
    </NuxtLink>

    <section class="developer-hero" aria-labelledby="developer-title">
      <div class="developer-copy">
        <p class="eyebrow">{{ t("About the developer") }}</p>
        <h1 id="developer-title">{{ t("Hi, I’m Bondeth.") }}<br /><span>{{ t("I build with care.") }}</span></h1>
        <p class="developer-intro">{{ t(profile.developerBio || "I’m a full stack developer and AI engineer based in Phnom Penh, Cambodia. I build web applications, mobile apps, and practical AI systems.") }}</p>
        <div class="developer-signature">
          <span class="developer-avatar"><img src="/developer/bondeth.webp" :alt="profile.developerName || 'Rithy Bondeth'" width="64" height="64" /></span>
          <div>
            <strong lang="en">{{ profile.developerName || "Rithy Bondeth" }}</strong>
            <p>{{ t("Full Stack Developer & AI Engineer") }}</p>
          </div>
        </div>
        <div v-if="profile.developerWebsiteUrl || profile.developerGithubUrl || profile.developerEmail || profile.supportEmail" class="developer-links">
          <a v-if="profile.developerWebsiteUrl" class="button button-small" :href="profile.developerWebsiteUrl"><Globe2 :size="17" />{{ t("Visit my portfolio") }}<ArrowUpRight :size="16" /></a>
          <a v-if="profile.developerGithubUrl" class="inline-link" :href="profile.developerGithubUrl"><CodeXml :size="17" /><span lang="en">GitHub</span><ArrowUpRight :size="16" /></a>
          <a v-if="profile.developerEmail || profile.supportEmail" class="inline-link" :href="`mailto:${profile.developerEmail || profile.supportEmail}`"><Mail :size="17" />{{ t("Get in touch") }}<ArrowUpRight :size="16" /></a>
        </div>
      </div>
      <div class="developer-art">
        <img class="app-illustration" src="/illustrations/reading.svg" :alt="t('A person sitting quietly with a book')" width="480" height="360" />
        <span class="developer-art-note"><CodeXml :size="18" />{{ t("Built with a little care.") }}</span>
      </div>
    </section>

    <section class="developer-story" aria-labelledby="developer-story-title">
      <div>
        <p class="eyebrow">{{ t("The idea behind the app") }}</p>
        <h2 id="developer-story-title">{{ t("Small things.") }}<br />{{ t("A meaningful difference.") }}</h2>
      </div>
      <div class="developer-story-copy">
        <p>{{ t("A thought to remember. Someone to call. A little time for yourself. Those everyday things deserve a home that feels easy to use.") }}</p>
        <p>{{ t("That is the idea behind Romlerk: turn a thought into a task, keep the details on your phone, and let you get back to your day. English and Khmer belong here together, from the first thought to the last reminder.") }}</p>
      </div>
    </section>

    <section class="developer-principles" aria-labelledby="developer-principles-title">
      <h2 id="developer-principles-title">{{ t("What guides the work.") }}</h2>
      <div class="developer-principle">
        <span class="step-icon"><ShieldCheck :size="20" /></span>
        <div><h3>{{ t("Your thoughts stay yours.") }}</h3><p>{{ t("Local storage, offline capture, and no account required. Privacy is part of the way Romlerk works.") }}</p></div>
      </div>
      <div class="developer-principle">
        <span class="step-icon"><Languages :size="20" /></span>
        <div><h3>{{ t("Your language belongs here.") }}</h3><p>{{ t("English and Khmer, with room for natural words and clear, comfortable reading.") }}</p></div>
      </div>
      <div class="developer-principle">
        <span class="step-icon"><Sun :size="20" /></span>
        <div><h3>{{ t("A calmer everyday experience.") }}</h3><p>{{ t("Clear choices, gentle motion, and small details that help you move through your day.") }}</p></div>
      </div>
    </section>

    <section class="developer-outro" aria-labelledby="developer-outro-title">
      <div><h2 id="developer-outro-title">{{ t("Take a look around.") }}</h2><p>{{ t("See how a little thought becomes a little more peace of mind.") }}</p></div>
      <div class="developer-outro-actions">
        <NuxtLink class="button" :to="localePath('/')">{{ t("Explore Romlerk") }}<ArrowRight :size="17" /></NuxtLink>
        <NuxtLink class="inline-link" :to="localePath('/help')">{{ t("Help & support") }}<ArrowUpRight :size="16" /></NuxtLink>
      </div>
    </section>
  </article>
</template>
