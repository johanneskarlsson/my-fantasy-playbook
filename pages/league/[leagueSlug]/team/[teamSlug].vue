<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
      <AppHeader />
    </div>
    <h1>{{ teamName?.value?.name }}</h1>
  </div>
</template>

<script setup>
import { useTeamStore } from "~/stores/teamStore";
const route = useRoute();
const teamStore = useTeamStore();
const teamName = computed(() => teamStore.teamBySlug(route.params.teamSlug));
console.log(teamName.value.name);
</script>
