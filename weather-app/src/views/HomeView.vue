<template>
  <main>
    <div class="container flex">
      <p class="container__title">Select a city and view the weather forecast.</p>
      <Search :selectedCity="selectedCity" :fetchCurrentLocationWeather="fetchCurrentLocationWeather" />
      <WeatherCard :cityData="selectedCity" @addWeatherBlock="addWeatherBlock" />
    </div>
    <div class="weather-block__container">
      <p class="weather-block__header">Your Weather Blocks</p>
      <div class="weather-block__flex">
        <h2 class="weather-block__text">You don't have any Weather Blocks yet</h2>
        <WeatherCard v-for="(block, index) in weatherBlocks" :key="index" :cityData="block" :isWeatherBlock="true"
          @deleteWeatherBlock="showConfirmationModal(index)" />
      </div>
    </div>
  </main>

  <Modal v-if="showModal" @close="showModal = false">
    <p>{{ modalMessage }}</p>
  </Modal>

  <ConfirmationModal v-if="confirmationModalVisible" :message="'Are you sure you want to delete this weather block?'"
    @confirm="deleteWeatherBlock" @cancel="closeConfirmationModal" />

  <LoadingComponent :isLoading="isLoading" />
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import Search from '../components/SearchComponent.vue';
import { fetchCurrentLocationWeather } from '@/helpers/weatherFetch';
import { reactive, onMounted, ref } from 'vue';
import Modal from '../components/ModalComponent.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';

export default {
  components: {
    WeatherCard,
    Search,
    Modal,
    ConfirmationModal,
    LoadingComponent
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
    const modalMessage = ref('');
    const confirmationModalVisible = ref(false);
    const selectedBlockIndex = ref(null);
    const isLoading = ref(true);

    onMounted(() => {
      fetchCurrentLocationWeather(selectedCity, isLoading);
    });

    const addWeatherBlock = () => {
      if (weatherBlocks.length >= 5) {
        modalMessage.value = 'You cannot add more than 5 weather blocks.';
      } else {
        const isAlreadyAdded = weatherBlocks.some((block) => block.name === selectedCity.name);
        if (isAlreadyAdded) {
          modalMessage.value = 'This weather block is already added.';
        } else {
          const newBlock = { ...selectedCity };
          weatherBlocks.push(newBlock);
          modalMessage.value = 'You added a block to Your Weather Block.';
        }
      }
      showModal.value = true;
    };

    const deleteWeatherBlock = () => {
      const index = selectedBlockIndex.value;
      if (index !== null) {
        weatherBlocks.splice(index, 1);
        modalMessage.value = 'You deleted a block from Your Weather Block.';
      }
      confirmationModalVisible.value = false;
      showModal.value = true;
    };

    const showConfirmationModal = (index) => {
      selectedBlockIndex.value = index;
      confirmationModalVisible.value = true;
    };

    const closeConfirmationModal = () => {
      confirmationModalVisible.value = false;
    };

    return {
      selectedCity,
      fetchCurrentLocationWeather,
      weatherBlocks,
      addWeatherBlock,
      showModal,
      modalMessage,
      deleteWeatherBlock,
      confirmationModalVisible,
      closeConfirmationModal,
      showConfirmationModal,
      isLoading
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
  min-height: 400px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.weather-block__text {
  padding-top: 15vh;
}
</style>