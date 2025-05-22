<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ title }}</h3>
      <p class="text-sm text-gray-600 mb-6">{{ message }}</p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
