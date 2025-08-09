<script setup lang="ts">
  import { useFileTreeStore } from '@/stores/file-tree'
  import type { FileProps } from '@/types/files'
  import type { ModalAction } from '@/types/modal'

  const emit = defineEmits(['open-modal'])

  const { setSelectedItem } = useFileTreeStore()

  const { actions, files, loading, firstRender } = defineProps<{
    actions: boolean
    loading: boolean
    files: FileProps[] | null
    firstRender: boolean
  }>()

  function openModal(file: FileProps, actions: ModalAction) {
    emit('open-modal', file, actions)
  }
</script>

<template>
  <div v-if="loading" class="loading">⏳ Memuat data...</div>

  <div v-else-if="firstRender" class="loading">Silakan pilih folder terlebih dahulu</div>

  <div v-else-if="!files || !files.length" class="loading">Folder masih kosong</div>

  <div class="container" v-else>
    <div class="container-file" v-for="file in files" :key="file.id">
      <div data-testid="item-file" class="container-item" @dblclick="setSelectedItem(file)">
        <div>{{ file.type === 'folder' ? '📁' : '📄' }}</div>
        <p class="ellipsis">{{ file.name }}</p>
      </div>
      <div class="file-actions" v-if="actions">
        <div data-testid="edit-btn" @click="openModal(file, 'rename-file')" title="Edit file">
          ✏️
        </div>
        <div data-testid="delete-btn" @click="openModal(file, 'delete-file')" title="Hapus file">🗑️</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
  }

  .container-file {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-item {
    width: calc(25% - 10px);
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 150px;
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s;
    height: 40px;
    border-radius: 5px;
  }

  .container-item:hover {
    background: #e6e6e6;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .file-actions {
    width: 100px;
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
  }

  .file-actions div {
    cursor: pointer;
    border: 0.5px solid #646cff;
    border-radius: 5px;
    padding: 2px 6px;
  }

  .loading {
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .container-item {
      width: calc(33.33% - 10px);
    }
  }

  @media (max-width: 768px) {
    .container-item {
      width: calc(50% - 10px);
    }
  }

  @media (max-width: 480px) {
    .container-item {
      width: 100%;
    }
  }
</style>
