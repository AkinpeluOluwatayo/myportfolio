<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const cursor = ref(null)
const follower = ref(null)

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    // Main dot
    gsap.to(cursor.value, { x: e.clientX, y: e.clientY, duration: 0 })
    // Delayed circle (The "Follower")
    gsap.to(follower.value, { x: e.clientX, y: e.clientY, duration: 0.3 })
  })
})
</script>

<template>
  <div ref="cursor" class="fixed top-0 left-0 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"></div>
  <div ref="follower" class="fixed top-0 left-0 w-10 h-10 border border-emerald-500/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-150"></div>
</template>