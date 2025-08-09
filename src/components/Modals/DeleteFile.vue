<script setup lang="ts">
  import type { ModalAction } from '@/types/modal'
  import Modal from '@/elements/PopupElement.vue'
  import Spinner from '@/elements/SpinnerElement.vue'

  const emit = defineEmits(['delete-file', 'open-modal'])
  const { modal, loading } = defineProps<{ loading: boolean; modal: string | null }>()

  function openModal(action: ModalAction | null) {
    emit('open-modal', undefined, action)
  }

  function deleteFile() {
    emit('delete-file')
  }
</script>

<template>
  <Modal :isOpen="modal === 'delete-file'" title="Delete File" @close="openModal(null)">
    <div class="content">
      <p>
        Are you sure you want to delete this file?
        <br />
        <strong>All nested files and folders will also be deleted.</strong>
      </p>
      <button
        class="btn"
        type="button"
        data-testid="delete-confirm-btn"
        @click="deleteFile"
        :disabled="loading"
      >
        {{ loading ? 'Deleting...' : 'Delete' }}
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
</style>
