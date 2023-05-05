<template>
  <section class="section flex flex-col items-center gap-3">
  сколько будет
  <h1 class="text-5xl font-medium">{{ left }} * {{ right }} = ?</h1>
  <div class="flex gap-4 mt-3">
    <button @click="verify(variants[0])" class="btn-count">{{variants[0]}}</button>
    <button @click="verify(variants[1])" class="btn-count">{{variants[1]}}</button>
    <button @click="verify(variants[2])" class="btn-count">{{variants[2]}}</button>
    <button @click="verify(variants[3])" class="btn-count">{{variants[3]}}</button>
    <button @click="verify(variants[4])" class="btn-count">{{variants[4]}}</button>
  </div>
    <Modal/>
  </section>
</template>

<style scoped>
.section {
  @apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
}

.btn-count {
  @apply px-4 py-4 bg-indigo-400 text-gray-50 rounded variant;
}
.variant {
  min-width: 3.5em;
}
</style>
<script setup>
import { useCount } from '@/stores/counter'
import Modal from "./Modal.vue";
// import { useRouter } from 'vue-router'

const count = useCount()
const level = 9
// const router = useRouter()
// const movePage = to => router.push({ name: to })

</script>

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
      this.left = this.randomInt(this.level)
      this.right = this.randomInt(this.level)
      let correctAnswer = this.left * this.right
      let rightIndex = this.randomInt(6) - 1
      this.variants = this.randomize(6, correctAnswer)
      this.variants[rightIndex] = correctAnswer
    },
    randomize(length, correctAnswer) {
      let array = []
      while (array.length < length){
        let incorrectAnswer = this.randomInt(90)
        if(!array.includes(incorrectAnswer) && correctAnswer != incorrectAnswer){
          array.push(incorrectAnswer)
        }
      }
      return array;

    },
    verify(answer){
      if(answer == this.left * this.right){

      } else {

      }
      this.newExpression()
    }
  },
  mounted() {
    this.newExpression()
  }

}
</script>
