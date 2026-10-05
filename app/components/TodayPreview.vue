<script setup lang="ts">
import {
  Check,
  ChevronRight,
  Coffee,
  Inbox,
  Plus,
  Search,
  Settings,
  Sun,
  CalendarDays,
  FileText,
} from "@lucide/vue";
const { t } = useLocale();
defineProps<{ embedded?: boolean }>();
const { animate, reduced } = useMotion();
const progressRing = ref<HTMLElement>();
const tasks = ref([
  {
    id: 1,
    title: "Pick up a few groceries",
    time: "10:00 AM",
    tag: "Personal",
    done: false,
  },
  { id: 2, title: "Call Mom", time: "4:00 PM", tag: "", done: false },
  {
    id: 3,
    title: "Make time for a little reading",
    time: "7:00 PM",
    tag: "For me",
    done: false,
  },
]);
const completed = computed(
  () => tasks.value.filter((task) => task.done).length,
);
const remaining = computed(() => tasks.value.length - completed.value);
const planned = ref(false);
const showFocus = ref(false);
const focusTask = computed(() => tasks.value.find(task => !task.done));
const groups = computed(() => [
  { label: "Today", tasks: tasks.value.filter(task => !task.done) },
  { label: "Done today", tasks: tasks.value.filter(task => task.done) },
].filter(group => group.tasks.length));
watch(completed, (count) => {
  if (progressRing.value)
    animate(progressRing.value, {
      "--progress": `${(count / tasks.value.length) * 100}%`,
      duration: reduced.value ? 0 : 0.45,
    });
});
</script>

<template>
  <div class="preview-wrap">
    <div
      class="phone-preview"
      :aria-label="t('Interactive Today preview with example tasks')"
    >
      <div class="phone-status" aria-hidden="true">
        <span>9:41</span>
        <div class="camera-pill" />
        <span class="status-signal">▰</span>
      </div>
      <div class="phone-content">
        <div class="phone-date">
          <span>{{ t("MONDAY, OCTOBER 5") }}</span
          ><Settings :size="17" aria-hidden="true" />
        </div>
        <div class="phone-heading">
          <div>
            <h2>{{ t("Today") }}</h2>
            <p>
              {{
                remaining
                  ? t("{count} little things ahead", { count: remaining })
                  : t("A little room to breathe")
              }}
            </p>
          </div>
          <div class="progress-circle" ref="progressRing">
            <span
              >{{ completed }}<small>/ {{ tasks.length }}</small></span
            >
          </div>
        </div>
        <div class="phone-planning">
          <button class="phone-plan" :aria-pressed="planned" @click="planned = !planned">
            <CalendarDays :size="16" />{{ planned ? t('Plan: {done} / {total}', { done: completed, total: tasks.length }) : t('Plan my day') }}
          </button>
          <button class="phone-focus" :aria-pressed="showFocus" @click="showFocus = !showFocus">{{ t('What should I do now?') }}<ChevronRight :size="14" /></button>
          <p v-if="showFocus" class="focus-answer" aria-live="polite">{{ focusTask ? t('Start with {task}', { task: t(focusTask.title) }) : t('A little room to breathe') }}</p>
        </div>
        <div v-for="group in groups" :key="group.label" class="phone-group">
        <div class="phone-section-label">
          <Sun :size="15" /><span>{{ t(group.label) }}</span><span>{{ group.tasks.length }}</span>
        </div>
        <TransitionGroup name="task-list" tag="div" class="phone-task-group">
          <div
            v-for="task in group.tasks"
            :key="task.id"
            class="phone-task"
            :class="{ completed: task.done, focused: showFocus && focusTask?.id === task.id }"
          >
            <button
              class="task-check"
              :class="{ checked: task.done }"
              :aria-label="t(task.done ? 'Reopen {task}' : 'Complete {task}', { task: t(task.title) })"
              :aria-pressed="task.done"
              @click="task.done = !task.done"
            >
              <Check v-if="task.done" :size="13" />
            </button>
            <div>
              <span class="task-title">{{ t(task.title) }}</span
              ><span class="task-meta"
                >{{ t(task.time)
                }}<span v-if="task.tag" class="task-tag">{{
                  t(task.tag)
                }}</span></span
              >
            </div>
            <ChevronRight :size="14" aria-hidden="true" />
          </div>
        </TransitionGroup>
        </div>
      </div>
      <div class="phone-controls">
        <a class="phone-capture" href="#how-it-works"
          ><span><Plus :size="17" /></span>{{ t("What needs doing?") }}</a
        >
        <div class="phone-tabs" aria-hidden="true">
          <span class="selected"><Sun :size="17" />{{ t("Today") }}</span
          ><span><CalendarDays :size="19" /></span
          ><span><Inbox :size="19" /></span
          ><span><FileText :size="19" /></span
          ><span><Search :size="19" /></span>
        </div>
        <div class="home-indicator" />
      </div>
    </div>
    <div v-if="!embedded" class="preview-caption">
      <Coffee :size="15" /><span>{{ t("A simplified, interactive preview. Try planning your day.") }}</span>
    </div>
  </div>
</template>
