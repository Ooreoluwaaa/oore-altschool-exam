<template>
  <div class="min-h-screen bg-background">
    <header class="bg-card border-b border-border">
      <div class="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
        <RouterLink to="/" class="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft class="w-6 h-6" />
        </RouterLink>
        <h1 class="text-3xl font-bold text-card-foreground">Todo Details</h1>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin">
          <Loader2 class="w-8 h-8 text-primary" />
        </div>
        <p class="mt-4 text-muted-foreground">Loading todo...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive">
        {{ error }}
      </div>

      <!-- Todo Details -->
      <div v-else-if="todo" class="bg-card border border-border rounded-lg p-8">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-start gap-4 flex-1">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo"
              class="mt-1 w-6 h-6 rounded border-input cursor-pointer"
            />
            <div class="flex-1">
              <h2
                class="text-2xl font-bold text-card-foreground"
                :class="{ 'line-through text-muted-foreground': todo.completed }"
              >
                {{ todo.title }}
              </h2>
              <p class="text-sm text-muted-foreground mt-2">ID: {{ todo.id }}</p>
            </div>
          </div>
          <button
            @click="deleteTodoAndGoBack"
            class="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
            title="Delete todo"
          >
            <Trash2 class="w-6 h-6" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-muted-foreground mb-2">
              Status
            </label>
            <span
              class="inline-block px-3 py-1 rounded-full text-sm font-medium"
              :class="
                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              "
            >
              {{ todo.completed ? "Completed" : "Pending" }}
            </span>
          </div>

          <div v-if="todo.description">
            <label class="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>
            <p class="text-card-foreground">{{ todo.description }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-muted-foreground mb-2">
              User ID
            </label>
            <p class="text-card-foreground">{{ todo.userId }}</p>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <AlertCircle class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p class="text-muted-foreground">Todo not found</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { ArrowLeft, Trash2, Loader2, AlertCircle } from "lucide-vue-next";
import { useTodos } from "@/composables/useTodos";
import type { Todo } from "@/types/todo";

const router = useRouter();
const route = useRoute();
const { loading, error, fetchTodoById, deleteTodo, updateTodo } = useTodos();

const todo = ref<Todo | null>(null);

onMounted(async () => {
  const id = parseInt(route.params.id as string);
  todo.value = await fetchTodoById(id);
});

const toggleTodo = async () => {
  if (todo.value) {
    const updated = await updateTodo(todo.value.id, {
      completed: !todo.value.completed,
    });
    if (updated) {
      todo.value = updated;
    }
  }
};

const deleteTodoAndGoBack = async () => {
  if (todo.value) {
    await deleteTodo(todo.value.id);
    router.push("/");
  }
};
</script>
