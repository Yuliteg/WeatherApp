<template>
  <main>
    <div class="container flex">
      <p class="container__title">Select a city and view the weather forecast.</p>
      <Search :selectedCity="selectedCity"
        :fetchCurrentLocationWeather="fetchCurrentLocationWeather" />
      <WeatherCard :cityData="selectedCity" />
    </div>

    <div class="weather-block__container">
      <p class="weather-block__header">Your Weather Block</p>
      <div class="weather-block__flex">

      </div>
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from '../components/WeatherCard.vue';
import Search from '../components/SearchComponent.vue';
import { cilList, cilShieldAlt, cilSearch } from '@coreui/icons';
import { reactive, onMounted } from 'vue';
import { fetchCurrentLocationWeather } from '@/helpers/fetch';

library.add(faSearch, faTimesCircle);

export default {
  components: {
    WeatherCard,
    Search,
  },
  setup() {
    const selectedCity = reactive({
      name: '',
      desc: '',
      sunrise: '',
      sunset: '',
      temperature: null,
      windData: [],
    });

    onMounted(() => {
      fetchCurrentLocationWeather(selectedCity);
    });

    return {
      cilList,
      cilShieldAlt,
      cilSearch,
      selectedCity,
      fetchCurrentLocationWeather,
    };
  },
};
</script>

<style>
.container {
  padding-top: 4%;
  flex-direction: column;
}

.container__title {
  padding-left: 10%;
  padding-right: 10%;
  font-size: 27px;
}

.weather-block__header {
  font-size: 27px;
  padding-top: 2rem;
  text-align: center;
}

.weather-block__flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>