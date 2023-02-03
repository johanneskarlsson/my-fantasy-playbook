<template>
  <table>
    <thead>
      <tr>
        <th colspan="2">Team</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in props.standings" :key="team" class="h-8">
        <td><img :src="team.team_logos[0].url" class="w-8" /></td>
        <td>{{ team.name }}</td>
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
const props = defineProps({
  league: Object,
  standings: Object,
});

function calculatePoints(wins, ties) {
  return parseInt(wins * 2) + parseInt(ties);
}

watch(
  () => props.standings,
  (newValue) => {
    console.log(newValue);
  }
);
console.log(props.standings);
</script>
