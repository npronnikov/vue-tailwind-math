<template>
		<section class="section">
			<p class="mb-5 text-justify text-slate-800">
        <b>Умножарик</b> - это простая игра для тренировки таблицы умножения.
        Правила простые: выбирайте уровень сложности, нажимайте на кнопку старт и выбирайте правильный вариант ответа.
			</p>
			<a href="/game" class="bg-gray-600 hover:bg-opacity-75 focus:ring-2 text-gray-50 px-5 py-2 rounded-lg inline-block">
				<i class="fab fa-game"></i>
				<span class="mx-2">Погнали!</span>
			</a>
		</section>
</template>

<script setup>
	// import { useCount } from '@/stores/counter'
	// import { useRouter } from 'vue-router'
	// import Pill from '@/components/Pill.vue'
	// import Footer from '@/components/Footer.vue'
  // import Game from "../components/Game.vue";
  //
	// const count = useCount()
	// const router = useRouter()
  //
	// const movePage = to => router.push({ name: to })
  //
	//


</script>

<style scoped>
	.section {
		@apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
	}

</style>
