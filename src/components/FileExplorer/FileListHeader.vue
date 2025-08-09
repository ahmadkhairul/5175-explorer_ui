<script setup lang="ts">
  import { nextTick } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import type { ModalAction } from '@/types/modal'

  const emit = defineEmits(['open-modal'])

  const search = defineModel<string>()
  const sidebar = defineModel<boolean>('sidebar')
  const actions = defineModel<boolean>('actions')

  const authStore = useAuthStore()

  async function logout() {
    authStore.logout()
    await nextTick()
    window.location.reload()
  }

  function openModal(action: ModalAction) {
    emit('open-modal', undefined, action)
  }
</script>

<template>
  <div class="file-list-header">
    <div class="file-button-container">
      <button class="btn" data-testid="sidebar-btn" @click="sidebar = !sidebar">
        {{ sidebar ? '✖️' : '☰' }}
      </button>

      <button
        class="btn"
        data-testid="new-folder-btn"
        @click="openModal('new-folder')"
        :disabled="!!search"
      >
        📁 Folder Baru
      </button>

      <button
        class="btn"
        data-testid="new-file-btn"
        @click="openModal('new-file')"
        :disabled="!!search"
      >
        📄 Upload File
      </button>

      <button class="btn" data-testid="action-btn" @click="actions = !actions">
        {{ actions ? 'Hide Action ⚙️' : 'Show Action ⚙️' }}
      </button>
    </div>

    <input
      class="search-input"
      data-testid="search-input"
      v-model="search"
      placeholder="🔍 Cari nama file..."
    />

    <button class="btn" data-testid="logout-btn" @click="logout">🚪 Keluar</button>
  </div>
</template>

<style scoped>
  .file-list-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #60a5fa;
    background-color: #f9f9f9;
  }

  .file-button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .search-input {
    flex-grow: 1;
    min-width: 200px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #646cff;
  }

  @media (max-width: 768px) {
    .file-list-header {
      flex-direction: column;
      align-items: stretch;
    }

    .file-button-container {
      justify-content: center;
      width: 100%;
    }

    .search-input {
      width: 100%;
    }
  }
</style>
