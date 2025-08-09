<template>
  <div class="breadcrumb">
    <span @click="breadcrumbClick(-1)">Home</span>
    {{ breadcrumb && breadcrumb.length > 0 ? ' > ' : '' }}
    <template v-for="(item, index) in breadcrumb">
      <span @click="breadcrumbClick(index)">{{ item.name }}</span>
      <span v-if="index < breadcrumb.length - 1"> > </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type FileProps } from '@/types'

const emit = defineEmits(['set-breadcrumb', 'fetch-files'])
const { breadcrumb } = defineProps<{
  breadcrumb: FileProps[]
}>()

const breadcrumbClick = async (index: number) => {
  const newbreadcrumb = breadcrumb.slice(0, index + 1)
  emit('set-breadcrumb', newbreadcrumb)
  if (index < 0) {
    emit('fetch-files', undefined, -1)
  } else if (index > -1) {
    emit('fetch-files', newbreadcrumb[newbreadcrumb.length - 1].id, newbreadcrumb.length - 1)
  }
}
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
