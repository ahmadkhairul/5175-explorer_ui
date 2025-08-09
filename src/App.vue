<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
  .explorer-ui-micro-frontend {
    padding: 1rem;
  }

  .explorer-ui-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
  }

  .explorer-ui-header h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }

  .explorer-ui-header p {
    margin: 0;
    opacity: 0.9;
  }
</style>
