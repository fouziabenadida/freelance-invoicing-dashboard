<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl border border-gray-200">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">New Invoice</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
          &times;
        </button>
      </div>

     
      <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-1">
          <label class="text-sm text-gray-600">Client</label>
          <select v-model="form.clientId" class="input cursor-pointer">
            <option value="">Select a client</option>
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }}
            </option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Amount (€)</label>
          <input
            v-model="form.amount"
            type="number"
            placeholder="e.g. 2500"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Date</label>
          <input
            v-model="form.date"
            type="date"
            class="input cursor-pointer"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Status</label>
          <select v-model="form.status" class="input cursor-pointer">
            <option value="">Select status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

    
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>


        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save Invoice
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'

const props = defineProps<{
  isOpen: boolean
  clients: { id: number; name: string }[]
}>()

const emit = defineEmits(['close', 'submit'])

const form = ref({
  clientId: '',
  amount: '',
  date: '',
  status: ''
})

const error = ref('')

function resetForm() {
  form.value = {
    clientId: '',
    amount: '',
    date: '',
    status: ''
  }
  error.value = ''
}

function close() {
  resetForm()
  emit('close')
}

function submit() {
  if (
    !form.value.clientId ||
    !form.value.amount ||
    !form.value.date ||
    !form.value.status
  ) {
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
