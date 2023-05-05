<script setup>
	import { useRouter } from 'vue-router'
	const router = useRouter()
</script>

<template>
  <div class="mb-3">
	<small @click="router.go(-1)" class="text-stone-500 cursor-pointer">
		<i class="fa fa-chevron-left"></i>
		 Взад к правилам
	</small>
    </div>
</template>
