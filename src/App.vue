<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="relative min-h-screen bg-stone-950 text-stone-200 selection:bg-emerald-500/30 overflow-x-hidden">

    <div class="grain-overlay"></div>

    <div class="fixed -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="fixed -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-stone-800/20 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="relative z-10">
      <RouterView />
    </div>

  </div>
</template>

<style>
/* Global Typography for a "Designer" look */
h1, h2, h3, h4 {
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  font-style: italic;
  line-height: 0.9;
}

/* Buttery smooth transitions for all hover states */
* {
  transition-property: color, background-color, border-color, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>