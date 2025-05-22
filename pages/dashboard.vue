<template>
  <div class="space-y-6">

    <h2 class="text-2xl font-semibold text-gray-800">Bienvenue sur le Dashboard</h2>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Chiffre d'affaires" icon="💰" value="12 500 €" />
      <StatCard title="Factures payées" icon="✅" value="23" />
      <StatCard title="Clients" icon="👥" value="8" />
    </div>

    <div class="bg-white p-6 rounded-xl shadow-md">
      <h3 class="text-lg font-medium text-gray-700 mb-4">Revenus mensuels</h3>
      <RevenueChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '~/components/dashboard/StatCard.vue'
import RevenueChart from '~/components/dashboard/RevenueChart.vue'
</script>
