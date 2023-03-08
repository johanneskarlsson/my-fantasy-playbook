<template>
  <div class="flex flex-col rounded drop-shadow">
    <h1>{{ name }}</h1>
    <img :src="headshotUrl" class="w-20 px-2" />
  </div>
</template>

<script setup>
const props = defineProps({
  player: Object,
});

const name = computed(() => props.player.name.full);
const headshotUrl = computed(() => props.player.image_url);
const positions = computed(() => props.player.eligible_positions.join(", "));
const uniformNumber = computed(() => props.player.uniform_number);
const team = computed(() => props.player.editorial_team_full_name);
const owner = computed(() => props.player.ownership.owner_team_name);
const stats = computed(() =>
  props.player.stats.map((statistics) => {
    return {
      ...statistics,
      stats: statistics.stats.map((stat) => {
        if (stat.stat_id == 1) {
          return { stat: "G", value: stat.value };
        }
        if (stat.stat_id == 2) {
          return { stat: "A", value: stat.value };
        }
        if (stat.stat_id == 5) {
          return { stat: "PIM", value: stat.value };
        }
        if (stat.stat_id == 8) {
          return { stat: "PPP", value: stat.value };
        }
        if (stat.stat_id == 14) {
          return { stat: "SOG", value: stat.value };
        }
        if (stat.stat_id == 31) {
          return { stat: "HIT", value: stat.value };
        }
        if (stat.stat_id == 32) {
          return { stat: "BLK", value: stat.value };
        } else return stat;
      }),
    };
  })
);
console.log(owner);
</script>
