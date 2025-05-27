<template>
    <nav class="space-y-2">
        <NuxtLink to="/dashboard" class="nav-link" exact>🏠 Dashboard</NuxtLink>
        <NuxtLink to="/invoices" class="nav-link">🧾 Invoices</NuxtLink>
        <NuxtLink to="/clients" class="nav-link">👥 Clients</NuxtLink>
        <NuxtLink to="/settings" class="nav-link">⚙️ Settings</NuxtLink>
    </nav>
</template>

<style scoped>
.nav-link {
    @apply flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium;
}

.router-link-exact-active {
    @apply bg-blue-100 text-blue-700 font-semibold;
}
</style>