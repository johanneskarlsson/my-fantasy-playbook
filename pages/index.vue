<template>
  <h1>My Fantasy Playbook</h1>
  <button @click="login">Login</button>
  <iframe src="/api/express/yahoo/league/standings" frameborder="0"></iframe>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const login = () => {
  userStore.login();
};
</script>
