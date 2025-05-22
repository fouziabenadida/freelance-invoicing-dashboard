<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl border border-gray-200">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Nouvelle Facture</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
          &times;
        </button>
      </div>

      <form class="space-y-5" @submit.prevent="submit">
        <div class="space-y-1">
          <label class="text-sm text-gray-600">Client Name</label>
          <input
            v-model="form.client"
            type="text"
            placeholder="Acme Corp"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Amount (€)</label>
          <input
            v-model="form.amount"
            type="number"
            placeholder="1250"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Date</label>
          <input
            v-model="form.date"
            type="date"
            class="input"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-gray-600">Status</label>
          <select v-model="form.status" class="input">
            <option value="">Select status</option>
            <option value="payée">Paid</option>
            <option value="en attente">Pending</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
     Save
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close', 'submit'])

const form = ref({
  client: '',
  amount: '',
  date: '',
  status: ''
})

function close() {
  emit('close')
}

function submit() {
  emit('submit', { ...form.value })
  close()
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
