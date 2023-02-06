<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
      <AppHeader />
    </div>
    <h1>{{ route.params.leagueSlug }}</h1>
    <div v-if="standings" class="bg-slate-200 w-full grow pb-12">
      Standings
      <Standings :league="currentLeague" :standings="standings" />
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "~/stores/leagueStore";
import { useUiStore } from "~/stores/uiStore";

const leagueStore = useLeagueStore();
const uiStore = useUiStore();

const route = useRoute();

const { currentLeague } = storeToRefs(uiStore);
const { standings } = storeToRefs(leagueStore);

console.log("league page");
</script>
