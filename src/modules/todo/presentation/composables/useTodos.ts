import { ref } from "vue";

import type { ITodo } from "../../domain/entities/todo.entity";
import type { CreateTodoDto } from "../../domain/dtos/create-todo.dto";
import type { UpdateTodoDto } from "../../domain/dtos/update-todo.dto";

import { createTodo } from "../../infrastructure/actions/create-todo.local";
import { updateTodo } from "../../infrastructure/actions/update-todo.local";
import { getTodos } from "../../infrastructure/actions/get-todos.local";
import { deleteTodo } from "../../infrastructure/actions/delete-todo.local";

export function useTodos() {
  const todos = ref<ITodo[]>([]);
  const isLoading = ref(false);

  async function loadTodos() {
    isLoading.value = true;
    todos.value = await getTodos();
    isLoading.value = false;
  }

  async function addTodo(input: CreateTodoDto) {
    const todo = await createTodo(input);
    todos.value.push(todo);
  }

  async function editTodo(input: UpdateTodoDto) {
    const updated = await updateTodo(input);
    const index = todos.value.findIndex((t) => t.id === updated.id);
    if (index !== -1) todos.value[index] = updated;
  }

  async function removeTodo(id: string) {
    await deleteTodo(id);
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  return {
    todos,
    isLoading,
    loadTodos,
    addTodo,
    editTodo,
    removeTodo,
  };
}
