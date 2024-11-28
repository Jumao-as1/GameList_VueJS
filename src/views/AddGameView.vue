<template>
  <div class="container mt-4">
    <h1 class="text-center">{{ isEditing ? "Edit Game" : "Add New Game" }}</h1>
    <GameForm :gameId="gameId" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import GameForm from "../components/GameForm.vue";
import { useRoute } from "vue-router";

export default {
  name: "AddGameView",
  components: { GameForm },
  setup() {
    const route = useRoute();
    const gameId = ref(null); // Will hold the ID of the game being edited
    const isEditing = ref(false);

    onMounted(() => {
      // Check if there's a game ID in the route params
      if (route.params.id) {
        gameId.value = route.params.id;
        isEditing.value = true;
      }
    });

    return { gameId, isEditing };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
