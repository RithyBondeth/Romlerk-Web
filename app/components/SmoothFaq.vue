<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
defineProps<{ title: string; answer: string }>();
const details = ref<HTMLDetailsElement>();
const content = ref<HTMLDivElement>();
const expanded = ref(false);
const { animate, reduced } = useMotion();
function toggle(event: Event) {
  event.preventDefault();
  const panel = content.value!;
  const currentHeight = panel.getBoundingClientRect().height;
  expanded.value = !expanded.value;
  details.value!.open = true;
  panel.inert = !expanded.value;
  panel.style.height = `${currentHeight}px`;
  animate(panel, {
    height: expanded.value ? panel.scrollHeight : 0,
    opacity: expanded.value ? 1 : 0,
    duration: reduced.value ? 0 : 0.32,
    onComplete() {
      details.value!.open = expanded.value;
      panel.style.height = expanded.value ? "auto" : "0px";
    },
  });
}
</script>
<template>
  <details ref="details" :class="{ 'is-expanded': expanded }">
    <summary :aria-expanded="expanded" @click="toggle">
      {{ title }}<ChevronDown :size="18" />
    </summary>
    <div ref="content" class="faq-answer">
      <p>{{ answer }}</p>
    </div>
  </details>
</template>
