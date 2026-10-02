<script setup lang="ts">
import { ArrowUpRight, Check, Menu, Moon, Sun, X } from "@lucide/vue";
const menuOpen = ref(false);
const { animate, enter, leave, cancel, reduced } = useMotion();
const isDark = ref(false);
const downloadDialog = ref<HTMLDialogElement>();
const config = useRuntimeConfig();
const route = useRoute();
let themeQuery: MediaQueryList | undefined;
function syncTheme() {
  isDark.value =
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && !!themeQuery?.matches);
}
onMounted(() => {
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
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" aria-label="Romlerk home"
        ><span class="brand-mark"><Check :size="21" :stroke-width="2.4" /></span
        >Romlerk<span class="brand-khmer" lang="km">រំលឹក</span></NuxtLink
      >
      <nav class="desktop-nav" aria-label="Main navigation">
        <NuxtLink to="/#how-it-works">How it works</NuxtLink>
        <NuxtLink to="/#made-for-you">Made for you</NuxtLink>
        <NuxtLink to="/#questions">Questions</NuxtLink>
      </nav>
      <div class="header-actions">
        <button
          class="icon-button theme-toggle"
          :aria-label="
            isDark ? 'Switch to light theme' : 'Switch to dark theme'
          "
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="19" /><Moon v-else :size="19" />
        </button>
        <button
          class="button button-small header-download"
          @click="openDownloads"
        >
          Get Romlerk<ArrowUpRight :size="16" />
        </button>
        <button
          class="icon-button mobile-menu-button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
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
        aria-label="Mobile navigation"
      >
        <NuxtLink to="/#how-it-works">How it works</NuxtLink
        ><NuxtLink to="/#made-for-you">Made for you</NuxtLink
        ><NuxtLink to="/#questions">Questions</NuxtLink
        ><button class="button" @click="openDownloads">
          Get Romlerk<ArrowUpRight :size="16" />
        </button>
      </nav>
    </Transition>
  </header>
  <main id="main"><NuxtPage /></main>
  <footer class="site-footer container">
    <div>
      <NuxtLink class="brand footer-brand" to="/"
        ><span class="brand-mark"><Check :size="18" /></span>Romlerk</NuxtLink
      >
      <p>A little space for what matters.</p>
    </div>
    <nav aria-label="Footer navigation">
      <NuxtLink to="/privacy">Privacy</NuxtLink
      ><NuxtLink to="/help">Help & support</NuxtLink
      ><button class="text-button" @click="openDownloads">
        Get the app<ArrowUpRight :size="15" />
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
      <span class="brand-mark"><Check :size="24" /></span
      ><button
        class="icon-button"
        aria-label="Close downloads"
        @click="closeDownloads"
      >
        <X :size="22" />
      </button>
    </div>
    <p class="eyebrow">Take a little weight off</p>
    <h2 id="download-title">Romlerk, on your phone.</h2>
    <p v-if="config.public.appStoreUrl || config.public.playStoreUrl">
      Choose your platform below. More download options will appear as they
      become available.
    </p>
    <p v-else>
      We’re getting Romlerk ready for iOS and Android. Public downloads are
      coming soon.
    </p>
    <div class="download-platforms">
      <a
        v-if="config.public.appStoreUrl"
        :href="config.public.appStoreUrl"
        class="button"
        >Download for iOS<ArrowUpRight :size="16"
      /></a>
      <div v-else class="platform-status">
        <span>iPhone</span><span>Coming soon</span>
      </div>
      <a
        v-if="config.public.playStoreUrl"
        :href="config.public.playStoreUrl"
        class="button"
        >Download for Android<ArrowUpRight :size="16"
      /></a>
      <div v-else class="platform-status">
        <span>Android</span><span>Coming soon</span>
      </div>
    </div>
    <a
      v-if="config.public.betaUrl"
      :href="config.public.betaUrl"
      class="button button-outline"
      >Join the beta<ArrowUpRight :size="16"
    /></a>
    <p class="small-copy">
      In the meantime,
      <NuxtLink to="/#how-it-works" @click="closeDownloads"
        >try the capture demo</NuxtLink
      >.
    </p>
  </dialog>
</template>
