<template>
  <div class="page">
    <RouterLink to="/" class="link">← Назад к поиску</RouterLink>
    <CaseCard :caseData="caseData" @download="download" />
    <EventTimeline :items="events" style="margin-top: 16px;" />
    <p v-if="error" class="helper-text" style="color: #dc2626;">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCasesStore } from '../stores/cases';
import CaseCard from '../components/CaseCard.vue';
import EventTimeline from '../components/EventTimeline.vue';

const route = useRoute();
const store = useCasesStore();
const { selectedCase: caseData, events, error } = storeToRefs(store);

const load = () => {
  store.loadCase(route.params.id);
};

const download = (url) => store.downloadPdf(url);

onMounted(load);
watch(
  () => route.params.id,
  () => load()
);
</script>
