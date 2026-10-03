<script setup lang="ts">
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from "@lucide/vue";
const { t, locale } = useLocale();
const { enter, leave, cancel } = useMotion();
const language = ref<"en" | "km">(locale.value);
const selected = ref(0);
const reviewed = ref(false);
const saved = ref(false);
const examples = {
  en: [
    {
      label: "A reminder",
      text: "Call Mom tomorrow at 9am",
      title: "Call Mom",
      date: "Tomorrow at 9:00 AM",
      tag: "One thing to remember",
    },
    {
      label: "A weekly habit",
      text: "Water the plants every Sunday at 8am",
      title: "Water the plants",
      date: "Sunday at 8:00 AM",
      tag: "Repeats every Sunday",
    },
    {
      label: "A little me time",
      text: "Read for 20 minutes tonight",
      title: "Read",
      date: "Tonight at 7:00 PM",
      tag: "20 minutes",
    },
  ],
  km: [
    {
      label: "ការរំលឹក",
      text: "ហៅម៉ាក់ស្អែកម៉ោង៩ព្រឹក",
      title: "ហៅម៉ាក់",
      date: "ស្អែក ម៉ោង ៩:០០ ព្រឹក",
      tag: "ការរំលឹក",
    },
    {
      label: "ទម្លាប់ប្រចាំសប្តាហ៍",
      text: "ស្រោចទឹករុក្ខជាតិរៀងរាល់ថ្ងៃអាទិត្យម៉ោង៨ព្រឹក",
      title: "ស្រោចទឹករុក្ខជាតិ",
      date: "ថ្ងៃអាទិត្យ ម៉ោង ៨:០០ ព្រឹក",
      tag: "រៀងរាល់ថ្ងៃអាទិត្យ",
    },
    {
      label: "ពេលវេលាផ្ទាល់ខ្លួន",
      text: "អានសៀវភៅ២០នាទីយប់នេះ",
      title: "អានសៀវភៅ",
      date: "យប់នេះ ម៉ោង ៧:០០",
      tag: "២០ នាទី",
    },
  ],
};
const example = computed(() => examples[language.value][selected.value]!);
function reset() {
  reviewed.value = false;
  saved.value = false;
}
watch([language, selected], reset);
watch(locale, (value) => { language.value = value; });
</script>

<template>
  <div class="capture-demo">
    <div class="demo-toolbar">
      <span><Sparkles :size="16" />{{ t("Try a little thought") }}</span>
      <div class="language-toggle" role="group" :aria-label="t('Demo language')">
        <button
          :aria-pressed="language === 'en'"
          :class="{ active: language === 'en' }"
          @click="language = 'en'"
         lang="en">
          English</button
        ><button
          lang="km"
          :aria-pressed="language === 'km'"
          :class="{ active: language === 'km' }"
          @click="language = 'km'"
        >
          ខ្មែរ
        </button>
      </div>
    </div>
    <div class="demo-inner">
      <div class="example-options" role="group" :aria-label="t('Capture examples')">
        <button
          v-for="(item, index) in examples[language]"
          :key="index"
          :class="{ active: selected === index }"
          :aria-pressed="selected === index"
          :lang="language"
          @click="selected = index"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="demo-input" :lang="language">
        <Transition name="copy" mode="out-in"
          ><span :key="`${language}-${selected}`"
            ><span class="input-quote">“</span>{{ example.text
            }}<span class="input-quote">”</span></span
          ></Transition
        >
      </div>
      <div class="demo-action">
        <span>{{ t("Just say it your way.") }}</span
        ><button
          class="button button-small"
          :disabled="reviewed"
          @click="reviewed = true"
        >
          {{ t(reviewed ? "Ready to review" : "See the task")
          }}<Check v-if="reviewed" :size="15" /><ArrowRight v-else :size="15" />
        </button>
      </div>
      <div class="demo-result" aria-live="polite">
        <Transition
          :css="false"
          mode="out-in"
          @enter="enter"
          @leave="leave"
          @enter-cancelled="cancel"
          @leave-cancelled="cancel"
        >
          <div v-if="reviewed" key="review">
            <div class="draft-header">
              <span class="eyebrow">{{
                t(saved ? "SAVED IN THIS DEMO" : "YOUR TASK, READY TO REVIEW")
              }}</span
              ><Check v-if="saved" :size="19" /><ChevronDown
                v-else
                :size="17"
              />
            </div>
            <h3 :lang="language">{{ example.title }}</h3>
            <p class="draft-date" :lang="language">
              <CalendarDays :size="16" />{{ example.date }}
            </p>
            <span class="draft-tag" :lang="language">{{ example.tag }}</span>
            <div class="draft-footer">
              <button class="text-button" @click="reset">
                <RotateCcw :size="14" />{{ t("Start again") }}</button
              ><button
                class="button button-small"
                :disabled="saved"
                @click="saved = true"
              >
                {{ t(saved ? "Task saved" : "Save example") }}<Check :size="15" />
              </button>
            </div>
          </div>
          <div v-else key="empty" class="demo-empty">
            <CalendarDays :size="23" />
            <p>{{ t("A thought becomes a task.") }}<br />{{ t("You get the final say.") }}</p>
          </div>
        </Transition>
      </div>
      <p class="demo-disclaimer">
        {{ t("An interactive example. Nothing is sent or saved to the mobile app.") }}
      </p>
    </div>
  </div>
</template>
