<template>
  <div class="overflow-x-hidden">
    <div
      class="relative min-h-fill flex flex-col justify-center overflow-y-auto h-auto"
    >
      <div class="bg-slate-300 w-full flex shrink-0 flex-col items-center">
        <header
          class="pr-1 pl-4 xs:px-4 h-[55px] w-full flex justify-between items-center text-center shadow shrink-0"
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
          <button class="button-small-base" @click="login()">Login</button>
        </header>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from "../stores/uiStore";
import { useUserStore } from "../stores/userStore";

const uiStore = useUiStore();
const userStore = useUserStore();

const { login } = userStore;

const selectedLeague = ref(null);
const setCurrentLeague = () => {
  uiStore.setCurrentLeague(selectedLeague.value);
};
</script>
