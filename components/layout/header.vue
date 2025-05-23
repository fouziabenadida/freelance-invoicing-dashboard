<template>
  <header class="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
    <div class="flex items-center gap-4">
      <!-- Burger for mobile -->
      <button @click="$emit('toggleSidebar')" class="md:hidden text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Breadcrumb -->
      <div class="text-sm text-gray-500 flex items-center gap-2">
        <NuxtLink to="/dashboard" class="hover:text-blue-600">🏠 Dashboard</NuxtLink>
        <span>›</span>
        <span class="text-gray-700">{{ currentTitle }}</span>
      </div>
    </div>

    <!-- Avatar -->
    <div class="flex items-center gap-4">
      <div class="hidden md:flex flex-col text-right">
        <span class="text-sm font-medium text-gray-900">Fuziya Candas</span>
        <span class="text-xs text-gray-500">Frontend Developer</span>
      </div>
      <img src="https://i.pravatar.cc/100" class="w-10 h-10 rounded-full border" alt="avatar" />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const currentTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path === '/invoices') return 'Invoices'
  if (path === '/clients') return 'Clients'
  if (path === '/settings') return 'Settings'
  return ''
})
</script>
