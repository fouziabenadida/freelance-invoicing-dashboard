<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <Sidebar :showSidebar="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      <main class="flex-1 overflow-y-auto p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/ui/Sidebar.vue'
import Header from '~/components/ui/Header.vue'

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
