<script setup lang="ts">
  import type { ModalAction } from '@/types/modal'
  import Modal from '@/elements/PopupElement.vue'
  import SpinnerElement from '@/elements/SpinnerElement.vue'

  const emit = defineEmits(['create-folder', 'open-modal'])
  const { modal, loading } = defineProps<{ loading: boolean; modal: string | null }>()
  const newFolder = defineModel<string | null>()

  function openModal(action: ModalAction | null) {
    emit('open-modal', undefined, action)
  }

  function createFolder() {
    emit('create-folder')
  }
</script>

<template>
  <Modal
    :isOpen="modal === 'new-folder'"
    title="Create New Folder"
    @close="openModal(null); newFolder = ''"
  >
    <div class="content">
      <input v-model="newFolder" placeholder="Nama folder" data-testid="new-folder-input" />
      <button
        class="btn"
        type="button"
        data-testid="create-folder-submit"
        @click="createFolder"
        :disabled="!newFolder || loading"
      >
        {{ loading ? 'Creating...' : 'Create' }}
        <SpinnerElement v-if="loading" />
      </button>
    </div>
  </Modal>
</template>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  input {
    flex-grow: 1;
    min-width: 200px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #646cff;
  }
</style>
