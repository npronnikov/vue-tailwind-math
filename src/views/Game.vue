<template>
	<span>
    <BackBtn />
    <Equasion/>
    <Count/>
  </span>
</template>
<script setup>
	import Count from '../components/Count.vue'
	import Equasion from '../components/Equasion.vue'
	import BackBtn from '../components/BackBtn.vue'
  import { useRouter } from 'vue-router'
  import {useLevel} from "../stores/level";

  const router = useRouter()
  const level = useLevel()
  // init script
  if(level.difficulty == 0)
    router.push({path:'/'})

</script>
