<template>
  <div>
    <h1 class="text-center mt-4">Game List</h1>
    <GameList />
  </div>
</template>

<script>
import GameList from "../components/GameList.vue";

export default {
  name: "HomeView",
  components: { GameList },
};
</script>
