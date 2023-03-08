<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-200 w-full grow pb-12">
      <LeagueStandings :meta="meta" :standings="standings" />
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "~/stores/leagueStore";

const leagueStore = useLeagueStore();

const route = useRoute();

const meta = computed(() => leagueStore.meta);
const standings = computed(() => leagueStore.standings);
</script>
