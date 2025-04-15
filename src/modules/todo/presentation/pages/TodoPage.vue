<template>
  <section class="max-w-xl mx-auto mt-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
      📝 My Todo List
    </h1>

    <TodoForm class="mb-6" />

    <div v-if="isLoading" class="text-center text-gray-500">
      Loading todos...
    </div>

    <div v-else class="flex flex-col gap-4">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TodoForm from "../components/TodoForm.vue";
import TodoItem from "../components/TodoItem.vue";
import { useTodos } from "../composables/useTodos";

const { todos, isLoading, loadTodos } = useTodos();
loadTodos();
</script>
