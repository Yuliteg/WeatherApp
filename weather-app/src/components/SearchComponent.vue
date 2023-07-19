<template>
  <div class="search-container">
    <input ref="searchInput" class="search-container__input" v-model="searchText" :placeholder="placeholder"
      @input="fetchCityOptions" @keydown.enter="selectOption" autocomplete="off" />
    <ul v-if="autocompleteOptions.length" class="autocomplete-options"
      :class="{ 'single-option': autocompleteOptions.length === 1 }">
      <li v-for="(option, index) in autocompleteOptions" :key="index" :class="{ selected: index === selectedOptionIndex }"
        @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
    <button class="search-container__button flex">
      <CIcon :icon="cilSearch" size="lg" />
    </button>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';
import { updateSelectedCity } from "@/helpers/weatherHelpers"

export default {
  components: {
    CIcon,
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
  setup(props) {
    const searchText = ref('');
    const placeholder = 'Search for a city';
    const autocompleteOptions = reactive([]);

    const searchInput = ref(null);
    const isLoadingFetchSearch = ref(true);

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
      isLoadingFetchSearch.value = true
      if (searchText.value !== '') {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchText.value}&limit=6&appid=a33819175e02801b2b4ee9eb562676ad`
          );
          const options = response.data.map((city) => city.name);
          autocompleteOptions.splice(0, autocompleteOptions.length, ...options); // Update the reactive object
        } catch (error) {
          console.error('Error fetching city options:', error);
        } finally {
          isLoadingFetchSearch.value = false
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
          updateSelectedCity(weatherResponse.data, props.selectedCity);
        } catch (error) {
          console.error('Error fetching city data:', error);
        }
      }
    };
    watch(() => props, () => {
      searchInput.value = props.$refs.searchInput;
    });

    return {
      searchText,
      placeholder,
      fetchCityOptions,
      autocompleteOptions,
      selectedOptionIndex,
      selectOption,
      cilSearch,
      updateSelectedCity,
      searchInput,
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

@media (max-width: 600px) {
  .search-container__input {
    width: 320px;
  }
}
</style>