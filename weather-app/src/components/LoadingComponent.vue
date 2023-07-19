<template>
  <div v-if="isLoading" class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style>
.loading-spinner {
  position: absolute;
  bottom: 40%;
  right: 48%;
}

.spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 7px solid #f3f3f3;
  border-top-color: #196aa0;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>