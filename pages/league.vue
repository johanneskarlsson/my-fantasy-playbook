<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
      <AppHeader />
    </div>
    <div>
      Standings
      <Standings :standings="leagueStore.currentLeague.standings" />
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "../stores/leagueStore";

const leagueStore = useLeagueStore();
</script>
