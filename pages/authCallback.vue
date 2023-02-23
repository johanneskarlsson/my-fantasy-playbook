<template>
  <div>Redirecting...</div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";

const route = useRoute();

const userStore = useUserStore();

onMounted(() => {
  const code = route.query.code;
  userStore.getTokens(code);
});
</script>
