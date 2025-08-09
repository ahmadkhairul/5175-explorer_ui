import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FileNode, FileProps } from '@/types'

export const useFileTreeStore = defineStore('fileTree', () => {
  const tree = ref<FileNode[]>([])
  const cache = ref<Record<number, FileNode[]>>({})
  const loading = ref<boolean>(true)
  const error = ref<any>(null)
  const selectedItem = ref<FileNode | null>(null)
  const breadcrumb = ref<FileProps[]>([])

  const initTree = async (all: FileProps[]) => {
    try {
      const map: Record<number, FileNode[]> = {}

      for (const file of all) {
        const parentId = file.parent_id ?? 0
        if (!map[parentId]) map[parentId] = []
        map[parentId].push({ ...file, expanded: true, children: [] })
      }

      const buildTree = (parentId: number): FileNode[] => {
        return (map[parentId] || []).map(node => ({
          ...node,
          children: buildTree(node.id)
        }))
      }

      tree.value = buildTree(0)
      cache.value = map
      loading.value = false
    } catch (error: any) {
      loading.value = false
      error.value = error
    }
  }

  const expandNode = (node: FileNode) => {
    node.expanded = !node.expanded
  }

  const setSelectedItem = (node: FileNode) => {
    if (node.type === 'folder') {
      selectedItem.value = node
    }
  }

  const addItem = (item: FileProps) => {
    const newNode: FileNode = {
      ...item,
      expanded: true,
      children: []
    }

    const parentId = item.parent_id ?? 0

    // Tambahkan ke cache
    if (!cache.value[parentId]) cache.value[parentId] = []
    cache.value[parentId].push(newNode)

    // Tambahkan ke tree (jika parent ada di dalam tree)
    const injectToTree = (nodes: FileNode[]): boolean => {
      for (const node of nodes) {
        if (node.children && node.id === parentId) {
          node.children.push(newNode)
          return true
        }
        if (node.children && node.children.length && injectToTree(node.children)) return true
      }
      return false
    }

    // Kalau parent_id null atau 0, tambahkan ke root
    if (parentId === 0) {
      tree.value.push(newNode)
    } else {
      injectToTree(tree.value)
    }
  }

  const updateItem = (id: number, updatedFields: Partial<FileProps>) => {
    const updateRecursively = (nodes: FileNode[]): boolean => {
      for (const node of nodes) {
        if (node.id === id) {
          Object.assign(node, updatedFields)
          return true
        }
        if (node.children && node.children.length && updateRecursively(node.children)) return true
      }
      return false
    }

    updateRecursively(tree.value)
  }

  const deleteItem = (id: number) => {
    const removeIds: number[] = []

    // Cari semua descendant ID
    const collectDescendants = (nodes: FileNode[]) => {
      for (const node of nodes) {
        removeIds.push(node.id)
        if (node.children?.length) {
          collectDescendants(node.children)
        }
      }
    }

    // Hapus dari tree
    const deleteFromTree = (nodes: FileNode[]): boolean => {
      const index = nodes.findIndex(node => node.id === id)
      if (index !== -1) {
        const targetNode = nodes[index]
        collectDescendants([targetNode])
        nodes.splice(index, 1)
        return true
      }

      for (const node of nodes) {
        if (node.children && node.children.length && deleteFromTree(node.children)) {
          return true
        }
      }

      return false
    }

    // Hapus dari cache semua yang termasuk descendant
    deleteFromTree(tree.value)
    for (const parentId in cache.value) {
      cache.value[parentId] = cache.value[parentId].filter(node => !removeIds.includes(node.id))
    }
  }

  return {
    tree,
    cache,
    initTree,
    loading,
    error,
    expandNode,
    selectedItem,
    setSelectedItem,
    breadcrumb,
    addItem,
    updateItem,
    deleteItem
  }
})
