<template>
  <table>
    <thead>
      <tr>
        <th>Player</th>
        <th>Positions</th>
        <th>Team</th>
        <th>Keeper</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in props.roster" :key="player" class="h-8">
        <td><img :src="player.image_url" class="w-8" /></td>
        <NuxtLink :to="`/players/${slugify(player.name.full)}`">{{
          player.name.full
        }}</NuxtLink>
        <td>
          {{ player.eligible_positions.join(", ") }}
        </td>
        <td>{{ player.editorial_team_abbr }}</td>
        <td>{{ player.is_keeper.kept ? "Yes" : "No" }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { slugify } from "~/utils/slugify";

const props = defineProps({
  roster: Object,
});
</script>
