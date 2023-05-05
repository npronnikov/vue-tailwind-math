<template>
  <div class="flex h-screen flex-col">
   <Header/>
    <main class="app-data">
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
	.app-data {
		@apply p-5 w-full h-screen md:w-7/12 lg:w-6/12 md:mx-auto xl:w-5/12
	}
</style>
