export default defineNuxtConfig({
  compatibilityDate: "2026-10-02",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      appStoreUrl: "",
      playStoreUrl: "",
      betaUrl: "",
      supportEmail: "",
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Romlerk | Your day, a little lighter",
      meta: [
        {
          name: "description",
          content:
            "Turn everyday thoughts into tasks and reminders. Romlerk is a private, offline mobile task app with English and Khmer capture. No account required.",
        },
        { name: "theme-color", content: "#FAF7F1" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Romlerk" },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "64x64",
          href: "/favicon.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "preload",
          href: "/fonts/Merriweather-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
      script: [
        {
          innerHTML:
            "try{const t=localStorage.getItem('romlerk-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}",
        },
      ],
    },
  },
});
