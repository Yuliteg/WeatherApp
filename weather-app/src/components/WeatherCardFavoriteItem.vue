<template>
  <div class="favorite-card">
    <div class="favorite-card__container">
      <header class="favorite-card__header flex">
        <div class="favorite-card__favorite-container">
            <img src="../assets/star%20(1).png" alt="star-icon" class="icon star-icon" title="Favorite"/>
        </div>
        <h2 class="favorite-card__title">Your Favorite</h2>
        <button class="favorite-card__delete-btn" title="Delete favorite Block" @click="deleteFavoriteItem">
          <CIcon :icon="cilTrash" size="lg" class="icon" />
        </button>
      </header>
      <section class="favorite-card__content">
        <p>
          <strong class="favorite-card__text">Country:</strong> {{ favititeCityData.country || '' }}
        </p>
        <p>
          <strong class="favorite-card__text">City:</strong> {{ favititeCityData.name || '' }}
        </p>
        <p>
          <strong class="favorite-card__text">Description:</strong> {{ favititeCityData.desc || "" }}
        </p>
        <p>
          <strong class="favorite-card__text">Sunrise:</strong> {{ favititeCityData.sunrise || '' }}
        </p>
        <p>
          <strong class="favorite-card__text">Sunset:</strong> {{ favititeCityData.sunset || '' }}
        </p>
        <p class="favorite-card__temperature">
          <strong class="favorite-card__temperature-text">Temperature:</strong>
          <strong class="favorite-card__temperature-value">
            {{ favititeCityData.temperature || 0 }}°C
          </strong>
        </p>
      </section>
      <section class="favorite-card__chart">
        <BarChart :wind="favititeCityData.windData" />
      </section>
    </div>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilXCircle, cilTrash } from '@coreui/icons';
import BarChart from '../components/BarChart.vue';

export default {
  props: {
    favititeCityData: {
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
    CIcon.icons = { cilXCircle, cilTrash };

    return {
      cilXCircle,
      cilTrash,
    }
  },
  methods: {
    deleteFavoriteItem() {
      this.$emit("deleteFavoriteItem");
    },
  }
};
</script>


<style scoped>
.favorite-card {
  position: relative;
  margin-top: 1.6rem;
  width: 340px;
  height: 450px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  background: url(../assets/sl_031821_41530_20.jpg) center / cover;
}

.favorite-card__header {
  display: flex;
  justify-content: space-between;
}

.favorite-card__title {
  padding-right: 0, 8rem;
  font-size: 24px;
  color: rgb(247, 251, 232);
  margin: 0;
}

.favorite-card__add-btn,
.favorite-card__delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #07f92b;
}

.favorite-card__add-btn {
  transform: rotate(45deg);
}

.favorite-card__delete-btn {
  color: #f93c4fcd;
}

.icon {
  width: 2em;
}

.favorite-card__favorite-btn {
  border: none;
  cursor: pointer;
  background-color: #edf73e9c;
  color: rgb(238, 238, 238);
  border-radius: 10%;
}

.favorite-card__content {
  padding-left: 10%;
  color: rgb(239, 239, 241);
  font-size: 21px;
  margin-top: 1rem;
}

.favorite-card__text {
  padding-right: 0.3rem;
  font-weight: 600;
}

.favorite-card__temperature {
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
  padding-top: 0.3rem;
}

.favorite-card__temperature-text {
  margin-right: 0.5rem;
}

.favorite-card__temperature-value {
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