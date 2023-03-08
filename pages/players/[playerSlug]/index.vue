<template>
  <PlayerBio :player="player" />
  <h1>{{ player.name.full }}</h1>
</template>

<script setup>
import { usePlayerStore } from "~/stores/playerStore";

const playerStore = usePlayerStore();

const route = useRoute();

const player = computed(() =>
  playerStore.playerBySlug(route.params.playerSlug)
);
console.log(playerStore.players);
console.log(player);
</script>
