<template>
  <div class="favorite-page">
    <div class="favorite-page__header">
      <h3>Favorite Page
        <img src="../assets/star.png" alt="star-image" />
      </h3>
    </div>
    <div v-if="favoriteItems.length === 0" class="favorite-page__no-items">No favorite items added yet.</div>
    <div v-else>
      <div class="favorite-page__items">
        <WeatherCardFavoriteItem v-for="(item, index) in favoriteItems" :key="index" :favititeCityData="item"
          @deleteFavoriteItem="deleteFavoriteItem(index)" />
      </div>
    </div>
  </div>

  <Modal v-if="showModal" @close="showModal = false">
    <p>{{ modalMessage }}</p>
  </Modal>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import { cilTrash } from '@coreui/icons';
import { ref } from 'vue';
import WeatherCardFavoriteItem from '../components/WeatherCardFavoriteItem.vue';

export default {
  components: {
    WeatherCardFavoriteItem
  },
  setup() {
    CIcon.componentName = 'CIcon';
    CIcon.icons = { cilTrash };

    const favoriteItems = ref(getFavoriteItems());

    function getFavoriteItems() {
      return JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    }

    function deleteFavoriteItem(index) {
      const favorites = getFavoriteItems();
      if (index >= 0 && index < favorites.length) {
        favorites.splice(index, 1);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        favoriteItems.value = favorites;
      }
    }

    return {
      cilTrash,
      favoriteItems,
      deleteFavoriteItem,
    };
  },
};
</script>

<style>
.favorite-page {
  min-height: 80vh;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.favorite-page__header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1.3rem;
}

.favorite-page__header img {
  height: 30px;
  width: 30px;
}

.favorite-page__no-items {
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
}

.favorite-page__items {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.favorite-page__delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #888;
}

.favorite-page__delete-btn:hover {
  color: red;
}
</style>
