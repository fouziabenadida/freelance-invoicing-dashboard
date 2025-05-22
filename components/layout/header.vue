<template>
  <header class="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shadow-sm">
<div class="flex items-center text-sm text-gray-500 gap-2">
  <NuxtLink to="/dashboard" class="flex items-center gap-1 hover:text-blue-600 transition">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    </svg>
    <span class="font-medium">Dashboard</span>
  </NuxtLink>

  <span>›</span>
  <span class="text-gray-700">{{ currentTitle }}</span>
</div>

  
    <div class="flex items-center gap-4">
      <div class="hidden md:flex flex-col text-right">
        <span class="text-sm font-medium text-gray-900">Fuziya Candas</span>
        <span class="text-xs text-gray-500">Frontend Developer</span>
      </div>
      <img
        src="https://i.pravatar.cc/100"
        alt="Avatar"
        class="w-10 h-10 rounded-full border border-gray-200 shadow"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { computed } from 'vue'

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
