<template>
  <div class="flex h-screen flex-col">
   <Header/>
    <main class="app">
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
  import Footer from './components/Footer.vue'
  import Header from "./components/Header.vue";
</script>

<style scoped>
	.app {
		@apply p-5 w-full h-screen md:w-6/12 lg:w-5/12 md:mx-auto xl:w-4/12
	}
</style>
