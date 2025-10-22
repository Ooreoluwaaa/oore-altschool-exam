<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Error Test Page</h1>
    <p class="mb-4">This page intentionally throws an error to test the error boundary.</p>
    <button 
      @click="throwError"
      class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      aria-label="Throw error"
    >
      Throw Error
    </button>
  </div>
</template>

<script setup lang="ts">
const throwError = () => {
  throw new Error('This is a test error from the Error Boundary!')
}
</script>