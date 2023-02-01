<template>
  <h1>My Fantasy Playbook</h1>
  <button @click="login">Login</button>
  <button @click="getLeague">Get league</button>
</template>

<script setup>
import { useLeagueStore } from "../stores/leagueStore";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const leagueStore = useLeagueStore();

const login = () => {
  userStore.login();
};

const getLeague = () => {
  leagueStore.getLeague();
  console.log(leagueStore.standings);
};
</script>
