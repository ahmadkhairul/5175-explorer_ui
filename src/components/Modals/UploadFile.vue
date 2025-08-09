<script setup lang="ts">
  import type { ModalAction } from '@/types/modal'
  import Modal from '@/elements/PopupElement.vue'
  import Spinner from '@/elements/SpinnerElement.vue'

  const emit = defineEmits(['upload-file', 'open-modal'])
  const { modal, loading } = defineProps<{ loading: boolean; modal: string | null }>()
  const newFile = defineModel<File | null>()

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      newFile.value = target.files[0]
    }
  }

  function openModal(action: ModalAction | null) {
    emit('open-modal', undefined, action)
  }

  function uploadFile() {
    emit('upload-file')
  }
</script>

<template>
  <Modal
    :isOpen="modal === 'new-file'"
    title="Upload New Files"
    @close="openModal(null); newFile = null"
  >
    <div class="content">
      <input @change="handleFileUpload" type="file" data-testid="new-file-input" />
      <button class="btn" @click="uploadFile" :disabled="!newFile || loading">
        {{ loading ? 'Uploading...' : 'Upload' }}
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
