<template>
  <div class="card">
    <h3 class="section-title">История событий</h3>
    <div v-if="!items.length" class="helper-text">История событий пока пустая.</div>
    <div v-else class="timeline">
      <div v-for="event in items" :key="event.id" class="timeline-item">
        <div style="font-weight: 700;">{{ event.date }} · {{ event.type }}</div>
        <div style="color: var(--muted); margin-top: 4px;">{{ event.comment }}</div>
        <div style="margin-top: 6px; display: flex; gap: 12px; flex-wrap: wrap;">
          <span class="badge">{{ event.actor || 'Участник не указан' }}</span>
          <span v-if="event.amount" class="badge success">Сумма иска: {{ event.amount }}</span>
        </div>
        <div v-if="event.documents?.length" style="margin-top: 6px; color: var(--muted);">
          Документы: {{ event.documents.join(', ') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>
