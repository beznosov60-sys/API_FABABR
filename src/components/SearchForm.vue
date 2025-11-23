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
        <div class="input-group">
          <label>Название организации или ФИО</label>
          <input v-model="local.query" placeholder="ООО Пример" />
        </div>
        <div class="input-group">
          <label>Дата с</label>
          <input v-model="local.startDate" type="date" />
        </div>
        <div class="input-group">
          <label>Дата по</label>
          <input v-model="local.endDate" type="date" />
        </div>
        <div class="input-group">
          <label>Тип дела</label>
          <select v-model="local.type">
            <option value="">Любой</option>
            <option value="bankruptcy">Банкротство</option>
            <option value="administrative">Административное</option>
            <option value="civil">Гражданское</option>
          </select>
        </div>
        <div class="input-group">
          <label>Суд</label>
          <input v-model="local.court" placeholder="АС города Москвы" />
        </div>
      </div>
      <div class="button-row">
        <button class="btn btn-primary" type="submit">Найти</button>
        <button class="btn btn-ghost" type="button" @click="reset">Сбросить</button>
      </div>
      <p class="helper-text">
        Можно искать по номеру дела, ИНН, названию стороны, датам и типу дела. Ключ API подставится автоматически.
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
    inn: '',
    query: '',
    startDate: '',
    endDate: '',
    type: '',
    court: ''
  };
  emit('update:modelValue', cleared);
  Object.assign(local, cleared);
};
</script>
