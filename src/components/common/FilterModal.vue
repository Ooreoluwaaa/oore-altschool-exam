<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Filter Todos</h2>
      
      <div class="space-y-3">
        <label class="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="filter" 
            value="all" 
            v-model="localStatus"
            class="w-4 h-4"
            aria-label="Show all todos"
          />
          <span class="ml-3">All Todos</span>
        </label>
        
        <label class="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="filter" 
            value="completed" 
            v-model="localStatus"
            class="w-4 h-4"
            aria-label="Show completed todos"
          />
          <span class="ml-3">Completed</span>
        </label>
        
        <label class="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="filter" 
            value="incomplete" 
            v-model="localStatus"
            class="w-4 h-4"
            aria-label="Show incomplete todos"
          />
          <span class="ml-3">Incomplete</span>
        </label>
      </div>

      <div class="flex gap-3 mt-6">
        <button 
          @click="applyFilter"
          class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Apply filter"
        >
          Apply
        </button>
        <button 
          @click="closeModal"
          class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          aria-label="Close filter modal"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isOpen: boolean
  currentStatus: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  apply: [status: string]
}>()

const localStatus = ref('all')

// <CHANGE> Watch for isOpen changes to sync localStatus with currentStatus
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    localStatus.value = props.currentStatus
  }
})

const applyFilter = () => {
  emit('apply', localStatus.value)
  emit('close')
}

const closeModal = () => {
  emit('close')
}
</script>