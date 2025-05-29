<template>
  <div class="space-y-6">
   
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">My invoices</h2>
<button
  @click="isModalOpen = true"
  class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
>
  + New invoice
</button>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <table class="w-full text-sm text-gray-700">
        <thead>
          <tr class="border-b text-left">
            <th class="pb-3">#</th>
            <th class="pb-3">Client</th>
            <th class="pb-3">Amount</th>
            <th class="pb-3">Date</th>
            <th class="pb-3">Status</th>
            <th class="pb-3">Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invoice in invoices"
            :key="invoice.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="py-3">{{ invoice.id }}</td>
            <td>{{ invoice.client }}</td>
            <td>{{ invoice.amount }} €</td>
            <td>{{ invoice.date }}</td>
            <td>
              <span
           :class="[
  'px-3 py-1 rounded-full text-xs font-semibold',
  invoice.status === 'Paid'
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'
]"
              >
                {{ invoice.status }}
              </span>
            </td>
  <td class="py-3 space-x-2">
  <button
    @click="exportToPDF(invoice)"
class="text-blue-600 hover:text-blue-800 text-sm transition"
  >
    📄 Export
  </button>
  <button
    @click="deleteInvoice(invoice.id)"
 class="text-red-600 hover:text-red-800 text-sm transition"
  >
    🗑 Delete
  </button>
</td>

          </tr>
        </tbody>
      </table>
    </div>
    <InvoiceModal
  :isOpen="isModalOpen"
  :clients="clients"
  @close="isModalOpen = false"
  @submit="handleSubmit"
/>
  </div>

</template>

<script setup lang="ts">
import InvoiceModal from '~/components/invoices/InvoiceModal.vue'
import { ref,onMounted, watch } from 'vue'
import jsPDF from 'jspdf'
import { toast } from 'vue3-toastify'


const isModalOpen = ref(false)

const invoices = ref<any[]>([])

const clients = ref<any[]>([])

onMounted(() => {
  const savedClients = localStorage.getItem('clients')
  if (savedClients) {
    clients.value = JSON.parse(savedClients)
  }

  const savedInvoices = localStorage.getItem('invoices')
  if (savedInvoices) {
    invoices.value = JSON.parse(savedInvoices)
  }
})

watch(invoices, (newVal) => {
  localStorage.setItem('invoices', JSON.stringify(newVal))
}, { deep: true })

function handleSubmit(invoice: any) {
  const client = clients.value.find(c => c.id === Number(invoice.clientId))
  const clientName = client ? client.name : 'Unknown'

  const existingStatuses = invoices.value
    .filter(inv => inv.client === clientName)
    .map(inv => inv.status)

  // Vérifie s'il existe déjà une facture d'un autre statut pour ce client
  const hasConflict = existingStatuses.some(status => status !== invoice.status)

  if (hasConflict) {
    toast.error(`This client already has an invoice with a different status.`)
    return
  }

  invoices.value.push({
    id: invoices.value.length + 1,
    client: clientName,
    amount: invoice.amount,
    date: invoice.date,
    status: invoice.status
  })

  toast.success('Invoice saved successfully!')
}



function exportToPDF(invoice: any) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Invoice', 20, 20)

  doc.setFontSize(12)
  doc.text(`Client : ${invoice.client}`, 20, 40)
  doc.text(`Montant : ${invoice.amount} €`, 20, 50)
  doc.text(`Date : ${invoice.date}`, 20, 60)
  doc.text(`Statut : ${invoice.status}`, 20, 70)

  doc.save(`invoice-${invoice.id}.pdf`)
}

function deleteInvoice(id: number) {
  invoices.value = invoices.value.filter((inv) => inv.id !== id)
}

</script>
