<template>
  <div class="space-y-8 dashboard-container">
    <h2 class="dashboard-title">Welcome to the Dashboard</h2>


    <div v-if="loading" class="loading-wrapper">
      <div class="loader"></div>
      <p class="loading-text">Loading your dashboard...</p>
    </div>

 
    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="stat-card">
          <div class="text-3xl">💰</div>
          <div class="mt-2 text-sm text-gray-500">Revenue</div>
          <div class="mt-1 text-xl font-semibold">{{ revenue.toLocaleString() }} €</div>
        </div>
        <div class="stat-card">
          <div class="text-3xl">✅</div>
          <div class="mt-2 text-sm text-gray-500">Paid Invoices</div>
          <div class="mt-1 text-xl font-semibold">{{ paidInvoices }}</div>
        </div>
        <div class="stat-card">
          <div class="text-3xl">👥</div>
          <div class="mt-2 text-sm text-gray-500">Clients</div>
          <div class="mt-1 text-xl font-semibold">{{ clientsCount }}</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Monthly Revenue</h3>
        <RevenueChart />
      </div>
    </template>
  </div>
</template>



<script setup lang="ts">
import RevenueChart from '~/components/dashboard/RevenueChart.vue'
import { computed, onMounted } from 'vue'
import { useClientStore } from '~/store/clients'
import { useInvoiceStore } from '~/store/invoices'

const clientStore = useClientStore()
const invoiceStore = useInvoiceStore()

const loading = ref(true)

onMounted(() => {
  clientStore.load()
  invoiceStore.load()
  loading.value = false
})

const clientsCount = computed(() => clientStore.clients.length)

const paidInvoicesList = computed(() =>
  invoiceStore.invoices.filter(i =>
    i.status.toLowerCase() === 'paid'
  )
)

const paidInvoices = computed(() => paidInvoicesList.value.length)

const revenue = computed(() =>
  paidInvoicesList.value.reduce((total, invoice) => {
    const amount = Number(invoice.total)
    return total + (isNaN(amount) ? 0 : amount)
  }, 0)
)

</script>
<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.loader {
  width: 42px;
  height: 42px;
  border: 4px solid #d1d5db;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
