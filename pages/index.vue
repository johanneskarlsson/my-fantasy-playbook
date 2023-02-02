<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
      <AppHeader />
    </div>
    <div class="bg-slate-200 w-full grow py-6 px-6">
      <h1>Current League: {{ uiStore.currentLeague?.name }}</h1>
    </div>
    <div class="bg-slate-200 w-full grow pb-12">
      <button class="button-small-base" @click="login">Login</button>
      <button class="button-small-base" @click="getGames">Get games</button>
      <button class="button-small-base" @click="getLeague">Get league</button>
      <button class="button-small-base" @click="getRoster">Get roster</button>
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

const login = () => {
  userStore.login();
};

const getGames = () => {
  userStore.getGames();
};

const getLeague = () => {
  leagueStore.getLeague();
  console.log(leagueStore.leagues);
  console.log(leagueStore.standings);
};

const getRoster = () => {
  teamStore.getRoster("419.l.17177.t.7");
  console.log(teamStore.Roster);
};

onMounted(() => {
  if (userStore.leagues) {
    uiStore.setCurrentLeague(userStore.leagues[0]);

    console.log(uiStore.currentLeague);
  }
});
</script>
