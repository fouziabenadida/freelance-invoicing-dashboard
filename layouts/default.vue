<template>
  <div class="min-h-screen flex bg-gray-50">
    <Sidebar :showSidebar="isSidebarOpen" @close="isSidebarOpen = false" />
    <div class="flex-1 flex flex-col min-h-screen">
      <Header @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      <main class="flex-1 p-4 overflow-y-auto">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue'
import Header from '~/components/layout/Header.vue'

import { useClientStore } from '~/store/clients'
import { useInvoiceStore } from '~/store/invoices'
const isSidebarOpen = ref(false)

const clientStore = useClientStore()
const invoiceStore = useInvoiceStore()

onMounted(() => {
  clientStore.load()
  invoiceStore.load()
})
</script>
