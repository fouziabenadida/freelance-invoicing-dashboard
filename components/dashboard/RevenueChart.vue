<template>
  <div class="chart-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useInvoiceStore } from '~/store/invoices'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  BarController
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  BarController
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const invoiceStore = useInvoiceStore()

function groupRevenuesByMonth() {
  const monthTotals: { [key: string]: number } = {
    Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
    Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
  }

  invoiceStore.invoices.forEach((invoice: any) => {
    if (invoice.status.toLowerCase() === 'paid') {
      const date = new Date(invoice.date)
      const month = date.toLocaleString('default', { month: 'short' })
      const amount = parseFloat(invoice.amount)
      if (!isNaN(amount)) {
        monthTotals[month] += amount
      }
    }
  })

  return Object.entries(monthTotals)
    .reduce((acc, [month, total]) => {
      acc.labels.push(month)
      acc.data.push(total)
      return acc
    }, { labels: [], data: [] } as { labels: string[], data: number[] })
}

onMounted(() => {
  if (!canvasRef.value) return

  const { labels, data } = groupRevenuesByMonth()

  new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Revenus (€)',
          data,
          backgroundColor: '#3B82F6'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // 💡 very important for mobile!
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + ' €'
            }
          }
        }
      }
    }
  })
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 350px; 
  @media (max-width: 640px) {
    height: 260px;
  }
  @media (max-width: 480px) {
    height: 200px;
  }
}
</style>
