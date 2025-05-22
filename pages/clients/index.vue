<template>
  <div class="space-y-6">

    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Clients</h2>
      <button
        @click="isModalOpen = true"
        class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
      >
        + New Client
      </button>
    </div>


    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <table class="w-full text-sm text-gray-700">
        <thead>
          <tr class="border-b text-left">
            <th class="pb-3">Name</th>
            <th class="pb-3">Email</th>
            <th class="pb-3">Company</th>
              <th class="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in clients"
            :key="client.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="py-3">{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.company }}</td>
            <td class="py-3 space-x-2">
  <button
    @click="deleteClient(client.id)"
    class="text-red-600 hover:text-red-800 text-sm transition"
  >
    🗑 Delete
  </button>
</td>
          </tr>
        </tbody>
      </table>
    </div>

   <ClientModal
  :isOpen="isModalOpen"
  @close="isModalOpen = false"
  @submit="handleClientSubmit"
/>
<ConfirmDialog
  :isOpen="showConfirm"
  title="Delete Client"
  :message="`Are you sure you want to delete '${clientToDelete?.name}'? This action cannot be undone.`"
  @confirm="confirmDeletion"
  @cancel="cancelDeletion"
/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ClientModal from '~/components/clients/ClientModal.vue'
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'
import { toast } from 'vue3-toastify'


const clients = ref<any[]>([])

const isModalOpen = ref(false)

const searchTerm = ref('')

const showConfirm = ref(false)
const clientToDelete = ref<any>(null)

onMounted(() => {
  const saved = localStorage.getItem('clients')
  if (saved) {
    clients.value = JSON.parse(saved)
  }
})


watch(clients, (newVal) => {
  localStorage.setItem('clients', JSON.stringify(newVal))
}, { deep: true })

function handleClientSubmit(client: any) {
  clients.value.push({
    id: clients.value.length + 1,
    ...client
  })
    toast.success('Client added successfully!')
}

function confirmDeletion() {
  clients.value = clients.value.filter(c => c.id !== clientToDelete.value.id)
  toast.success(`"${clientToDelete.value.name}" was deleted.`)
  showConfirm.value = false
  clientToDelete.value = null
}

function cancelDeletion() {
  showConfirm.value = false
  clientToDelete.value = null
}

function deleteClient(id: number) {
  const target = clients.value.find(c => c.id === id)
  if (!target) return

  clientToDelete.value = target
  showConfirm.value = true
}


const filteredClients = computed(() =>
  clients.value.filter(c =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

</script>
