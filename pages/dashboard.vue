<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">Welcome to the Dashboard</h2>

    <div v-if="loading" class="loading-wrapper">
      <div class="loader"></div>
      <p class="loading-text">Loading your dashboard...</p>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <div class="text-3xl">{{ stat.icon }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>

      <div class="chart-wrapper">
        <h3 class="chart-title">Monthly Revenue</h3>
        <div class="chart-container">
          <RevenueChart />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import RevenueChart from '~/components/dashboard/RevenueChart.vue'
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
  invoiceStore.invoices.filter(i => i.status.toLowerCase() === 'paid')
)
const paidInvoices = computed(() => paidInvoicesList.value.length)
const revenue = computed(() =>
  paidInvoicesList.value.reduce((total, invoice) => {
    const amount = parseFloat(invoice.amount)
    return total + (isNaN(amount) ? 0 : amount)
  }, 0)
)

const stats = computed(() => [
  { icon: '💰', label: 'Revenue', value: `${revenue.value.toLocaleString()} €` },
  { icon: '✅', label: 'Paid Invoices', value: paidInvoices.value },
  { icon: '👥', label: 'Clients', value: clientsCount.value },
])
</script>

<style scoped>
.dashboard-container {
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  text-align: center;
}

.stats-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.06);
}
.stat-label {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}
.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.chart-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  text-align: center;
}

.chart-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
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
</style>
