<template>
  <div class="modal-backdrop" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal__content">
        <slot></slot>
        <button class="modal__button" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: auto;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal__button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #eaeaea;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>