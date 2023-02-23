<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <h1>{{ league.name }}</h1>
    <div class="bg-slate-200 w-full grow pb-12">
      <Standings :league="league" />
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "~/stores/leagueStore";

const leagueStore = useLeagueStore();

const route = useRoute();

const league = computed(() =>
  leagueStore.leagueBySlug(route.params.leagueSlug)
);
</script>
