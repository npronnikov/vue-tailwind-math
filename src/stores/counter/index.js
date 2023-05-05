import { defineStore } from 'pinia'

export const useCount = defineStore('counter', {
	state: () => {
		return {
			correctAnswers: 0,
			incorrectAnswers: 0
		}
	},
	actions: {
		correctAnswer() {
			this.correctAnswers ++
		},
		incorrectAnswer() {
			this.incorrectAnswers ++
		},
		reset() {
			this.correctAnswers = 0
			this.incorrectAnswers = 0
		}
	}
})
