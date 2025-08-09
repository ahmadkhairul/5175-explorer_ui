<script setup lang="ts">
  import type { ModalAction } from '@/types/modal'
  import Modal from '@/elements/PopupElement.vue'
  import Spinner from '@/elements/SpinnerElement.vue'

  const emit = defineEmits(['edit-file', 'open-modal'])
  const { modal, loading } = defineProps<{ loading: boolean; modal: string | null }>()
  const newFileName = defineModel<string | null>()

  function openModal(action: ModalAction | null) {
    emit('open-modal', undefined, action)
  }

  function editFile() {
    emit('edit-file')
  }
</script>

<template>
  <Modal
    :isOpen="modal === 'rename-file'"
    title="Rename File"
    @close="openModal(null); newFileName = ''"
  >
    <div class="content">
      <input
        v-model="newFileName"
        placeholder="New File Name"
        @keyup.enter="editFile"
        data-testid="new-file-name-input"
      />
      <button
        class="btn"
        @click="editFile"
        data-testid="new-file-name-submit"
        :disabled="!newFileName || loading"
      >
        {{ loading ? 'Renaming...' : 'Rename' }}
        <Spinner v-if="loading" />
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
