<template>
  <div class="card">
    <h2 class="section-title">Результаты поиска</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error || !items.length" class="empty-state">{{ error || 'Ничего не найдено' }}</div>
    <ul v-else class="list">
      <li v-for="item in items" :key="item.id || item.CaseId" class="list-item case-card">
        <div class="case-header">
          <div class="case-meta">
            <div class="badge" :class="statusClass(item)">
              <span class="status-dot" :style="{ background: statusColor(item) }"></span>
              {{ item.status || item.CaseStage || 'Неизвестно' }}
            </div>
            <h3 class="case-number">{{ item.caseNumber || item.CaseNumber || 'Без номера' }}</h3>
            <p class="case-court">{{ item.court || item.CourtName || 'Суд не указан' }}</p>
          </div>
          <RouterLink class="btn btn-primary open-btn" :to="`/cases/${item.id || item.CaseId || item.caseNumber}`">
            Открыть карточку
          </RouterLink>
        </div>
        <div class="case-parties">
          {{ item.parties?.map((p) => p.name).join(' — ') || item.Sides || 'Стороны не указаны' }}
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
  loading: Boolean,
  error: String
});

const statusClass = (item) => {
  const status = item.status || item.CaseStage;
  return status === 'В производстве' ? 'success' : 'warning';
};

const statusColor = (item) => {
  const status = item.status || item.CaseStage;
  return status === 'В производстве' ? '#22c55e' : '#f59e0b';
};
</script>

<style scoped>
.case-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.case-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.case-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.case-number {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.case-court {
  margin: 0;
  color: var(--muted);
}

.case-parties {
  color: var(--muted);
  line-height: 1.5;
}

.open-btn {
  align-self: flex-start;
  margin-left: auto;
}

.empty-state {
  color: var(--muted);
}
</style>
