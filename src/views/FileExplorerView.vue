<script setup lang="ts">
  import type { Ref } from 'vue'
  import FileExplorer from '@/components/FileExplorer/FileExplorer.vue'
  import FileTree from '@/components/FileTree/FileTree.vue'
  import { ref } from 'vue'

  const sidebar: Ref<boolean> = ref(true)
</script>

<template>
  <div class="container">
    <!-- Sidebar (File Tree) -->
    <aside class="file-tree" :class="{ hidden: !sidebar }">
      <div class="tree-header">File Explorer</div>
      <div class="tree-body">
        <FileTree />
      </div>
    </aside>

    <!-- Main Content (File List) -->
    <main class="file-list">
      <FileExplorer :sidebar v-model="sidebar" />
    </main>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    min-height: 100vh;
    background-color: #ffffff;
  }

  .file-tree {
    width: 24rem;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .hidden {
    display: none;
  }

  .tree-header {
    height: 3rem;
    padding: 0.75rem;
    border-right: 1px solid #60a5fa;
    border-bottom: 1px solid #60a5fa;
    box-sizing: border-box;
  }

  .tree-body {
    flex: 1;
    padding: 0.75rem;
    border-right: 1px solid #60a5fa;
    box-sizing: border-box;
  }

  .file-list {
    flex: 1;
  }
</style>
