<template>
  <div class="flex flex-col grow bg-white min-h-fill">
    <h1>{{ team.name }}</h1>
    <div class="bg-slate-200 w-full grow pb-12">
      <TeamRoster :roster="team.roster" />
    </div>
  </div>
</template>

<script setup>
import { useLeagueStore } from "~/stores/leagueStore";
import { useTeamStore } from "~/stores/teamStore";
import { slugify } from "~/utils/slugify";

const route = useRoute();
const leagueStore = useLeagueStore();
const teamStore = useTeamStore();

const { getTeam } = teamStore;

const team = computed(() => teamStore.teamBySlug(route.params.teamSlug));

// Fetch team and add to teamStore
onMounted(async () => {
  const team_key = leagueStore.standings.find(
    (team) => slugify(team.name) === route.params.teamSlug
  ).team_key;
  await getTeam(team_key);
});
</script>
