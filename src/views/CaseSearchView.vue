<template>
  <div class="page">
    <SearchForm v-model="params" @search="onSearch" />
    <CaseList :items="cases" :loading="loading" />
    <p v-if="error" class="helper-text" style="color: #dc2626; margin-top: 12px;">{{ error }}</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCasesStore } from '../stores/cases';
import SearchForm from '../components/SearchForm.vue';
import CaseList from '../components/CaseList.vue';
import { computed } from 'vue';

const casesStore = useCasesStore();
const { cases, loading, error, searchParams } = storeToRefs(casesStore);
const params = computed({
  get: () => searchParams.value,
  set: (value) => casesStore.setSearchParams(value)
});

const onSearch = () => {
  casesStore.search();
};
</script>
