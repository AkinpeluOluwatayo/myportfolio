import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 2. Import GSAP globally so it's ready for any component
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugin once
gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')