<template>
  <article class="weather-card">
    <div class="weather-card__container">
      <header class="weather-card__header flex">
        <div class="weather-card__favorite-container">
          <button class="weather-card__favorite-btn" @click="addToFavorites">
            Add to <br /> Favorites
          </button>
          <img v-if="isInFavorites" src="../assets/star (1).png" alt="star-icon" class="icon star-icon" title="Favorite"/>
        </div>
        <h2 class="weather-card__title">Weather</h2>
        <button v-if="isWeatherBlock" class="weather-card__delete-btn" @click="showDeleteConfirmation"
          title="Delete Weather Block">
          <CIcon :icon="cilTrash" size="lg" class="icon" />
        </button>
        <button v-else class="weather-card__add-btn" @click="addBlock" title="Add to Weather Blocks">
          <CIcon :icon="cilXCircle" size="lg" class="icon" />
        </button>
      </header>
      <section class="weather-card__content">
        <p>
          <strong class="weather-card__text">Country:</strong> {{ cityData.country || '' }}
        </p>
        <p>
          <strong class="weather-card__text">City:</strong> {{ cityData.name || '' }}
        </p>
        <p>
          <strong class="weather-card__text">Description:</strong> {{ cityData.desc || "" }}
        </p>
        <p>
          <strong class="weather-card__text">Sunrise:</strong> {{ cityData.sunrise || '' }}
        </p>
        <p>
          <strong class="weather-card__text">Sunset:</strong> {{ cityData.sunset || '' }}
        </p>
        <p class="weather-card__temperature">
          <strong class="weather-card__temperature-text">Temperature:</strong>
          <strong class="weather-card__temperature-value">
            {{ cityData.temperature || 0 }}°C
          </strong>
        </p>
      </section>
      <section class="weather-card__chart">
        <BarChart :wind="cityData.windData" />
      </section>
    </div>
  </article>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilXCircle, cilTrash } from '@coreui/icons';
import BarChart from '../components/BarChart.vue';
import { ref, watchEffect } from "vue"

export default {
  props: {
    cityData: {
      type: Object,
      required: false,
    },
    isWeatherBlock: {
      type: Boolean,
      default: false,
    },
    handleModalMessage: {
      type: Function,
      required: true,
    },
  },
  components: {
    CIcon,
    BarChart,
  },
  setup(props, { emit }) {
    CIcon.componentName = 'CIcon';
    CIcon.icons = { cilXCircle, cilTrash };

    const isInFavorites = ref(checkIfCityIsInFavorites());

    function checkIfCityIsInFavorites() {
      const favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
      return favorites.some((favorite) => favorite.name === props.cityData.name);
    }

    const addToFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
      const isAlreadyAdded = favorites.some((favorite) => favorite.name === props.cityData.name);

      if (isAlreadyAdded) {
        props.handleModalMessage('This city is already in favorites.');
      } else if (favorites.length >= 5) {
        props.handleModalMessage('You cannot add more than 5 weather blocks to favorites.');
      } else {
        favorites.push(props.cityData);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        props.handleModalMessage('You added a block to Favorites.');
        isInFavorites.value = true;
      }
    }

    const showDeleteConfirmation = () => {
      emit("deleteWeatherBlock");
    };

    const addBlock = () => {
      emit('addWeatherBlock');
    };

    watchEffect(() => {
      isInFavorites.value = checkIfCityIsInFavorites();
    });

    return {
      cilXCircle,
      cilTrash,
      addToFavorites,
      showDeleteConfirmation,
      addBlock,
      isInFavorites
    }
  },
};
</script>

<style scoped>
.weather-card {
  position: relative;
  margin-top: 1.6rem;
  width: 340px;
  height: 450px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  background: url(../assets/card-item.jpg) center / cover;
  z-index: 1;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
}

.weather-card__title {
  padding-right: 0, 8rem;
  font-size: 1.5rem;
  color: var(--white-color);
  margin: 0;
}

.weather-card__add-btn,
.weather-card__delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #07f92b;
}

.weather-card__add-btn {
  transform: rotate(45deg);
}

.weather-card__delete-btn {
  color: #f93c4fcd;
}

.icon {
  width: 2.2em;
}

.weather-card__favorite-btn {
  border: none;
  cursor: pointer;
  background-color: #edf73e9c;
  color: var(--white-color);
  border-radius: 10%;
}

.weather-card__content {
  padding-left: 10%;
  color: var(--white-color);
  font-size: 21px;
  margin-top: 1rem;
}

.weather-card__text {
  padding-right: 0.3rem;
  font-weight: 600;
}

.weather-card__temperature {
  height: 7vh;
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
  font-size: 1.4rem;
  font-weight: bold;
  padding: 1.5rem;
}

.weather-card__favorite-container {
  display: flex;
  align-items: center;
}

.star-icon {
  position: absolute;
  left: 26%;
  width: 20px;
  height: 20px;
}
</style>