<template>
  <header>
    <div class="header__wrapper">
      <div class="header__logo">
        <h2>Weather App</h2>
        <img src="@/assets/weather-app(1).png" alt="Weather Icon" class="header__logo-icon" />
      </div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <router-link to="/" class="header__nav-link">Home</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/favorites" class="header__nav-link">Favorites</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
header {
  height: var(--header-height);
  line-height: 1.5;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

header::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.304);
}

.header__wrapper {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo-icon {
  width: 33px;
  height: 30px;
  margin-left: 0.3rem;
}

.header__nav {
  display: flex;
  align-items: center;
}

.header__nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.header__nav-link {
  margin-left: 1rem;
  font-size: 17px;
}
</style>