<template>
  <section class="section flex flex-col items-center gap-3">
  <small>Current click</small>
  <h1 class="text-5xl font-medium">{{ count.count }}</h1>
  <div class="flex gap-4 mt-3">
    <button @click="count.click()" class="btn-count">Click++</button>
    <button @click="count.doubleClick()" class="btn-count">Click * 2</button>
  </div>
  </section>
</template>

<style scoped>
.btn-count {
  @apply px-3 py-1 bg-indigo-400 text-gray-50 rounded;
}
</style>
<script setup>
import { useCount } from '@/stores/counter'
// import { useRouter } from 'vue-router'
// import Pill from '@/components/Pill.vue'
import Footer from '@/components/Footer.vue'
import Game from "../components/Game.vue";
//
const count = useCount()
// const router = useRouter()
//
// const movePage = to => router.push({ name: to })
//
//


</script>
