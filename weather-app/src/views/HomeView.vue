<template>
  <main>
    <div class="container flex">
      <p class="container__title">Select a city and view the weather forecast.</p>
      <Search :selectedCity="selectedCity" :fetchCurrentLocationWeather="fetchCurrentLocationWeather" />
      <WeatherCard :cityData="selectedCity" @addWeatherBlock="addWeatherBlock" />
    </div>
    <div class="weather-block__container">
      <p class="weather-block__header">Your Weather Block</p>
      <div class="weather-block__flex">
        <WeatherCard v-for="(block, index) in weatherBlocks" :key="index" :cityData="block" />
      </div>
    </div>
  </main>

  <Modal v-if="showModal" @close="showModal = false">
    <p>{{ modalMessage }}</p>
  </Modal>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue';
import Search from '../components/SearchComponent.vue';;
import { fetchCurrentLocationWeather } from '@/helpers/weatherFetch';
import { reactive, onMounted, ref } from 'vue'
import Modal from '../components/ModalComponent.vue';

export default {
  components: {
    WeatherCard,
    Search,
    Modal
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

    const weatherBlocks = reactive([]);

    const showModal = ref(false);
    const modalMessage = ref("");

    onMounted(() => {
      fetchCurrentLocationWeather(selectedCity);
    });

    const addWeatherBlock = () => {
      if (weatherBlocks.length >= 5) {
        modalMessage.value = "You cannot add more than 5 weather blocks.";
      } else {
        const isAlreadyAdded = weatherBlocks.some((block) => block.name === selectedCity.name);
        if (isAlreadyAdded) {
          modalMessage.value = "This weather block is already added.";
        } else {
          const newBlock = { ...selectedCity };
          weatherBlocks.push(newBlock);
          modalMessage.value = "You added a block to Your Weather Block.";
        }
      }
      showModal.value = true;
    };

    return {
      selectedCity,
      fetchCurrentLocationWeather,
      weatherBlocks,
      addWeatherBlock,
      showModal,
      modalMessage
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