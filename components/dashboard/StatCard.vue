<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition">
    <div class="text-3xl">{{ icon }}</div>
    <div>
      <div class="text-sm text-gray-500">{{ title }}</div>
      <div class="text-xl font-bold text-gray-800">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  value: string
}>()
</script>
