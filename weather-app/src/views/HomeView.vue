<template>
  <main>
    <div class="container flex">
      <p class="container__title">Select a city and view the weather forecast.
        <img src="../assets/cloudy.png" alt="cloud-image" />
      </p>
      <Search :selectedCity="selectedCity" :fetchCurrentLocationWeather="fetchCurrentLocationWeather"
        @loading="isLoading = $event" />
      <WeatherCard :cityData="selectedCity" @addWeatherBlock="addWeatherBlock" :handleModalMessage="handleModalMessage" />
    </div>
    <div class="weather-block__container">
      <p class="weather-block__header">Your Weather Blocks</p>
      <div class="weather-block__flex">
        <h2 v-if="!hasWeatherBlocks" class="weather-block__text">
          You don't have any Weather Blocks yet!
          <img src="../assets/cloud_9766222.png" alt="No Weather Blocks" />
        </h2>
        <WeatherCard v-for="(block, index) in weatherBlocks" :key="index" :cityData="block" :isWeatherBlock="true"
          @deleteWeatherBlock="showConfirmationModal(index)" :handleModalMessage="handleModalMessage" />
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
import { reactive, onMounted, ref, computed } from 'vue';
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
      country: '',
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

    const hasWeatherBlocks = computed(() => weatherBlocks.length > 0);

    const handleModalMessage = (message) => {
      showModal.value = true;
      modalMessage.value = message;
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
      isLoading,
      hasWeatherBlocks,
      handleModalMessage
    };
  },

};
</script>

<style>
.container {
  position: relative;
  padding-top: 4%;
  flex-direction: column;
}

.container::before,
.container::after {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  background: url(../assets/cloud.png) center / contain no-repeat;
  opacity: 0.3;
}

.container::before {
  top: 220px;
  left: 10%;
}

.container::after {
  top: 140px;
  right: 10%;
}


.container__title {
  padding-left: 10%;
  padding-right: 10%;
  font-size: 27px;
}

.container__title img {
  width: 50px;
  height: 50px;
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

.weather-block__text img {
  width: 50px;
  height: 50px;
}

@media (max-width: 700px) {
  .container::before,
  .container::after {
    display: none; 
  }
}
</style>