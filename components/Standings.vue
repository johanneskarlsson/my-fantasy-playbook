<template>
  <table>
    <thead>
      <tr>
        <th colspan="2">Team</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in standings" :key="team" class="h-8">
        <td><img :src="team.team_logos[0].url" class="w-8" /></td>
        <td>
          <NuxtLink
            :to="`/league/${slugify(props.league.name)}/team/${slugify(
              team.name
            )}`"
            >{{ team.name }}</NuxtLink
          >
        </td>
        <td>
          {{
            team.league_scoring_type == "point"
              ? team.standings.points_for
              : calculatePoints(
                  team.standings?.outcome_totals?.wins,
                  team.standings?.outcome_totals?.ties
                )
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { slugify } from "~/utils/slugify";

const props = defineProps({
  league: Object,
});
const standings = computed(() => props.league.standings || []);

function calculatePoints(wins, ties) {
  return parseInt(wins * 2) + parseInt(ties);
}
</script>
