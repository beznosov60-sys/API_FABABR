<template>
  <div class="card">
    <h2 class="section-title">Поиск судебных дел</h2>
    <form @submit.prevent="submit">
      <div class="form-grid">
        <div class="input-group">
          <label>Номер дела</label>
          <input v-model="local.caseNumber" placeholder="А40-123456/2025" />
        </div>
        <div class="input-group">
          <label>ИНН стороны</label>
          <input v-model="local.inn" placeholder="7701234567" />
        </div>
      </div>
      <div class="button-row">
        <button class="btn btn-primary" type="submit">Найти</button>
        <button class="btn btn-ghost" type="button" @click="reset">Сбросить</button>
      </div>
      <p class="helper-text">
        Введите номер дела или ИНН. Остальные фильтры удалены, чтобы отправлять запрос напрямую в КАД без лишних
        параметров.
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const local = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(local, value);
  }
);

const submit = () => {
  emit('update:modelValue', { ...local });
  emit('search');
};

const reset = () => {
  const cleared = {
    caseNumber: '',
    inn: ''
  };
  emit('update:modelValue', cleared);
  Object.assign(local, cleared);
};
</script>
