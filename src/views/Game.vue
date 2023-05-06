<template>
	<span>
    <BackBtn />
    <Equasion/>
    <Count/>
    <Modal :display="modal.show" title="Уровень пройден" type="info" :message="'Поздравляю, уровень пройден. Затраченное время ' + smartTime(timer.minutes) + ' : ' + smartTime(timer.seconds)" @close="modal.show = false"/>
  </span>
</template>
<script setup>
  import Modal from "../components/Modal.vue";
	import Count from '../components/Count.vue'
	import Equasion from '../components/Equasion.vue'
	import BackBtn from '../components/BackBtn.vue'
  import { reactive } from "vue";
  import {useLevel} from "../stores/level";
  import { useRouter } from 'vue-router'
  import { useCount } from '../stores/counter'

  const router = useRouter()
  const timer = reactive({seconds:0, minutes:0, func: undefined})
  const modal = reactive({show: false})

  const count = useCount()
  const level = useLevel()


  function startTimer(){
    timer.func = setInterval(()=>{
      timer.seconds ++
      if(timer.seconds == 60){
        timer.seconds = 0
        timer.minutes ++
      }
      console.log((count.correctAnswers - count.incorrectAnswers) + ' vs ' + level.tries)
      if( (count.correctAnswers - count.incorrectAnswers) >= level.tries) {
        clearInterval(timer.func)
        modal.show = true
      }
    }, 1000)
  }
  function stopTimer(){
    timer.minutes = 0
    timer.seconds = 0
    clearInterval(timer.func)
  }

  function reset(){
    count.reset()
    stopTimer()
    startTimer()
  }

  function smartTime(time) {
    return time < 10 ? "0" + time.toString().trim() : time;
  }


  function checkLevel(){
    if(level.difficulty == 0) {
      router.push({path:'/'})
      return false
    } return true
  }
  if(checkLevel()){
    startTimer()
  }

</script>
