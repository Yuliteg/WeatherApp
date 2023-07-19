<template>
  <div class="modal-backdrop" @click="cancel">
    <div class="modal">
      <div class="modal__content">
        <p>{{ message }}</p>
        <div class="modal__buttons">
          <button class="modal__button modal__button--no" @click="confirm">Yes</button>
          <button class="modal__button modal__button--yes" @click="cancel">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
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

.modal__button--yes {
  background-color: #eaeaea;
}

.modal__button--no {
  background-color: #d42d3e;
  color: white;
}
</style>