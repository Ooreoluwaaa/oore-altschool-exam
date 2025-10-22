<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="text-center">
      <AlertCircle class="w-24 h-24 text-destructive mx-auto mb-6" />
      <h1 class="text-4xl font-bold text-card-foreground mb-2">404</h1>
      <p class="text-xl text-muted-foreground mb-8">Page Not Found!</p>
      <RouterLink
        to="/"
        class="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Back Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { AlertCircle } from "lucide-vue-next";
</script>
