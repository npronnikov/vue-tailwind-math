<template>
<!--  Уровень {{level.difficulty}}-->
  <section class="section flex flex-col items-center gap-3">
    <div class="text-left">Уровень {{level.difficulty}}</div>
<!--    <h1 class="text-2xl font-thin">{{smartTime(timer.minutes)}}:{{smartTime(timer.seconds)}}</h1>-->
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-6 md:col-span-6 text-center">
          <h1 class="text-6xl text-green-400"><i class="fa fa-smile-o"></i></h1>
          <h1 class="text-3xl text-green-800 font-medium mt-3">{{count.correctAnswers}}</h1>
        </div>
        <div class="col-span-6 md:col-span-6 text-center">
          <h1 class="text-6xl text-red-400"><i class="fa fa-frown-o"></i></h1>
          <h1 class="text-3xl text-red-800 font-medium mt-3">{{count.incorrectAnswers}}</h1>
        </div>
      </div>
    </div>
    <button type="button" @click="reset" class="btn_count">Сброс</button>
  </section>
</template>

<style scoped>
.section {
  @apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
}
.btn_count {
  @apply px-4 py-4 bg-indigo-400 text-gray-50 rounded  hover:bg-indigo-700;
}
</style>
<script setup>

import { useCount } from '../stores/counter'
import { useLevel } from "../stores/level";

const count = useCount()
const level = useLevel()

</script>
