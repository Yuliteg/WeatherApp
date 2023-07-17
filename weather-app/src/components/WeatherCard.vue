<template>
  <div class="weather-card">
    <div class="weather-card__container">
      <div class="weather-card__header flex">
        <p class="weather-card__title">Weather</p>
        <button class="weather-card__close-btn" @click="closeCard">
          <CIcon :icon="closeIcon" size="lg" />
        </button>
      </div>
      <div class="weather-card__content">
        <p><span class="weather-card__text">City:</span> Litija</p>
        <p><span class="weather-card__text">Population:</span> 6459</p>
        <p><span class="weather-card__text">Sunrise:</span> 05:25:45</p>
        <p><span class="weather-card__text">Sunset:</span> 20:47:29</p>
      </div>

      <div class="weather-card__chart">
        <BarChart />
      </div>
    </div>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import BarChart from '../components/BarChart.vue';

export default {
  components: {
    CIcon,
    BarChart
  },
  props: {
    searchIcon: {
      type: Object,
      required: true,
    },
    closeIcon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeCard() {
    },
  },
};
</script>

<style scoped>
.weather-card {
  position: relative;
  margin-top: 2rem;
  width: 330px;
  height: 430px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  background: url(../assets/card-item.jpg) center / cover;
}

/* .weather-card__header {
  display: flex;
  justify-content: center;
  align-items: center;
} */

.weather-card__title {
  font-size: 25px;
  color: rgb(247, 251, 232);
  margin: 0;
}

.weather-card__close-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #f52c2ceb;
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

.weather-card__close-btn svg {
  width: 2.2em;
  height: 2.2em;
}

.weather-card__chart {
  margin-top: 3rem;
}
</style>