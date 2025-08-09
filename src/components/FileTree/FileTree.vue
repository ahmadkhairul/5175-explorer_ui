<script setup lang="ts">
import FolderItem from '@/components/FileTree/FileTreeItem.vue'
import { onMounted } from 'vue'
import { useFileTreeStore } from '@/stores/file-tree'
import { storeToRefs } from 'pinia'
import { getFiles } from '@/services'

const fileTree = useFileTreeStore()
const { initTree, expandNode, setSelectedItem } = fileTree
const { loading, error, tree, selectedItem } = storeToRefs(fileTree)

const fetchFiles = async () => {
  const all = await getFiles(undefined, { type: 'folder', all: true })
  initTree(all)
}

onMounted(fetchFiles)
</script>

<template>
  <div class="folder-explorer">
    <!-- Loading State -->
    <div v-if="loading" class="warning">Loading...</div>
    <div v-else-if="error" class="warning">Error Occured</div>

    <!-- Folder List -->
    <div v-else>
      <FolderItem v-for="file in tree" :key="file.id" :file="file" :selectedItem="selectedItem" @expand="expandNode"
        @setSelectedItem="setSelectedItem" />
    </div>
  </div>
</template>

<style scoped>
.folder-explorer {
  height: 100%;
  width: 100%;
  overflow: auto;
}

/* Loading text */
.warning {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

/* Folder list */
.folder-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Responsive */
@media (max-width: 768px) {
  .folder-explorer {
    max-width: 100%;
    min-width: auto;
    height: auto;
    border-right: none;
    border-bottom: 2px solid #ddd;
  }
}
</style>
