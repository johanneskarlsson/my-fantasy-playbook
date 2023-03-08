<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-200 w-full grow py-6 px-6">
      <h1>Current League: {{ uiStore.currentLeague?.name }}</h1>
    </div>
    <div class="bg-slate-200 w-full grow pb-12">
      <NuxtLink to="/league/moves-like-jagr"> Moves Like Jagr page </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "../stores/leagueStore";
import { usePlayerStore } from "../stores/playerStore";
import { useTeamStore } from "../stores/teamStore";
import { useUiStore } from "../stores/uiStore";
import { useUserStore } from "../stores/userStore";

const leagueStore = useLeagueStore();
const playerStore = usePlayerStore();
const teamStore = useTeamStore();
const uiStore = useUiStore();
const userStore = useUserStore();

const { getGames } = userStore;
const { getLeague } = leagueStore;
const { getPlayers } = playerStore;

onMounted(async () => {
  if (userStore.games) {
    uiStore.setCurrentLeague(userStore.games[0]);
  }
  // fetch Yahoo data if logged in
  await getGames();
  await getLeague();
  await getPlayers();
});
</script>
