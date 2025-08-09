<template>
  <teleport to="body">
    <div v-show="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <header>
          <h2>{{ title }}</h2>
          <button @click="closeModal">❌</button>
        </header>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean; title?: string }>()
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close') // Emit event to parent
}
</script>

<style scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Box */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Modal Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  text-align: end;
  padding: 0;
}

/* Modal Body */
.modal-body {
  padding: 15px 0;
}
</style>
