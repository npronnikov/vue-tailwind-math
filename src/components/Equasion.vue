<template>
  <section class="section flex flex-col items-center gap-3">
  Сколько будет
  <h1 class="text-5xl font-medium">{{ left }} * {{ right }} = ?</h1>
  <div class="flex gap-4 mt-3">
    <button @click="verify(variants[0])" class="btn-variant">{{variants[0]}}</button>
    <button @click="verify(variants[1])" class="btn-variant">{{variants[1]}}</button>
    <button @click="verify(variants[2])" class="btn-variant">{{variants[2]}}</button>
    <button @click="verify(variants[3])" class="btn-variant">{{variants[3]}}</button>
    <button @click="verify(variants[4])" class="btn-variant">{{variants[4]}}</button>
  </div>
  </section>
</template>

<style scoped>
.section {
  @apply w-full bg-gray-50 py-8 px-5 rounded mb-8;
}

.btn-variant {
  /*@apply bg-indigo-400 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-50 rounded variant*/
  @apply px-4 py-4 bg-indigo-400 text-gray-50 rounded btn_width hover:bg-indigo-700;
}
.btn_width {
  min-width: 3.5em;
}
</style>
<script setup>
import { useCount } from '@/stores/counter'
const count = useCount()
const level = 9

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
