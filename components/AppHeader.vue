<template>
  <header
    class="pr-1 pl-4 xs:px-4 h-[55px] w-full flex items-center text-center shadow shrink-0"
  >
    <select @change="setCurrentLeague()" v-model="selectedLeague">
      <option
        v-for="game in userStore.games"
        :key="game.league_id"
        :value="game"
      >
        {{ game.name }}
      </option>
    </select>
  </header>
</template>

<script setup>
import { useUiStore } from "../stores/uiStore";
import { useUserStore } from "../stores/userStore";

const uiStore = useUiStore();
const userStore = useUserStore();

const selectedLeague = ref(null);

const setCurrentLeague = () => {
  uiStore.setCurrentLeague(selectedLeague.value);
};
</script>
