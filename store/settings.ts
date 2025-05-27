
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        name: '',
        email: '',
        language: 'English',
        notifyEmail: false,
        notifySms: false,
    }),
    actions: {
        load() {
            const saved = localStorage.getItem('settings')
            if (saved) Object.assign(this, JSON.parse(saved))
        },
        save() {
            localStorage.setItem('settings', JSON.stringify(this.$state))
        },
    },
})
