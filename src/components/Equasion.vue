<template>
  <section class="section flex flex-col items-center gap-3">
  Сколько будет
  <h1 class="text-5xl font-medium">{{ operands.left }} * {{ operands.right }} = ?</h1>
  <div class="flex gap-4 mt-3">
    <button v-for="(e, index) in answer.options" :key="index"
            @click="verify(e)" class="btn-variant">{{e}}</button>
  </div>
  </section>
  <Modal :display="modal.show" title="Уровень пройден" type="info" :message="'Поздравляю, уровень пройден. Затраченное время ' + smartTime(timer.minutes) + ' : ' + smartTime(timer.seconds)" @close="modal.show = false"/>
</template>

<style scoped>
.section {
  @apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
}

.btn-variant {
  /*@apply bg-indigo-400 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-50 rounded variant*/
  @apply px-2 py-2 bg-indigo-400 text-gray-50 rounded btn_width hover:bg-indigo-700 focus:bg-indigo-400 ;
}
.btn_width {
  min-width: 2.5em;
}
</style>
<script setup>
import Modal from "../components/Modal.vue";
import { useCount } from '../stores/counter'
import {useLevel} from "../stores/level";
import {reactive} from "vue";
const count = useCount()
const level = useLevel()
const operands = reactive({left: 0, right:0})
const answer = reactive({options:[]})
const timer = reactive({seconds:0, minutes:0, func: undefined})
const modal = reactive({show: false})

function randomInt(max) {
  return 1 + Math.floor(Math.random() * max);
}

function newExpression(){
  operands.left = randomInt(level.difficulty)
  operands.right = randomInt(9)
  if(operands.left ==1) operands.left ++ //escape 1 in equasion
  if(operands.right ==1) operands.right ++ //escape 1 in equasion
  let correctAnswer = operands.left * operands.right
  let rightIndex = randomInt(level.options) - 1
  answer.options = randomize(level.options, correctAnswer)
  answer.options[rightIndex] = correctAnswer
}
function randomize(length, correctAnswer) {
  let array = []
  while (array.length < length){
    let incorrectAnswer = level.difficulty > 0 ? randomInt(level.difficulty*10) : randomInt(90)
    if(!array.includes(incorrectAnswer) && correctAnswer != incorrectAnswer){
      array.push(incorrectAnswer)
    }
  }
  return array;
}

function startTimer(){
  timer.minutes = 0
  timer.seconds = 0
  timer.func = setInterval(()=>{
    timer.seconds ++
    if(timer.seconds == 60){
      timer.seconds = 0
      timer.minutes ++
    }
  }, 1000)
}
function stopTimer(){
  clearInterval(timer.func)
}

function smartTime(time) {
  return time < 10 ? "0" + time.toString().trim() : time;
}

function verify(answer){
  if(!timer.func) startTimer()
  if(answer == operands.left * operands.right){
    count.correctAnswer()
  } else {
    count.incorrectAnswer()
  }
  console.log((count.correctAnswers - count.incorrectAnswers) + ' vs ' + level.tries)
  if( (count.correctAnswers - count.incorrectAnswers) == level.tries) {
    stopTimer()
    modal.show = true
  }
  newExpression()
}


//init
newExpression()

</script>

<!--
<script>
export default {
  data() {
    return {
      left: undefined,
      right: undefined,
      variants: []
    }
  },
  methods: {
    randomInt(max) {
      return 1 + Math.floor(Math.random() * max);
    },
    newExpression(){
      this.left = this.randomInt(this.level.difficulty)
      this.right = this.randomInt(9)
      let correctAnswer = this.left * this.right
      // console.log('correct answer is ' + correctAnswer)
      let rightIndex = this.randomInt(this.level.options) - 1
      this.variants = this.randomize(this.level.options, correctAnswer)
      // console.log('set answer to index ' + rightIndex)
      this.variants[rightIndex] = correctAnswer
    },
    randomize(length, correctAnswer) {
      let array = []
      while (array.length < length){
        let incorrectAnswer = this.level.difficulty > 0 ? this.randomInt(this.level.difficulty*10) : this.randomInt(90)
        if(!array.includes(incorrectAnswer) && correctAnswer != incorrectAnswer){
          array.push(incorrectAnswer)
        }
      }
      return array;

    },
    verify(answer){
      if(answer == this.left * this.right){
        this.count.correctAnswer()
      } else {
        this.count.incorrectAnswer()
      }
      this.newExpression()
    }
  },
  mounted() {
    this.newExpression()
  }

}
</script>
-->
