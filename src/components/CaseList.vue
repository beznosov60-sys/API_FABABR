<template>
  <div class="card">
    <h2 class="section-title">Результаты поиска</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="!items.length">Нет найденных дел. Уточните фильтры.</div>
    <ul v-else class="list">
      <li v-for="item in items" :key="item.id || item.CaseId" class="list-item">
        <div class="case-heading">
          <div>
            <div class="badge" :class="item.status === 'В производстве' ? 'success' : 'warning'">
              <span class="status-dot" :style="{ background: item.status === 'В производстве' ? '#22c55e' : '#f59e0b' }"></span>
              {{ item.status || item.CaseStage || 'Неизвестно' }}
            </div>
            <h3 style="margin: 6px 0 4px">{{ item.caseNumber || item.CaseNumber || 'Без номера' }}</h3>
            <p style="margin: 0; color: var(--muted);">{{ item.court || item.CourtName || 'Суд не указан' }}</p>
          </div>
          <RouterLink class="btn btn-primary" :to="`/cases/${item.id || item.CaseId || item.caseNumber}`">
            Открыть карточку
          </RouterLink>
        </div>
        <div style="margin-top: 12px; color: var(--muted);">
          {{ item.parties?.map((p) => p.name).join(', ') || item.Sides || 'Стороны не указаны' }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: Boolean
});
</script>
