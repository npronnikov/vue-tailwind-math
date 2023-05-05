<template>
  <section class="section">
    <p class="mb-5 text-justify text-slate-800">
      <b>Умножарик</b> - это простая игра для тренировки таблицы умножения.
      Правила простые: выбирайте уровень сложности, нажимайте на кнопку старт и выбирайте правильный вариант ответа.
    </p>
    <div class="text-center">
      <button v-for="i in 9" :key="i" class="btn_level" :class="{ btn_level_selected: i==level.difficulty }" @click="setLevel(i)">{{i}}</button>
    </div>
  </section>
  <div class="text-center">
    <button @click="start" class="btn_start">Старт!</button>
  </div>
  <Modal :display="modal.show" @close="modal.show = false"/>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useLevel } from "../stores/level";
  import { useRouter } from 'vue-router'
  import Modal from "../components/Modal.vue";
  const level = useLevel()
  const router = useRouter()
  const modal = reactive({show: false})
  function setLevel(l){
    level.difficulty = l
  }
  function start() {
    if(level.difficulty == 0){
      modal.show = true
    } else {
      router.push({path:'/game'})
    }
  }


</script>

<!--
<script>
export default {
  data(){
    return {
      showModal: false,
    }
  },
  methods: {
    setLevel(l){
      level.setDifficulty(l)
    },
    start() {
      if(this.level.difficulty == 0){
        this.showModal = true
      } else {
        this.router.push({path:'/game'})
      }
    }
  }
}
</script>
-->

<style scoped>
.section {
  @apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
}

.btn_level {
  @apply px-2 py-2 ml-1 bg-indigo-400 text-gray-50 rounded hover:bg-indigo-700; min-width: 2.5em;
}

.btn_level_selected {
  @apply bg-indigo-800
}
.btn_start {
  @apply w-72 h-72 rounded-full bg-indigo-400 hover:bg-indigo-700 text-white text-4xl;
}
</style>

