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
  padding-left: 10%;
  padding-right: 10%;
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

@media (max-width: 600px) {
  .app-container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
