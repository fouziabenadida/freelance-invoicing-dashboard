<template>
  <div>
    <!-- Mobile Sidebar -->
    <Transition name="slide-fade">
      <aside v-if="showSidebar"
        class="fixed inset-y-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-50 md:hidden p-4 shadow-lg transition-transform duration-300 ease-in-out">
        <div class="flex justify-between items-center mb-6">
          <Brand />
          <button @click="$emit('close')" class="text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarLinks @close="$emit('close')" />
      </aside>
    </Transition>

    <!-- Desktop Sidebar -->
    <aside class="w-64 h-screen bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
      <div>
        <div class="p-6">
          <Brand />
        </div>
        <SidebarLinks />
      </div>
      <div class="px-4 py-6 text-sm text-gray-400">© 2025 invox.dev</div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import Brand from '../ui/Brand.vue'
import SidebarLinks from '../ui/SidebarLinks.vue'
const props = defineProps<{ showSidebar: boolean }>()
</script>


<style scoped>
.nav-link {
  @apply block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium;
}

.router-link-exact-active {
  @apply bg-blue-100 text-blue-700 font-semibold;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

</style>
