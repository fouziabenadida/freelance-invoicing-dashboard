<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl border border-gray-200">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">New Client</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
          &times;
        </button>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-1">
          <label class="text-sm text-gray-600">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Jane Doe"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="client@email.com"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Company</label>
          <input
            v-model="form.company"
            type="text"
            placeholder="e.g. Acme Corp"
            class="input"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save Client
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close', 'submit'])
import { toast } from 'vue3-toastify'

const form = ref({
  name: '',
  email: '',
  company: ''
})

const error = ref('')

function resetForm() {
  form.value = { name: '', email: '', company: '' }
  error.value = ''
}

function close() {
  resetForm()
  emit('close')
}

function submit() {
  if (!form.value.name || !form.value.email || !form.value.company) {
toast.error('Please fill in all fields.')
error.value = 'Please fill in all fields.'
    return
  }

  emit('submit', { ...form.value })
  close()
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
