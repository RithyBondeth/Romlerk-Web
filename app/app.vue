<script setup lang="ts">
import { ArrowUpRight, Menu, Moon, Sun, X } from "@lucide/vue";
const { t, locale, localePath, rememberLocale } = useLocale();
const menuOpen = ref(false);
const { animate, enter, leave, cancel, reduced } = useMotion();
const isDark = ref(false);
const downloadDialog = ref<HTMLDialogElement>();
const config = useRuntimeConfig();
const route = useRoute();
useHead(() => ({ htmlAttrs: { lang: locale.value } }));
const otherLocale = computed(() => locale.value === "en" ? "km" : "en");
let themeQuery: MediaQueryList | undefined;
function syncTheme() {
  isDark.value =
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && !!themeQuery?.matches);
}
onMounted(() => {
  // Restore a saved choice on the home entry point; explicit /km links win.
  try {
    if (route.path === "/" && localStorage.getItem("romlerk-language") === "km")
      void navigateTo(localePath(route.fullPath, "km"), { replace: true });
  } catch {}
  themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  syncTheme();
  themeQuery.addEventListener("change", syncTheme);
});
onBeforeUnmount(() => themeQuery?.removeEventListener("change", syncTheme));
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
function toggleTheme() {
  const theme = isDark.value ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("romlerk-theme", theme);
  } catch {}
  syncTheme();
}
function openDownloads() {
  menuOpen.value = false;
  const dialog = downloadDialog.value!;
  const wasOpen = dialog.open;
  dialog.showModal();
  if (!wasOpen) {
    dialog.style.opacity = "0";
    dialog.style.transform = reduced.value ? "none" : "translateY(10px)";
    dialog.style.setProperty("--backdrop-opacity", "0");
  }
  animate(dialog, {
    opacity: 1,
    y: 0,
    "--backdrop-opacity": 1,
    clearProps: "opacity,transform",
  });
}
function closeDownloads() {
  const dialog = downloadDialog.value!;
  animate(dialog, {
    opacity: 0,
    y: reduced.value ? 0 : 6,
    "--backdrop-opacity": 0,
    duration: reduced.value ? 0 : 0.18,
    onComplete: () => {
      dialog.close();
      dialog.style.removeProperty("opacity");
      dialog.style.removeProperty("transform");
    },
  });
}
provide("openDownloads", openDownloads);
</script>

<template>
  <a class="skip-link" href="#main">{{ t("Skip to content") }}</a>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink :to="localePath('/')" class="brand" :aria-label="t('Romlerk home')"
        ><span class="brand-mark"
          ><img
            src="/branding/romlerk-logo.png"
            alt=""
            width="48"
            height="48" /></span
        ><span lang="en">Romlerk</span><span class="brand-khmer" lang="km">រំលឹក</span></NuxtLink
      >
      <nav class="desktop-nav" :aria-label="t('Main navigation')">
        <NuxtLink :to="localePath('/#how-it-works')">{{ t("How it works") }}</NuxtLink>
        <NuxtLink :to="localePath('/#made-for-you')">{{ t("Made for you") }}</NuxtLink>
        <NuxtLink :to="localePath('/#questions')">{{ t("Questions") }}</NuxtLink>
      </nav>
      <div class="header-actions">
        <NuxtLink
          class="language-switch"
          :to="localePath(route.fullPath, otherLocale)"
          :lang="otherLocale"
          :hreflang="otherLocale"
          :aria-label="locale === 'en' ? 'ប្តូរទៅភាសាខ្មែរ' : 'Switch to English'"
          @click="rememberLocale(otherLocale)"
        >{{ locale === 'en' ? 'ខ្មែរ' : 'EN' }}</NuxtLink>
        <button
          class="icon-button theme-toggle"
          :aria-label="
            t(isDark ? 'Switch to light theme' : 'Switch to dark theme')
          "
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="19" /><Moon v-else :size="19" />
        </button>
        <button
          class="button button-small header-download"
          @click="openDownloads"
        >
          {{ t("Get Romlerk") }}<ArrowUpRight :size="16" />
        </button>
        <button
          class="icon-button mobile-menu-button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="t(menuOpen ? 'Close navigation' : 'Open navigation')"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="22" /><Menu v-else :size="22" />
        </button>
      </div>
    </div>
    <Transition
      :css="false"
      @enter="enter"
      @leave="leave"
      @enter-cancelled="cancel"
      @leave-cancelled="cancel"
    >
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="mobile-nav container"
        :aria-label="t('Mobile navigation')"
      >
        <NuxtLink :to="localePath('/#how-it-works')">{{ t("How it works") }}</NuxtLink
        ><NuxtLink :to="localePath('/#made-for-you')">{{ t("Made for you") }}</NuxtLink
        ><NuxtLink :to="localePath('/#questions')">{{ t("Questions") }}</NuxtLink
        ><button class="button" @click="openDownloads">
          {{ t("Get Romlerk") }}<ArrowUpRight :size="16" />
        </button>
      </nav>
    </Transition>
  </header>
  <main id="main"><NuxtPage /></main>
  <footer class="site-footer container">
    <div>
      <NuxtLink class="brand footer-brand" :to="localePath('/')"
        ><span class="brand-mark"
          ><img
            src="/branding/romlerk-logo.png"
            alt=""
            width="48"
            height="48" /></span
        ><span lang="en">Romlerk</span></NuxtLink
      >
      <p>{{ t("A little space for what matters.") }}</p>
    </div>
    <nav :aria-label="t('Footer navigation')">
      <NuxtLink :to="localePath('/privacy')">{{ t("Privacy") }}</NuxtLink
      ><NuxtLink :to="localePath('/help')">{{ t("Help & support") }}</NuxtLink
      ><button class="text-button" @click="openDownloads">
        {{ t("Get the app") }}<ArrowUpRight :size="15" />
      </button>
    </nav>
    <span class="copyright">© 2026 Romlerk</span>
  </footer>
  <dialog
    ref="downloadDialog"
    class="download-dialog"
    aria-labelledby="download-title"
    @cancel.prevent="closeDownloads"
    @click="$event.target === downloadDialog && closeDownloads()"
  >
    <div class="dialog-top">
      <span class="brand-mark"
        ><img
          src="/branding/romlerk-logo.png"
          alt=""
          width="64"
          height="64" /></span
      ><button
        class="icon-button"
        :aria-label="t('Close downloads')"
        @click="closeDownloads"
      >
        <X :size="22" />
      </button>
    </div>
    <p class="eyebrow">{{ t("Take a little weight off") }}</p>
    <h2 id="download-title">{{ t("Romlerk, on your phone.") }}</h2>
    <p v-if="config.public.appStoreUrl || config.public.playStoreUrl">
      {{ t("Choose your platform below. More download options will appear as they become available.") }}
    </p>
    <p v-else>
      {{ t("We’re getting Romlerk ready for iOS and Android. Public downloads are coming soon.") }}
    </p>
    <div class="download-platforms">
      <a
        v-if="config.public.appStoreUrl"
        :href="config.public.appStoreUrl"
        class="button"
        >{{ t("Download for iOS") }}<ArrowUpRight :size="16"
      /></a>
      <div v-else class="platform-status">
        <span>iPhone</span><span>{{ t("Coming soon") }}</span>
      </div>
      <a
        v-if="config.public.playStoreUrl"
        :href="config.public.playStoreUrl"
        class="button"
        >{{ t("Download for Android") }}<ArrowUpRight :size="16"
      /></a>
      <div v-else class="platform-status">
        <span>Android</span><span>{{ t("Coming soon") }}</span>
      </div>
    </div>
    <a
      v-if="config.public.betaUrl"
      :href="config.public.betaUrl"
      class="button button-outline"
      >{{ t("Join the beta") }}<ArrowUpRight :size="16"
    /></a>
    <p class="small-copy">
      {{ t("In the meantime,") }}
      <NuxtLink :to="localePath('/#how-it-works')" @click="closeDownloads"
        >{{ t("try the capture demo") }}</NuxtLink
      >.
    </p>
  </dialog>
</template>
