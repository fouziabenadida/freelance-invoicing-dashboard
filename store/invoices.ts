import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoices', {
  state: () => ({
    invoices: [] as { id: string; total: number | string; status: string }[]
  }),
  actions: {
    add(invoice: { id: string; total: number; status: string }) {
      this.invoices.push(invoice)
      this.save()
    },
    remove(id: string) {
      this.invoices = this.invoices.filter(f => f.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('invoices', JSON.stringify(this.invoices))
    },
    load() {
      const data = localStorage.getItem('invoices')
      if (data) this.invoices = JSON.parse(data)
    },
  },
})
