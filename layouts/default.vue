<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-900">
   
    <Sidebar />
    
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/sidebar.vue'
import Header from '~/components/layout/header.vue'

import { useClientStore } from '~/store/clients'
import { useInvoiceStore } from '~/store/invoices'

const clientStore = useClientStore()
const invoiceStore = useInvoiceStore()

onMounted(() => {
  clientStore.load()
  invoiceStore.load()
})
</script>
