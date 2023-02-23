<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-200 w-full grow py-6 px-6">
      <h1>Current League: {{ uiStore.currentLeague?.name }}</h1>
    </div>
    <div class="bg-slate-200 w-full grow pb-12">
      <button class="button-small-base" @click="login">Login</button>
      <button class="button-small-base" @click="getGames">Get games</button>
      <button class="button-small-base" @click="getLeague">Get league</button>
      <button class="button-small-base" @click="getTeams">Get roster</button>
      <NuxtLink to="/league/moves-like-jagr"> Moves Like Jagr page </NuxtLink>
      <NuxtLink to="/league/moves-like-jagr/team/hintz-for-kids">
        Hintz for kids page
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "../stores/leagueStore";
import { useTeamStore } from "../stores/teamStore";
import { useUiStore } from "../stores/uiStore";
import { useUserStore } from "../stores/userStore";

const leagueStore = useLeagueStore();
const teamStore = useTeamStore();
const uiStore = useUiStore();
const userStore = useUserStore();

const { login, getGames } = userStore;
const { getLeague } = leagueStore;
const { getTeams } = teamStore;

onMounted(() => {
  if (userStore.games) {
    uiStore.setCurrentLeague(userStore.games[0]);
  }
});
</script>
