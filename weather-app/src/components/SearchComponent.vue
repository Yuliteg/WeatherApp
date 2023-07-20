<template>
  <p v-if="cityNotFound" class="city-not-found-message">City not found</p>
  <div class="search-container">
    <input ref="searchInput" class="search-container__input" v-model="searchText" :placeholder="placeholder"
      @input="debouncedFetchCityOptions" @keydown.enter="handleEnterKey" autocomplete="off" />
    <ul v-if="autocompleteOptions.length" class="autocomplete-options"
      :class="{ 'single-option': autocompleteOptions.length === 1 }">
      <li v-for="(option, index) in autocompleteOptions" :key="index" :class="{ selected: index === selectedOptionIndex }"
        @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
import { cilSearch } from '@coreui/icons';
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';
import { updateSelectedCity } from "@/helpers/weatherHelpers"
import { API_KEY_WEATHER } from "../env"
import { debounce } from 'lodash';

export default {
  components: {
  },
  props: {
    selectedCity: {
      type: Object,
      required: true,
    },
    fetchCurrentLocationWeather: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchText = ref('');
    const placeholder = 'Search for a city';
    const autocompleteOptions = reactive([]);

    const searchInput = ref(null);
    const selectedOptionIndex = ref(-1);

    const cityNotFound = ref(false);

    const handleClickOutside = (event) => {
      if (!searchInput.value || !searchInput.value.contains(event.target)) {
        searchText.value = '';
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });

    const fetchCityOptions = async () => {
      if (searchText.value !== '') {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchText.value}&limit=6&appid=${API_KEY_WEATHER}`
          );
          const options = response.data.map((city) => city.name);
          autocompleteOptions.splice(0, autocompleteOptions.length, ...options);
          cityNotFound.value = autocompleteOptions.length === 0;
        } catch (error) {
          console.error('Error fetching city options:', error);
          cityNotFound.value = true;
        }
      } else {
        autocompleteOptions.splice(0, autocompleteOptions.length);
        cityNotFound.value = false;
      }
    };

    const debouncedFetchCityOptions = debounce(fetchCityOptions, 500);

    const handleEnterKey = () => {
      if (searchText.value.trim() !== '') {
        selectOption(searchText.value);
      }
    };

    const selectOption = async (option) => {
      emit("loading", true);
      if (option) {
        searchText.value = option;
        autocompleteOptions.splice(0, autocompleteOptions.length);
        selectedOptionIndex.value = -1;
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${option}&appid=${API_KEY_WEATHER}`
          );
          updateSelectedCity(weatherResponse.data, props.selectedCity);
          cityNotFound.value = false;
        } catch (error) {
          console.error('Error fetching city data:', error);

          cityNotFound.value = error.response?.status === 404;
        } finally {
          emit("loading", false);
        }
      }
    };

    watch(() => props, () => {
      searchInput.value = props.$refs.searchInput;
    });

    return {
      searchText,
      placeholder,
      debouncedFetchCityOptions,
      autocompleteOptions,
      selectedOptionIndex,
      selectOption,
      cilSearch,
      updateSelectedCity,
      searchInput,
      handleEnterKey,
      cityNotFound
    };
  },
};
</script>

<style>
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

.city-not-found-message {
  color: red;
}

@media (max-width: 600px) {
  .search-container__input {
    width: 320px;
  }
}
</style>