<template>
  <main>
    <div class="container flex">
      <p class="container__title">Select a city and view the weather forecast.</p>
      <div class="search-container">
        <input class="search-container__input" v-model="searchText" :placeholder="placeholder" @input="fetchCityOptions"
          @keydown.enter="selectOption" autocomplete="off" />
        <ul v-if="autocompleteOptions.length" class="autocomplete-options"
          :class="{ 'single-option': autocompleteOptions.length === 1 }">
          <li v-for="(option, index) in autocompleteOptions" :key="index"
            :class="{ selected: index === selectedOptionIndex }" @click="selectOption(option)">
            {{ option }}
          </li>
        </ul>
        <button class="search-container__button flex">
          <CIcon :icon="cilSearch" size="lg" />
        </button>
      </div>

      <WeatherCard :cityData="selectedCity" />
    </div>

    <div class="weather-block__container">
      <p class="weather-block__header">Your Weather Block</p>
      <div class="weather-block__flex">
        <!-- <WeatherCard />
        <WeatherCard />
        <WeatherCard /> -->
      </div>
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from '../components/WeatherCard.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilList, cilShieldAlt, cilSearch } from '@coreui/icons';
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { updateSelectedCity } from '@/helpers/weatherHelpers';
import { fetchCurrentLocationWeather } from '@/helpers/fetch';

library.add(faSearch, faTimesCircle);

export default {
  components: {
    WeatherCard,
    CIcon,
  },
  setup() {
    const searchText = ref('');
    const placeholder = 'Search for a city';
    const autocompleteOptions = reactive([]);

    const selectedCity = reactive({
      name: '',
      desc: '',
      sunrise: '',
      sunset: '',
      temperature: null,
      windData: []
    });

    const fetchCityOptions = async () => {
      if (searchText.value !== '') {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchText.value}&limit=6&appid=a33819175e02801b2b4ee9eb562676ad`
          );
          console.log(response);
          const options = response.data.map((city) => city.name);
          autocompleteOptions.splice(0, autocompleteOptions.length, ...options); // Update the reactive object
        } catch (error) {
          console.error('Error fetching city options:', error);
        }
      } else {
        autocompleteOptions.splice(0, autocompleteOptions.length);
      }
    };

    const selectedOptionIndex = ref(-1);

    const selectOption = async (option) => {
      if (option) {
        searchText.value = option;
        autocompleteOptions.splice(0, autocompleteOptions.length); // Clear the autocomplete options
        selectedOptionIndex.value = -1;

        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${option}&appid=a33819175e02801b2b4ee9eb562676ad`
          );

          updateSelectedCity(weatherResponse.data, selectedCity);
        } catch (error) {
          console.error('Error fetching city data:', error);
        }
      }
    };

    onMounted(() => {
      fetchCurrentLocationWeather(selectedCity);
    });

    return {
      cilList,
      cilShieldAlt,
      cilSearch,
      searchText,
      placeholder,
      fetchCityOptions,
      autocompleteOptions,
      selectedOptionIndex,
      selectOption,
      fetchCurrentLocationWeather,
      selectedCity,
      updateSelectedCity,
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

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.search-container__input {
  height: 45px;
  padding: 10px;
  width: 380px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
  z-index: 2;
}

.search-container__input:focus {
  outline-color: #0d8d22a7;
}

.search-container__button {
  height: 45px;
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 0 5px 5px 0;
}

.search-container__button svg {
  width: 1.3em;
  height: 1.3em;
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

.autocomplete-options {
  position: absolute;
  z-index: 1;
  list-style: none;
  margin-top: 0;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  left: 0;
  transform: translateY(65%);
  max-height: 150px;
  overflow-y: auto;
}

.autocomplete-options.single-option {
  transform: translateY(100%);
}

.autocomplete-options li {
  padding: 5px 10px;
  cursor: pointer;
}

.autocomplete-options li.selected {
  background-color: #ccc;
}
</style>