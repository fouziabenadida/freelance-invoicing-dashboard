<template>
    <div class="settings-wrapper">
        <h1 class="settings-heading">⚙️ Settings</h1>

        <section class="card">
            <div class="card-header">
                <h2>👤 Profile Information</h2>
                <p>Edit your name, email, and other personal details.</p>
            </div>
            <form class="form-grid" @submit.prevent="handleProfileSubmit">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" placeholder="Your full name" v-model="settings.name" />
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="you@example.com" v-model="settings.email" />
                </div>

                <div class="form-group">
                    <label for="language">Preferred Language</label>
                    <select id="language" v-model="settings.language">
                        <option>English</option>
                        <option>French</option>
                        <option>Turkish</option>
                    </select>
                </div>

                <div class="form-actions">
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </section>

        <section class="card">
            <div class="card-header">
                <h2>🔔 Notifications</h2>
                <p>Choose what notifications you want to receive.</p>
            </div>
            <form class="form-grid" @submit.prevent="handleNotificationsSubmit">
                <div class="checkbox-group">
                    <input type="checkbox" id="notifyEmail" v-model="settings.notifyEmail" />
                    <label for="notifyEmail">Email Notifications</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="notifySms" v-model="settings.notifySms" />
                    <label for="notifySms">SMS Notifications</label>
                </div>
                <div class="form-actions">
                    <button type="submit">Update Preferences</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '~/store/settings'
import { toast } from 'vue3-toastify'


const settings = useSettingsStore()

onMounted(() => {
    settings.load()
})

const handleProfileSubmit = (e: Event) => {
    e.preventDefault()
    settings.save()
    toast.success('Profile updated successfully!')
}

const handleNotificationsSubmit = (e: Event) => {
    e.preventDefault()
    settings.save()
    toast.success('Notification preferences saved!')
}
</script>


<style scoped>
.settings-wrapper {
    max-width: 960px;
    margin: auto;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.settings-heading {
    font-size: 2.5rem;
    font-weight: 900;
    color: #111827;
    text-align: center;
    margin-bottom: 1rem;
}

.card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.card-header h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
}

.card-header p {
    font-size: 0.95rem;
    color: #6b7280;
    margin-top: 0.25rem;
}

.form-grid {
    display: grid;
    gap: 1.25rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    color: #374151;
}

.form-group input,
.form-group select {
    padding: 0.65rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    background: #f9fafb;
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
}

.form-actions {
    margin-top: 1rem;
}

.form-actions button {
    background: #3b82f6;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background 0.3s ease;
    border: none;
    cursor: pointer;
}

.form-actions button:hover {
    background: #2563eb;
}

@media (min-width: 640px) {
    .form-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .form-actions {
        grid-column: span 2;
    }
}
</style>