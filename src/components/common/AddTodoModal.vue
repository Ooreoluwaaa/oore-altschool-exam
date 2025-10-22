<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Add New Todo</h2>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium mb-1">Title</label>
          <input 
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Enter todo title"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Todo title"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium mb-1">Description</label>
          <textarea 
            id="description"
            v-model="formData.description"
            placeholder="Enter todo description"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            aria-label="Todo description"
          ></textarea>
        </div>

        <label class="flex items-center cursor-pointer">
          <input 
            v-model="formData.completed"
            type="checkbox"
            class="w-4 h-4"
            aria-label="Mark as completed"
          />
          <span class="ml-3">Mark as completed</span>
        </label>

        <div class="flex gap-3 mt-6">
          <button 
            type="submit"
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Add todo"
          >
            Add Todo
          </button>
          <button 
            type="button"
            @click="closeModal"
            class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            aria-label="Close add todo modal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [data: { title: string; description: string; completed: boolean }]
}>()

const formData = ref({
  title: '',
  description: '',
  completed: false
})

// <CHANGE> Reset form data when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    formData.value = { title: '', description: '', completed: false }
  }
})

const submitForm = () => {
  if (formData.value.title.trim()) {
    emit('submit', { ...formData.value })
    formData.value = { title: '', description: '', completed: false }
    emit('close')
  }
}

const closeModal = () => {
  formData.value = { title: '', description: '', completed: false }
  emit('close')
}
</script>