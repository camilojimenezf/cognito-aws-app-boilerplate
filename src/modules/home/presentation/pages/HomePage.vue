<template>
  <div>
    <h1 class="text-3xl font-bold">Home</h1>
    <p>{{ authStore.authUser?.email }}</p>
    <button
      @click="signOut"
      class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
    >
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "../../../auth/presentation/composables/useAuth";
import { useAuthStore } from "../../../auth/presentation/stores/auth.store";

const { signOut } = useAuth();
const authStore = useAuthStore();
</script>

<style scoped></style>
