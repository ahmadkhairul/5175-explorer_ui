<script setup lang="ts"></script>

<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>


<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Spinner */
.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
