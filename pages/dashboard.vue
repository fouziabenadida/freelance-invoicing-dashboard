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
import { computed, onMounted, ref } from 'vue'
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
    const amount = parseFloat(invoice.amount)
    return total + (isNaN(amount) ? 0 : amount)
  }, 0)
)
</script>

<style scoped>
.dashboard-container {
  background: #f9fafb;
  padding: 2rem 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.06);
}

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

@media (max-width: 768px) {
  .stat-card {
    padding: 1.5rem;
  }

  .dashboard-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1rem;
  }

  .dashboard-title {
    font-size: 1.5rem;
  }
}
</style>
