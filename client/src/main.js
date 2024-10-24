

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.component('InputText', InputText)
app.component('Dialog', Dialog)
app.component('Button', Button)
app.use(router)

app.mount('#app')
