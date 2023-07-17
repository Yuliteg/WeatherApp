<template>
  <main>
    <div class="container flex">
      <h2 class="container__title">Select a city and view the weather forecast.</h2>
      <div class="search-container">
        <input class="search-container__input" type="text" placeholder="Search...">
        <button class="search-container__button flex">
          <CIcon :icon="cilSearch" size="lg" />
        </button>
      </div>
    </div>
    <div class="weather-card__flex">
      <WeatherCard :searchIcon="cilSearch" :closeIcon="cilXCircle" />
      <WeatherCard :searchIcon="cilSearch" :closeIcon="cilXCircle" />
      <WeatherCard :searchIcon="cilSearch" :closeIcon="cilXCircle" />
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from '../components/WeatherCard.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt, cilSearch, cilXCircle } from '@coreui/icons';

library.add(faSearch, faTimesCircle);

export default {
  components: {
    WeatherCard,
    CIcon,
  },
  setup() {
    return {
      cilList,
      cilShieldAlt,
      cilSearch,
      cilXCircle,
    };
  },
};
</script>

<style>
.container {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin-top: 5%;
  flex-direction: column;
}

.search-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.search-container__input {
  height: 38px;
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.search-container__button {
  height: 38px;
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 0 5px 5px 0;
}

.search-container__button svg {
  width: 1.3em;
  height: 1.3em;
}

.weather-card__flex {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>