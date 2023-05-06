<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="display">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" :class="{'bg-purple-100': type=='error', 'bg-green-100': type=='info' }">
                <i class="fa fa-warning text-red-400" v-show="type=='error'"></i>
                <i class="fa fa-check text-green-500" v-show="type=='info'"></i>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{ title }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{message}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" @click="$emit('close')"  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Понятно</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();
})
</script>

<script>
export default {
  props: {
    display: {
      required: true,
      type: Boolean
    },
    title: {
      required: true,
      type: String
    },
    message: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'info'
    },
  }
}
</script>
