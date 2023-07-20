<template>
  <div class="favorite-card">
    <div class="favorite-card__container">
      <div class="favorite-card__header flex">
        <div class="favorite-card__favorite-container">
          <CIcon :icon="cilStar" size="lg" class="icon star-icon" />
        </div>
        <p class="favorite-card__title">Your Favorite</p>
        <button class="favorite-card__delete-btn" title="Delete favorite Block" @click="deleteFavoriteItem">
          <CIcon :icon="cilTrash" size="lg" class="icon" />
        </button>
      </div>
      <div class="favorite-card__content">
        <p>
          <span class="favorite-card__text">Country:</span> {{ favititeCityData.country || '' }}
        </p>
        <p>
          <span class="favorite-card__text">City:</span> {{ favititeCityData.name || '' }}
        </p>
        <p>
          <span class="favorite-card__text">Description:</span> {{ favititeCityData.desc || "" }}
        </p>
        <p>
          <span class="favorite-card__text">Sunrise:</span> {{ favititeCityData.sunrise || '' }}
        </p>
        <p>
          <span class="favorite-card__text">Sunset:</span> {{ favititeCityData.sunset || '' }}
        </p>
        <p class="favorite-card__temperature">
          <span class="favorite-card__temperature-text">Temperature:</span>
          <span class="favorite-card__temperature-value">
            {{ favititeCityData.temperature || 0 }}°C
          </span>
        </p>
      </div>
      <div class="favorite-card__chart">
        <BarChart :wind="favititeCityData.windData" />
      </div>
    </div>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilXCircle, cilStar, cilTrash } from '@coreui/icons';
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
    CIcon.icons = { cilXCircle, cilStar, cilTrash };

    return {
      cilXCircle,
      cilStar,
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
  background: url(../assets/card-item.jpg) center / cover;
}

.favorite-card__header {
  display: flex;
  justify-content: space-between;
}

.favorite-card__title {
  padding-right: 0, 8rem;
  font-size: 25px;
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
  width: 2.3em;
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

.star-icon {
  color: yellow;
}
</style>