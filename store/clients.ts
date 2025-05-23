import { defineStore } from 'pinia'

export const useClientStore = defineStore('clients', {
  state: () => ({
    clients: [] as { id: string; name: string; email: string }[],
  }),
  actions: {
    add(client: { id: string; name: string; email: string }) {
      this.clients.push(client)
      this.save()
    },
    remove(id: string) {
      this.clients = this.clients.filter(c => c.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('clients', JSON.stringify(this.clients))
    },
    load() {
      const data = localStorage.getItem('clients')
      if (data) this.clients = JSON.parse(data)
    },
  },
})
