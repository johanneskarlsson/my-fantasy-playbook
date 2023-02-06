<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
      <AppHeader />
    </div>
    <div class="bg-slate-200 w-full grow py-6 px-6">
      <h1>Current League: {{ currentLeague?.name }}</h1>
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
    <div v-if="standings" class="bg-slate-200 w-full grow pb-12">
      Standings
      <Standings :league="currentLeague" :standings="standings" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
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

const { currentLeague } = storeToRefs(uiStore);
const { standings } = storeToRefs(leagueStore);

onMounted(() => {
  if (userStore.leagues) {
    uiStore.setCurrentLeague(userStore.leagues[0]);

    console.log(currentLeague);
  }
});
</script>
