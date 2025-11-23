<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="branding">
        <h1>КАД Трекер</h1>
        <p>Платформа для мониторинга судебных процессов</p>
      </div>
      <nav class="nav-links">
        <RouterLink to="/">Поиск дел</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
