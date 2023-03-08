<template>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th colspan="2">Team</th>
        <th>Points</th>
        <th>Points Change</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in props.standings" :key="team" class="h-8">
        <td>{{ team.standings.rank }}</td>
        <td><img :src="team.team_logos[0].url" class="w-8" /></td>
        <td>
          <NuxtLink
            :to="`/league/${slugify(props.meta.name)}/team/${slugify(
              team.name
            )}`"
            >{{ team.name }}</NuxtLink
          >
        </td>
        <td>
          {{ team.standings.points_for }}
        </td>
        <td>{{ team.standings.points_change }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  meta: Object,
  standings: Object,
});
</script>
