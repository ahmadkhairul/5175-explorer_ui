import { ref, watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { upsertFile, updateFile, destroyFile, getFiles } from '@/services/file'
import { useFileTreeStore } from '@/stores/file-tree'
import { storeToRefs } from 'pinia'
import type { FileProps } from '@/types/files'

export interface UseFileExplorerReturn {
  firstRender: Ref<boolean>
  loading: Ref<boolean>
  error: Ref<unknown>
  files: Ref<FileProps[] | null>
  modal: Ref<string | null>
  newFolder: Ref<string>
  newFileName: Ref<string>
  newFile: Ref<File | null>
  actionItem: Ref<FileProps | null>
  actions: Ref<boolean>
  search: Ref<string>
  fetchfiles: (
    id?: number,
    params?: { name?: string; type?: string; all?: boolean }
  ) => Promise<void>
  refetchfiles: () => Promise<void>
  createFolder: () => Promise<void>
  uploadFile: () => Promise<void>
  editFile: () => Promise<void>
  deleteFile: () => Promise<void>
  openModal: (file: FileProps | undefined, modalName: string) => void
}

/**
 * useFileExplorer
 *
 * This composable handles the logic for managing files and folders in the file explorer UI.
 * It integrates with the file API (get, create, update, delete) and syncs state with the file tree store.
 *
 * Reactive states include file/folder list, loading status, modal visibility, form inputs, and selectedItem item.
 *
 * Features:
 * - Fetch files and folders for a selectedItem directory
 * - Create new folders
 * - Upload files
 * - Rename existing files or folders
 * - Delete files or folders
 * - Search files by name with debounced API call
 * - Manage modal visibility for file actions
 *
 * @returns {{
 *   firstRender: Ref<boolean>,
 *   loading: Ref<boolean>,
 *   error: Ref<unknown>,
 *   files: Ref<FileProps[] | null>,
 *   modal: Ref<string | null>,
 *   newFolder: Ref<string>,
 *   newFileName: Ref<string>,
 *   newFile: Ref<File | null>,
 *   actionItem: Ref<FileProps | null>,
 *   actions: Ref<boolean>,
 *   search: Ref<string>,
 *   fetchfiles: Function,
 *   refetchfiles: Function,
 *   createFolder: Function,
 *   uploadFile: Function,
 *   editFile: Function,
 *   deleteFile: Function,
 *   openModal: Function
 * }}
 */

export function useFileExplorer(): UseFileExplorerReturn {
  const firstRender: Ref<boolean> = ref(true) // Show "please select folder" on first render
  const loading: Ref<boolean> = ref(false) // Indicates loading state
  const error: Ref<unknown> = ref(null) // Stores API error

  const files: Ref<FileProps[] | null> = ref(null) // List of files/folders
  const modal: Ref<string | null> = ref(null) // Modal type: 'create', 'delete', etc

  const newFolder: Ref<string> = ref('') // Input for creating new folder
  const newFileName: Ref<string> = ref('') // Input for renaming file/folder
  const newFile: Ref<File | null> = ref(null) // File to be uploaded

  const actionItem: Ref<FileProps | null> = ref(null) // File/folder selectedItem for edit/delete
  const actions: Ref<boolean> = ref(false) // Toggle for showing edit/delete actions
  const search: Ref<string> = ref('') // Search query string

  const fileTree = useFileTreeStore()
  const { selectedItem } = storeToRefs(fileTree)
  const { addItem, updateItem, deleteItem } = fileTree

  let timeout: ReturnType<typeof setTimeout> | undefined

  async function fetchfiles(
    id?: number,
    params: { name?: string; type?: string; all?: boolean } = {}
  ) {
    try {
      loading.value = true
      files.value = await getFiles(id, params)
      if (firstRender.value) firstRender.value = false
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function refetchfiles() {
    await fetchfiles(selectedItem.value?.id)
    newFolder.value = ''
    newFile.value = null
    newFileName.value = ''
    modal.value = null
  }

  async function createFolder() {
    try {
      loading.value = true
      const result = await upsertFile({
        name: newFolder.value,
        parent_id: selectedItem.value?.id
      })
      addItem(result as FileProps)
      await refetchfiles()
    } catch (err: unknown) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function uploadFile() {
    try {
      if (!newFile.value) return
      loading.value = true
      await upsertFile({
        file: newFile.value,
        parent_id: selectedItem.value?.id
      })
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function editFile() {
    try {
      if (!actionItem.value) return
      loading.value = true
      const result = await updateFile(actionItem.value.id, { name: newFileName.value })
      updateItem(actionItem.value.id, result)
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function deleteFile() {
    try {
      if (!actionItem.value) return
      loading.value = true
      await destroyFile(actionItem.value.id)
      deleteItem(actionItem.value.id)
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function openModal(file: FileProps | undefined, modalName: string) {
    if (file) actionItem.value = file
    modal.value = modalName
  }

  watch(search, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fetchfiles(selectedItem.value?.id, {
        name: search.value,
        ...(search.value && { all: true })
      })
    }, 500)
  })

  watch(selectedItem, () => {
    search.value = ''
    fetchfiles(selectedItem.value?.id)
  })

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return {
    firstRender,
    loading,
    error,
    files,
    modal,
    newFolder,
    newFile,
    actions,
    newFileName,
    actionItem,
    search,
    fetchfiles,
    refetchfiles,
    createFolder,
    uploadFile,
    editFile,
    deleteFile,
    openModal
  }
}
