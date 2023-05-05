import { defineStore } from 'pinia'

export const useLevel = defineStore('level', {
	state: () => {
		return {
			difficulty: 0,
			options: 6
		}
	},
	actions: {
		setDifficulty(d) {
			this.difficulty = d
		}
	}
})
