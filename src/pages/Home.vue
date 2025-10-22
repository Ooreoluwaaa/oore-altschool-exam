<template>
  <main class="min-h-screen bg-[#e9dccb] p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">TODO APP</h1>
          <p class="text-gray-600" aria-label="Pagination info">
            Showing {{ currentPageData.length }} of {{ allTodos.length }} tasks (Page {{ currentPage }} of {{ totalPages }})
          </p>
        </div>
        <button 
          @click="navigateToErrorTest"
          class="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
          aria-label="Test error boundary"
        >
          Test Error Boundary
        </button>
      </div>

      <!-- Search and Controls -->
      <div class="flex gap-4 mb-8">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search Address..."
          class="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search todos"
        />
        <button 
          @click="openFilterModal"
          class="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
          aria-label="Open filter menu"
        >
          ⚙️ Filter
        </button>
        <button 
          @click="openAddTodoModal"
          class="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
          aria-label="Add new todo"
        >
          ➕ Add Todo
        </button>
      </div>

      <!-- Todo Cards Grid -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-600">Loading todos...</p>
      </div>

      <div v-else-if="filteredTodos.length === 0" class="text-center py-12">
        <p class="text-gray-600">No todos found</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="(todo, index) in currentPageData" 
          :key="todo.id"
          class="bg-[#16243d] text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          role="article"
          :aria-label="`Todo ${index + 1}: ${todo.title}`"
        >
          <!-- Title -->
          <h3 class="text-lg font-semibold mb-4 line-clamp-2">{{ todo.title }}</h3>

          <!-- Number and Status -->
          <div class="flex items-end justify-between mb-4">
            <span class="text-5xl font-bold opacity-30">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</span>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-semibold',
                todo.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 text-white'
              ]"
              :aria-label="`Status: ${todo.completed ? 'Complete' : 'Incomplete'}`"
            >
              {{ todo.completed ? 'Complete' : 'Incomplete' }}
            </span>
          </div>

          <!-- View Todo Button -->
          <div class="flex justify-end mb-4">
            <router-link 
              :to="`/todos/${todo.id}`"
              class="bg-white text-[#16243d] px-4 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-semibold"
              aria-label="View todo details"
            >
              View Todo
            </router-link>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button 
              @click="toggleTodo(todo.id)"
              class="flex-1 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
              :aria-label="`${todo.completed ? 'Mark incomplete' : 'Mark complete'}`"
            >
              ✏️ Edit
            </button>
            <button 
              @click="deleteTodoWithConfirm(todo.id)"
              class="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors text-sm"
              aria-label="Delete todo"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2">
        <button 
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          ← Previous
        </button>
        
        <div class="flex items-center gap-2">
          <span v-for="page in visiblePages" :key="page">
            <button 
              v-if="page === '...'"
              disabled
              class="px-2 py-2 text-gray-600"
            >
              ...
            </button>
            <button 
              v-else
              @click="goToPage(page as number)"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
              ]"
              :aria-label="`Go to page ${page}`"
              :aria-current="currentPage === page ? 'page' : undefined"
            >
              {{ page }}
            </button>
          </span>
        </div>

        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Modals -->
    <FilterModal 
      :isOpen="showFilterModal"
      :currentFilter="currentFilter"
      @close="showFilterModal = false"
      @filter="applyFilter"
    />

    <AddTodoModal 
      :isOpen="showAddTodoModal"
      @close="showAddTodoModal = false"
      @add="handleAddTodo"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodos } from '@/composables/useTodos'
import FilterModal from '@/components/common/FilterModal.vue'
import AddTodoModal from '@/components/common/AddTodoModal.vue'

const router = useRouter()
const { todos, loading, fetchTodos, deleteTodo, updateTodo, addTodo } = useTodos()

const searchQuery = ref('')
const currentFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const showFilterModal = ref(false)
const showAddTodoModal = ref(false)

onMounted(() => {
  fetchTodos()
})

const allTodos = computed(() => todos.value)

const filteredTodos = computed(() => {
  let filtered = allTodos.value

  // Apply search filter
  if (searchQuery.value) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Apply status filter
  if (currentFilter.value === 'completed') {
    filtered = filtered.filter(todo => todo.completed)
  } else if (currentFilter.value === 'incomplete') {
    filtered = filtered.filter(todo => !todo.completed)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / itemsPerPage))

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTodos.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (currentPage.value > 3) pages.push('...')
    
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (currentPage.value < totalPages.value - 2) pages.push('...')
    pages.push(totalPages.value)
  }

  return pages
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const toggleTodo = (id: number) => {
  const todo = allTodos.value.find(t => t.id === id)
  if (todo) {
    updateTodo(id, { ...todo, completed: !todo.completed })
  }
}

const deleteTodoWithConfirm = (id: number) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    deleteTodo(id)
  }
}

const openFilterModal = () => {
  showFilterModal.value = true
}

const applyFilter = (filter: string) => {
  currentFilter.value = filter
  currentPage.value = 1
}

const openAddTodoModal = () => {
  showAddTodoModal.value = true
}

const handleAddTodo = (newTodo: { title: string; description: string; completed: boolean }) => {
  addTodo(newTodo)
  currentPage.value = 1
}

const navigateToErrorTest = () => {
  router.push('/error-test')
}
</script>