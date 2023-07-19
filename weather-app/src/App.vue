<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <AppHeader />
    </header>

    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
.app-container {
  background-color: #b9d0e8;
  margin-left: 5%;
  margin-right: 5%;
  max-width: 1300px;
  min-width: 360px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}

@media (max-width: 800px) {
  .app-container {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
