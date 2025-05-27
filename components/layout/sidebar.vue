<template>
  <div>
    <!-- Mobile Sidebar -->
    <aside v-if="showSidebar"
      class="fixed inset-y-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-50 md:hidden p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="text-blue-600 font-bold text-xl">InvoicePro</div>
        <button @click="$emit('close')" class="text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav class="space-y-2">
        <NuxtLink to="/dashboard" class="nav-link" exact>🏠 Dashboard</NuxtLink>
        <NuxtLink to="/invoices" class="nav-link">🧾 Invoices</NuxtLink>
        <NuxtLink to="/clients" class="nav-link">👥 Clients</NuxtLink>
        <NuxtLink to="/settings" class="nav-link">⚙️ Settings</NuxtLink>
      </nav>
    </aside>

    <!-- Desktop Sidebar -->
    <aside class="w-64 h-screen bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
      <div>
        <div class="p-6 font-bold text-2xl text-blue-600">InvoicePro</div>
        <nav class="mt-4 px-4 space-y-2">
          <NuxtLink to="/dashboard" class="nav-link" exact>🏠 Dashboard</NuxtLink>
          <NuxtLink to="/invoices" class="nav-link">🧾 Invoices</NuxtLink>
          <NuxtLink to="/clients" class="nav-link">👥 Clients</NuxtLink>
          <NuxtLink to="/settings" class="nav-link">⚙️ Settings</NuxtLink>
        </nav>
      </div>
      <div class="px-4 py-6 text-sm text-gray-400">© 2025 InvoicePro</div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ showSidebar: boolean }>()
</script>

<style scoped>
.nav-link {
  @apply block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium;
}

.router-link-exact-active {
  @apply bg-blue-100 text-blue-700 font-semibold;
}
</style>
