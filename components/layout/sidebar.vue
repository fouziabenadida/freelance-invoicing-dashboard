<template>
  <aside class="w-64 h-screen bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
    <div>
      <div class="p-6 font-bold text-2xl text-blue-600 tracking-wide">InvoicePro</div>
      <nav class="mt-4 px-4 space-y-2">
        <NuxtLink to="/dashboard" class="nav-link" exact>🏠 Dashboard</NuxtLink>
        <NuxtLink to="/invoices" class="nav-link">🧾 Invoices</NuxtLink>
        <NuxtLink to="/clients" class="nav-link">👥 Clients</NuxtLink>
        <NuxtLink to="/settings" class="nav-link">⚙️ Settings</NuxtLink>
      </nav>
    </div>

    <div class="px-4 py-6 text-sm text-gray-400">© 2025 InvoicePro</div>
  </aside>
</template>

<style scoped>
.nav-link {
  @apply block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium;
}
.router-link-exact-active {
  @apply bg-blue-100 text-blue-700 font-semibold;
}
</style>
