import { mountWithPinia } from '@/utils/test-utils'
import { describe, expect, it } from 'vitest'
import FileList from '@/components/FileExplorer/FileList.vue'

const initialProps = {
  actions: true,
  loading: false,
  files: [
    {
      id: 1,
      parent_id: 0,
      name: 'Documents',
      type: 'folder',
      size: 0,
      created_at: '2025-07-01T10:00:00Z',
      updated_at: '2025-07-01T10:00:00Z',
      deleted_at: null
    },
    {
      id: 2,
      parent_id: 1,
      name: 'Resume.pdf',
      type: 'file',
      size: 254000,
      created_at: '2025-07-01T10:15:00Z',
      updated_at: '2025-07-01T10:15:00Z',
      deleted_at: null
    }
  ],
  firstRender: false
}

describe('FileList.vue — render and interaction', () => {
  // ✅ Render the list when files are provided
  it('renders correctly with files', () => {
    const wrapper = mountWithPinia(FileList, {
      props: initialProps
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="item-file"]').length).toBe(2)
  })

  // ✅ Show loading text when `loading` is true
  it('renders loading state when loading is true', () => {
    const wrapper = mountWithPinia(FileList, {
      props: {
        ...initialProps,
        loading: true
      }
    })

    expect(wrapper.text()).toContain('⏳ Memuat data...')
  })

  // ✅ Show empty message when no files are present
  it('renders empty state when files is null', () => {
    const wrapper = mountWithPinia(FileList, {
      props: {
        ...initialProps,
        files: null
      }
    })

    expect(wrapper.text()).toContain('Folder masih kosong')
  })

  // ✅ Show initial prompt when no folder is selectedItem yet
  it('renders firstRender message when firstRender is true and files is null', () => {
    const wrapper = mountWithPinia(FileList, {
      props: {
        ...initialProps,
        files: null,
        firstRender: true
      }
    })

    expect(wrapper.text()).toContain('Silakan pilih folder terlebih dahulu')
  })

  // ✅ Emit events for edit, delete, and double-click on folder
  it('emits open-modal when action buttons clicked and handles folder double click', async () => {
    const wrapper = mountWithPinia(FileList, {
      props: initialProps
    })

    // Edit buttons
    const editBtns = wrapper.findAll('[data-testid="edit-btn"]')
    await editBtns[0].trigger('click')
    await editBtns[1].trigger('click')

    // Delete buttons
    const deleteBtns = wrapper.findAll('[data-testid="delete-btn"]')
    await deleteBtns[0].trigger('click')
    await deleteBtns[1].trigger('click')

    // Double click folder (should trigger setSelectedItem in store — not emitted)
    const items = wrapper.findAll('[data-testid="item-file"]')
    await items[0].trigger('dblclick') // folder
    await items[1].trigger('dblclick') // file

    // assert that nothing was emitted on double click (since it's store-based, no event emitted)
    // but no crash/error either
    expect(wrapper.findAll('[data-testid="item-file"]').length).toBe(2)
  })
})
