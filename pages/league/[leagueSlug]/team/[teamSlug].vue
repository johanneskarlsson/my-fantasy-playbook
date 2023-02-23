<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <h1>{{ team.name }}</h1>
    <div class="bg-slate-200 w-full grow pb-12">
      <Roster :team="team" />
    </div>
  </div>
</template>

<script setup>
import { useTeamStore } from "~/stores/teamStore";

const teamStore = useTeamStore();

const route = useRoute();

const team = computed(() => teamStore.teamBySlug(route.params.teamSlug));
</script>
