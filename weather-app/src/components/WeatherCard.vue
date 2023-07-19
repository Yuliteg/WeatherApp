<template>
  <div class="weather-card">
    <div class="weather-card__container">
      <div class="weather-card__header flex">
        <button class="weather-card__favorite-btn" @click="closeCard" title="Add to Favorites">
          <CIcon :icon="cilStar" size="lg" class="icon" />
        </button>
        <p class="weather-card__title">Weather</p>
        <button class="weather-card__add-btn" @click="closeCard" title="Add to Weather Blocks">
          <CIcon :icon="cilXCircle" size="lg" class="icon" />
        </button>
      </div>
      <div class="weather-card__content">
        <p>
          <span class="weather-card__text">City:</span> {{ cityData.name || '' }}
        </p>
        <p>
          <span class="weather-card__text">Description:</span> {{ cityData.desc || "" }}
        </p>
        <p>
          <span class="weather-card__text">Sunrise:</span> {{ cityData.sunrise || '' }}
        </p>
        <p>
          <span class="weather-card__text">Sunset:</span> {{ cityData.sunset || '' }}
        </p>
        <p class="weather-card__temperature">
          <span class="weather-card__temperature-text">Temperature:</span>
          <span class="weather-card__temperature-value">
            {{ cityData.temperature || 0 }}°C
          </span>
        </p>
      </div>
      <div class="weather-card__chart">
        <BarChart :wind="cityData.windData" />
      </div>
    </div>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilXCircle, cilStar } from '@coreui/icons';
import BarChart from '../components/BarChart.vue';


export default {
  props: {
    cityData: {
      type: Object,
      required: false,
    },
  },
  components: {
    CIcon,
    BarChart,
  },
  setup() {
    CIcon.componentName = 'CIcon';
    CIcon.icons = { cilXCircle, cilStar };

    return {
      cilXCircle,
      cilStar,
    }
  },
  methods: {
    closeCard() {
      // Implement your logic to close the weather card
    },
  },
};
</script>


<style scoped>
.weather-card {
  position: relative;
  margin-top: 2rem;
  width: 340px;
  height: 450px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  background: url(../assets/card-item.jpg) center / cover;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
}

.weather-card__title {
  font-size: 25px;
  color: rgb(247, 251, 232);
  margin: 0;
}

.weather-card__add-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #07f92b;
  transform: rotate(45deg);
}

.icon {
  width: 2.5em;
  height: 2.5em;
}

.weather-card__favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #d9e711eb;
}

.weather-card__content {
  padding-left: 10%;
  color: rgb(239, 239, 241);
  font-size: 22px;
  margin-top: 1rem;
}

.weather-card__text {
  padding-right: 0.3rem;
  font-weight: 600;
}

.weather-card__temperature {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
  padding-top: 0.3rem;
}

.weather-card__temperature-text {
  margin-right: 0.5rem;
}

.weather-card__temperature-value {
  background-image: url(../assets/cloud_9766222.png);
  background-size: 200%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 25px;
  font-weight: bold;
  padding: 1.3rem;
  display: inline-block;
}
</style>