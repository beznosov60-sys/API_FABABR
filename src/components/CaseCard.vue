<template>
  <div class="card" v-if="caseData">
    <div class="case-heading" style="align-items: flex-start;">
      <div>
        <p class="badge success" style="margin: 0;">{{ caseData.status || 'Статус неизвестен' }}</p>
        <h2 class="section-title" style="margin-top: 8px;">{{ caseData.caseNumber }}</h2>
        <p style="margin: 0; color: var(--muted);">{{ caseData.court }}</p>
      </div>
      <div style="text-align: right; color: var(--muted);">
        <div>Судья: <strong>{{ caseData.judge || '—' }}</strong></div>
        <div>Тип: {{ caseData.type || '—' }}</div>
      </div>
    </div>

    <section style="margin-top: 16px;">
      <h3 class="section-title">Стороны</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Роль</th>
            <th>Наименование</th>
            <th>ИНН</th>
            <th>ОГРН</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="party in caseData.parties || []" :key="party.name + party.role">
            <td>{{ party.role }}</td>
            <td>{{ party.name }}</td>
            <td>{{ party.inn }}</td>
            <td>{{ party.ogrn }}</td>
            <td>{{ party.address }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section style="margin-top: 16px;">
      <h3 class="section-title">Календарь заседаний</h3>
      <div v-if="caseData.schedule?.length" class="list">
        <div v-for="slot in caseData.schedule" :key="slot.date + slot.time" class="list-item">
          <strong>{{ slot.date }} {{ slot.time }}</strong>
          <div style="color: var(--muted);">{{ slot.type }} · {{ slot.place }}</div>
        </div>
      </div>
      <p v-else class="helper-text">Нет запланированных заседаний.</p>
    </section>

    <section style="margin-top: 16px;">
      <h3 class="section-title">Документы</h3>
      <div v-if="caseData.documents?.length" class="list">
        <div v-for="doc in caseData.documents" :key="doc.id" class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div><strong>{{ doc.title }}</strong></div>
            <div style="color: var(--muted);">{{ doc.date }}</div>
          </div>
          <button class="btn btn-primary" type="button" @click="$emit('download', doc.url)">Скачать PDF</button>
        </div>
      </div>
      <p v-else class="helper-text">Документы пока не прикреплены.</p>
    </section>
  </div>
</template>

<script setup>
defineProps({
  caseData: {
    type: Object,
    required: false,
    default: null
  }
});

defineEmits(['download']);
</script>
