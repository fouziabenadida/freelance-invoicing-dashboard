<template>
  <nav class="space-y-2">
    <NuxtLink to="/dashboard" class="nav-link" exact @click="close">🏠 Dashboard</NuxtLink>
    <NuxtLink to="/invoices" class="nav-link" @click="close">🧾 Invoices</NuxtLink>
    <NuxtLink to="/clients" class="nav-link" @click="close">👥 Clients</NuxtLink>
    <NuxtLink to="/settings" class="nav-link" @click="close">⚙️ Settings</NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const close = () => {
  emit('close') 
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium;
}
.router-link-exact-active {
  @apply bg-blue-100 text-blue-700 font-semibold;
}
</style>
