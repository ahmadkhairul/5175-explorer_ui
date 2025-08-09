import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useFileExplorer } from '../useFileExplorer'
import type { FileProps } from '@/types/files'

// ✅ MOCK BOTH MODULES INSIDE vi.mock() BLOCKS
vi.mock('@/services/file', () => {
  return {
    getFiles: vi.fn(),
    upsertFile: vi.fn(),
    updateFile: vi.fn(),
    destroyFile: vi.fn()
  }
})

const selectedItemRef = ref({ id: 1 })

vi.mock('@/stores/file-tree', () => {
  return {
    useFileTreeStore: () => ({
      selectedItem: selectedItemRef,
      addItem: vi.fn(),
      updateItem: vi.fn(),
      deleteItem: vi.fn()
    }),
    storeToRefs: () => ({
      selectedItem: selectedItemRef
    })
  }
})

// ✅ Import AFTER mock to avoid hoisting issues
import * as fileService from '@/services/file'
import { ref } from 'vue'

describe('useFileExplorer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches files successfully', async () => {
    (fileService.getFiles as any).mockResolvedValueOnce([{ id: 1, name: 'test.txt' }])

    const explorer = useFileExplorer()
    await explorer.fetchfiles(1)

    expect(fileService.getFiles).toHaveBeenCalledWith(1, {})
    expect(explorer.files.value).toEqual([{ id: 1, name: 'test.txt' }])
  })

  it('creates a new folder', async () => {
    const newFolder: FileProps = { id: 10, name: 'New Folder' } as FileProps
    ;(fileService.upsertFile as any).mockResolvedValueOnce(newFolder)
    ;(fileService.getFiles as any).mockResolvedValueOnce([])

    const explorer = useFileExplorer()
    explorer.newFolder.value = 'New Folder'
    await explorer.createFolder()

    expect(fileService.upsertFile).toHaveBeenCalledWith({
      name: 'New Folder',
      parent_id: 1
    })
  })

  it('uploads a file', async () => {
    const file = new File(['abc'], 'file.txt', { type: 'text/plain' })
    ;(fileService.upsertFile as any).mockResolvedValueOnce({})
    ;(fileService.getFiles as any).mockResolvedValueOnce([])

    const explorer = useFileExplorer()
    explorer.newFile.value = file
    await explorer.uploadFile()

    expect(fileService.upsertFile).toHaveBeenCalledWith({
      file,
      parent_id: 1
    })
  })

  it('edits a file', async () => {
    const updated = { id: 2, name: 'renamed.txt' }
    ;(fileService.updateFile as any).mockResolvedValueOnce(updated)
    ;(fileService.getFiles as any).mockResolvedValueOnce([])

    const explorer = useFileExplorer()
    explorer.actionItem.value = { id: 2, name: 'old.txt' } as FileProps
    explorer.newFileName.value = 'renamed.txt'
    await explorer.editFile()

    expect(fileService.updateFile).toHaveBeenCalledWith(2, { name: 'renamed.txt' })
  })

  it('deletes a file', async () => {
    ;(fileService.destroyFile as any).mockResolvedValueOnce({})
    ;(fileService.getFiles as any).mockResolvedValueOnce([])

    const explorer = useFileExplorer()
    explorer.actionItem.value = { id: 3, name: 'delete.txt' } as FileProps
    await explorer.deleteFile()

    expect(fileService.destroyFile).toHaveBeenCalledWith(3)
  })

  it('sets actionItem and modal via openModal', () => {
    const explorer = useFileExplorer()
    const file = { id: 99, name: 'File X' } as FileProps

    explorer.openModal(file, 'edit')

    expect(explorer.actionItem.value).toEqual(file)
    expect(explorer.modal.value).toBe('edit')
  })
})
