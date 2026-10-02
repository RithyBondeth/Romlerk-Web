<script setup lang="ts">
import { ArrowLeft, ShieldCheck } from "@lucide/vue";
useSeoMeta({
  title: "Privacy | Romlerk",
  description:
    "How Romlerk handles task capture, local data, voice, phone backup, and this website.",
});
</script>
<template>
  <article class="legal-page container">
    <NuxtLink class="inline-link" to="/"
      ><ArrowLeft :size="16" />Back to Romlerk</NuxtLink
    >
    <p class="eyebrow"><ShieldCheck :size="17" />PRIVACY AT ROMLERK</p>
    <h1>Your thoughts deserve<br />a personal space.</h1>
    <p class="legal-lead">
      Here’s how the current Romlerk app and this website handle your
      information.
    </p>
    <div class="prose">
      <h2>Tasks and notes</h2>
      <p>
        Romlerk stores tasks, notes, tags, reminders, and preferences in a local
        database on your device. The app does not use a Romlerk account,
        first-party task server, or cloud inference service.
      </p>
      <h2>Task capture and AI</h2>
      <p>
        Rules-based capture runs inside the app. When available, enhanced
        capture uses an on-device model through Apple Foundation Models or
        Android’s ML Kit GenAI adapter. If the model cannot run, the app falls
        back to its local parser. The operating system may download model or
        configuration data.
      </p>
      <h2>Voice capture</h2>
      <p>
        Voice is offered only when the device supports on-device speech
        recognition. The transcript stays editable before you create a task.
        Availability depends on your phone, operating system, language, and
        permissions.
      </p>
      <h2>Phone backup and exports</h2>
      <p>
        Phone backup is enabled by default. You can turn it off in Settings; the
        storage change takes effect the next time the app starts. Previous
        backups are not rewritten. Exports use the system share sheet, and the
        destination you choose may upload the exported file under that service’s
        own policies.
      </p>
      <h2>Notifications and widgets</h2>
      <p>
        You can hide task text in notifications. Widgets also hide titles when
        notification previews are hidden or app lock is enabled. Notifications
        are scheduled through your operating system.
      </p>
      <h2>Local diagnostics</h2>
      <p>
        The app records local parse outcomes, capability tiers, coarse latency
        buckets, and error codes. The audit schema contains no field for raw
        task input or task titles. These records stay in the local database.
      </p>
      <h2>This website</h2>
      <p>
        This website has no analytics trackers, advertising integrations, or
        signup collection. Fonts and illustrations are served with the site.
        Your theme preference is stored in your browser. The hosting provider
        may process standard request metadata to serve the site. The interactive
        examples stay in page memory and reset when you reload.
      </p>
      <h2>Current release status</h2>
      <p>
        Romlerk is in development. Public app-store downloads are not yet
        configured on this site. This explanation describes the implementation
        reviewed for the landing page; it should be reviewed again before a
        public release.
      </p>
    </div>
  </article>
</template>
