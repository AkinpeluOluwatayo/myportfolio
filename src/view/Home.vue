<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import emailjs from '@emailjs/browser'
import Cursor from '../components/Cursor.vue'

gsap.registerPlugin(ScrollTrigger)

const isPlaying = ref(false)
const audioPlayer = ref(null)

const toggleMusic = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
    audioPlayer.value.volume = 0.2
  }
  isPlaying.value = !isPlaying.value
}

const contactForm = ref(null)
const isSending = ref(false)
const sendStatus = ref('Send Inquiry')

const sendEmail = () => {
  isSending.value = true
  sendStatus.value = 'Sending...'

  const SERVICE_ID = 'service_hncbvdd'
  const TEMPLATE_ID = 'template_4izpkwf'
  const PUBLIC_KEY = 'xktYTB0gHxhXQaZtd'

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm.value, PUBLIC_KEY)
      .then(() => {
        isSending.value = false
        sendStatus.value = 'Message Sent!'
        contactForm.value.reset()
        setTimeout(() => { sendStatus.value = 'Send Inquiry' }, 3000)
      }, (error) => {
        isSending.value = false
        sendStatus.value = 'Error! Try Again'
        console.error('FAILED...', error.text)
        setTimeout(() => { sendStatus.value = 'Send Inquiry' }, 3000)
      })
}

onMounted(() => {
  const startAudio = () => {
    if(audioPlayer.value) {
      audioPlayer.value.play().then(() => {
        isPlaying.value = true
        audioPlayer.value.volume = 0.2
        window.removeEventListener('click', startAudio)
      }).catch(() => {})
    }
  }

  startAudio()
  window.addEventListener('click', startAudio)

  const tl = gsap.timeline()
  tl.from(".reveal", { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "power4.out" })
  tl.from(".music-ctrl", { x: -20, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5")

  // Animation for project cards and architecture cards
  gsap.utils.toArray('.scroll-reveal').forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    })
  })
})

const architecture = [
  {
    title: "BFF Pattern",
    subtitle: "Backend-for-Frontend",
    desc: "Optimizing data delivery by creating tailored API layers for specific user interfaces, reducing over-fetching.",
    icon: "solar:layers-minimalistic-bold-duotone"
  },
  {
    title: "Modular Monolith",
    subtitle: "Scalable Structure",
    desc: "Designing systems with highly decoupled modules that balance the simplicity of monoliths with the flexibility of microservices.",
    icon: "solar:widget-add-bold-duotone"
  },
  {
    title: "SSR & SEO",
    subtitle: "Performance First",
    desc: "Implementing Server-Side Rendering (SSR) to ensure lightning-fast initial loads and maximum search engine visibility.",
    icon: "solar:graph-up-bold-duotone"
  }
]

const projects = [
  {
    title: "DealBridge Connect",
    stack: ["logos:vue", "logos:spring-icon", "logos:postgresql", "logos:tailwindcss-icon"],
    desc: "A next-generation advertising platform connecting individuals and businesses for seamless buying and selling.",
    img: "/dealbridge.png",
    link: "https://dealbridgeconnect.netlify.app/",
    git: "https://github.com/AkinpeluOluwatayo/advert_system_backend.git"
  },
  {
    title: "BoltVisionary",
    stack: ["logos:react", "logos:nestjs", "logos:postgresql"],
    desc: "A high-performance to-do application featuring a robust NestJS backend and a reactive React frontend for seamless task management.",
    img: "/bolt.png",
    link: "https://boltvisionary.netlify.app/",
    git: "https://github.com/AkinpeluOluwatayo/bolt_frontend.git"
  },
  {
    title: "El olam CMS",
    stack: ["logos:spring-icon", "logos:nextjs-icon", "logos:mongodb-icon", "logos:tailwindcss-icon"],
    desc: "A comprehensive management system built with Spring Boot and Next.js, featuring parent, CEO, and Director dashboards with Spring Security.",
    img: "/elolamwebsite.png",
    link: "#",
    git: "https://github.com/AkinpeluOluwatayo/El_olamSpecialHome.git"
  },
  {
    title: "Zenith Expense",
    stack: ["logos:spring-icon", "logos:nextjs-icon", "logos:supabase-icon", "logos:tailwindcss-icon"],
    desc: "A sophisticated financial tracking application designed for monitoring personal and business spending, engineered with Spring Boot and Supabase.",
    img: "/zenith.png",
    link: "https://zenith-expense-tracker.vercel.app/",
    git: "https://github.com/AkinpeluOluwatayo/zenithFrontend.git"
  },
  {
    title: "El-olam gateway",
    stack: ["logos:react", "logos:tailwindcss-icon", "simple-icons:paystack"],
    desc: "A specialized payment gateway used for processing school and service fees, integrated with the Paystack API for secure transactions.",
    img: "/paymentlink.png",
    link: "https://elolamtuitionpaymentlink.vercel.app/",
    git: "https://github.com/AkinpeluOluwatayo/elolamtuitionpaymentlink.git"
  }
]

const socials = [
  { name: 'GitHub', url: 'https://github.com/AkinpeluOluwatayo' },
  { name: 'LinkedIn', url: 'https://ng.linkedin.com/in/akinpelu-tayo-425664314' }
]
</script>

<template>
  <Cursor />
  <audio ref="audioPlayer" loop src="/ambient-track.mp3"></audio>

  <div class="music-ctrl fixed top-24 left-6 md:top-32 md:left-12 lg:left-20 z-[100] flex items-center gap-3 bg-stone-900/60 backdrop-blur-xl p-1.5 pr-5 rounded-full border border-white/5 transition-all hover:border-emerald-500/30 group">
    <button @click="toggleMusic" class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-black active:scale-90 transition-transform shadow-lg shadow-emerald-500/20">
      <Icon :icon="isPlaying ? 'solar:pause-bold' : 'solar:play-bold'" class="text-lg" />
    </button>
    <div class="flex flex-col">
      <span class="text-[7px] uppercase font-black tracking-[0.2em] text-stone-500 group-hover:text-emerald-500 transition-colors">Experience Audio</span>
      <div class="flex items-end gap-[1.5px] h-2.5">
        <div v-for="i in 5" :key="i" class="w-[2px] bg-emerald-500/80" :class="isPlaying ? 'animate-visualizer' : 'h-[1px]'" :style="{ animationDelay: `${i * 0.1}s` }"></div>
      </div>
    </div>
  </div>

  <main class="bg-[#0c0a09] text-white selection:bg-emerald-500/30 overflow-x-hidden">
    <section class="p-6 md:p-12 lg:px-20 min-h-screen">
      <header class="flex justify-between items-center mb-16 max-w-7xl mx-auto">
        <div class="text-xl font-black italic tracking-tighter uppercase">Akinpelu <span class="text-emerald-500">Oluwatayo</span></div>
        <nav class="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
          <a href="#projects" class="hover:text-emerald-500 transition-colors">Projects</a>
          <a href="#contact" class="hover:text-emerald-500 transition-colors">Contact</a>
        </nav>
      </header>

      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-12">
          <div class="flex-1">
            <p class="reveal text-emerald-500 font-mono mb-4 tracking-[0.4em] uppercase text-[10px] font-bold">Frontend Focus // Backend Supporting</p>
            <h1 class="reveal text-5xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter">
              Architecting <br/><span class="text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-600">The Modern</span><br/>Web.
            </h1>
          </div>

          <div class="reveal w-full max-w-[400px] md:w-64 lg:w-72 aspect-[4/5] md:h-96 shrink-0 relative group self-center lg:self-auto">
            <div class="absolute inset-0 border border-emerald-500/30 rounded-[2rem] rotate-2 md:rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div class="absolute inset-0 bg-stone-900 rounded-[2rem] overflow-hidden border border-white/10">
              <img
                  src="/Akinpelutayo.jpeg"
                  alt="Akinpelu Oluwatayo"
                  class="w-full h-full object-cover object-top md:grayscale hover:grayscale-0 transition-all duration-700 md:scale-110 hover:scale-100"
              />
            </div>
          </div>
        </div>

        <div class="reveal grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[220px]">
          <div class="md:col-span-8 md:row-span-2 bg-stone-900/40 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-md flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <div class="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h3 class="text-emerald-500 uppercase text-[10px] font-black tracking-widest mb-4 flex items-center gap-2"><span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Primary Stack</h3>
                <p class="text-3xl md:text-5xl font-black leading-none italic uppercase">Interactive <br/> Interfaces</p>
              </div>
              <div class="flex gap-3 bg-stone-950/50 p-3 rounded-2xl border border-white/5">
                <Icon icon="logos:react" class="text-xl md:text-2xl" /><Icon icon="logos:nextjs-icon" class="text-xl md:text-2xl" /><Icon icon="logos:vue" class="text-xl md:text-2xl" /><Icon icon="logos:typescript-icon" class="text-xl md:text-2xl" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div v-for="item in [{t:'React/Next.js', d:'SSR, ISR, App Router', icon:'logos:react'}, {t:'Vue 3', d:'Composition API, Vite', icon:'logos:vue'}, {t:'Mobile', d:'React Native, Expo', icon:'logos:react-native'}, {t:'Styling', d:'Tailwind, GSAP', icon:'logos:tailwindcss-icon'}]" :key="item.t" class="border-l border-white/10 pl-4 group/item">
                <Icon :icon="item.icon" class="mb-2 grayscale group-hover/item:grayscale-0 transition-all" />
                <p class="text-white font-bold text-sm">{{ item.t }}</p>
                <p class="text-stone-500 text-[10px] uppercase font-bold mt-1">{{ item.d }}</p>
              </div>
            </div>
          </div>

          <div class="md:col-span-4 md:row-span-2 bg-stone-900/40 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <h3 class="text-stone-500 uppercase text-[10px] font-black tracking-widest mb-6">Backend</h3>
              <div class="space-y-8">
                <div class="flex gap-4"><Icon icon="logos:spring-icon" class="text-3xl shrink-0" /><div><p class="text-xl font-black italic uppercase leading-none">Spring Boot</p><p class="text-stone-500 text-[10px] mt-2 uppercase font-bold tracking-tighter">Security • JWT</p></div></div>
                <div class="flex gap-4"><Icon icon="logos:python" class="text-3xl shrink-0" /><div><p class="text-xl font-black italic uppercase leading-none">Python Stack</p><p class="text-stone-500 text-[10px] mt-2 uppercase font-bold tracking-tighter">Django REST</p></div></div>
              </div>
            </div>
            <div class="pt-4 mt-6 border-t border-white/5 flex gap-4 grayscale opacity-50"><Icon icon="logos:java" /><Icon icon="logos:nodejs-icon" /><Icon icon="logos:postgresql" /></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Core <span class="text-emerald-500">Architecture</span></h2>
          <p class="text-stone-500 font-mono text-[10px] uppercase mt-4 tracking-[0.4em]">Foundational Strategies & Performance Design</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="item in architecture" :key="item.title" class="scroll-reveal bg-stone-900/20 border border-white/5 p-8 rounded-[2rem] hover:bg-stone-900/40 hover:border-emerald-500/20 transition-all group">
          <Icon :icon="item.icon" class="text-4xl text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
          <h4 class="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-2">{{ item.subtitle }}</h4>
          <h3 class="text-2xl font-black uppercase italic mb-4">{{ item.title }}</h3>
          <p class="text-stone-500 text-sm leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <section id="projects" class="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div class="mb-16">
        <h2 class="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Selected<br/><span class="text-emerald-500">Works</span></h2>
        <p class="text-stone-500 font-mono text-[10px] uppercase mt-8 tracking-[0.4em]">Browse through the latest development (01 — 05)</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div v-for="(project, index) in projects" :key="index"
             class="scroll-reveal project-card group bg-stone-900/30 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden">

          <div class="relative w-full aspect-video overflow-hidden bg-stone-950 border-b border-white/5">
            <img :src="project.img" :alt="project.title" class="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
            <span class="absolute top-6 right-6 text-stone-800 font-black italic text-5xl group-hover:text-emerald-500/20 transition-colors">0{{index + 1}}</span>
          </div>

          <div class="p-8 md:p-10 flex flex-col flex-grow">
            <div class="flex gap-4 mb-6">
              <Icon v-for="s in project.stack" :key="s" :icon="s" class="text-xl md:text-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 class="text-2xl md:text-4xl font-black uppercase italic mb-4 tracking-tight group-hover:text-emerald-500 transition-colors">{{ project.title }}</h3>
            <p class="text-stone-400 text-sm leading-relaxed mb-10 flex-grow">{{ project.desc }}</p>

            <div class="flex gap-4">
              <a :href="project.link" target="_blank" class="flex-1 text-center py-4 bg-white text-black text-[10px] font-black uppercase rounded-2xl hover:bg-emerald-500 hover:text-white transition-all">Live Case</a>
              <a :href="project.git" target="_blank" class="px-8 py-4 border border-white/10 text-[10px] font-black uppercase rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
                <Icon icon="mdi:github" class="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">Let's <br/> <span class="text-emerald-500">Connect.</span></h2>
          <p class="text-stone-500 mt-8 max-w-md font-medium text-lg">Have a project in mind or looking for a full-stack engineer? My inbox is always open.</p>

          <div class="mt-16 space-y-12">
            <div class="flex flex-col gap-2">
              <span class="text-[10px] uppercase font-black tracking-widest text-stone-600">Drop a line</span>
              <a href="mailto:akinpeluoluwatayo1235@gmail.com" class="text-2xl md:text-4xl font-black italic hover:text-emerald-500 transition-colors tracking-tight">hello@oluwatayo.dev</a>
            </div>
            <div class="flex flex-wrap gap-4">
              <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all">
                {{ social.name }}
              </a>
            </div>
          </div>
        </div>

        <div class="bg-stone-900/30 p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-md">
          <form ref="contactForm" @submit.prevent="sendEmail" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" required type="text" class="w-full bg-stone-950/50 border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white" placeholder="Your Name" />
              <input name="title" required type="text" class="w-full bg-stone-950/50 border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white" placeholder="Project Type" />
            </div>
            <input name="email" required type="email" class="w-full bg-stone-950/50 border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white" placeholder="email@example.com" />
            <textarea name="message" required rows="4" class="w-full bg-stone-950/50 border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white resize-none" placeholder="Briefly describe your goals..."></textarea>
            <button :disabled="isSending" type="submit" class="w-full py-5 bg-emerald-500 text-black font-black uppercase italic rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-50">
              <span>{{ sendStatus }}</span>
              <Icon v-if="!isSending" icon="solar:arrow-right-up-bold" class="text-lg" />
              <Icon v-else icon="line-md:loading-twotone-loop" class="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </section>

    <footer class="h-[20vh] border-t border-white/5 flex items-center justify-center">
      <p class="text-stone-600 font-mono text-[10px] uppercase tracking-widest text-center px-6 italic">© 2026 Crafted by Akinpelu Oluwatayo — Built with Vue & GSAP</p>
    </footer>
  </main>
</template>

<style scoped>
@keyframes visualizer { 0%, 100% { height: 2px; } 50% { height: 12px; } }
.animate-visualizer { animation: visualizer 0.8s ease-in-out infinite; }
</style>