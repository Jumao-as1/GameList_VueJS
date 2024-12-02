<template>
  <div class="container mt-4">
    <h1>{{ isEditing ? "Edit Game" : "Add New Game" }}</h1>
    <form @submit.prevent="saveGame">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="game.title" type="text" id="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="genre" class="form-label">Genre</label>
        <input v-model="game.genre" type="text" id="genre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="releaseYear" class="form-label">Release Year</label>
        <input v-model="game.releaseYear" type="number" id="releaseYear" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? "Update" : "Save" }}</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  name: "GameForm",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const game = ref({
      title: localStorage.getItem("game_title") || "",
      genre: localStorage.getItem("game_genre") || "",
      releaseYear: localStorage.getItem("game_releaseYear") || "",
    });
    const isEditing = ref(false); // Flag to check if we're editing a game

    // Watch the game object and persist changes to localStorage
    watch(
      game,
      (newGame) => {
        localStorage.setItem("game_title", newGame.title);
        localStorage.setItem("game_genre", newGame.genre);
        localStorage.setItem("game_releaseYear", newGame.releaseYear);
      },
      { deep: true }
    );

    // Fetch game details for editing
    const fetchGame = async (id) => {
      try {
        const docRef = doc(db, "games", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          game.value = docSnap.data(); // Populate form with game data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    // Save or update game
    const saveGame = async () => {
      const gameRef = doc(db, "games", isEditing.value ? route.params.id : new Date().toISOString());
      try {
        await setDoc(gameRef, game.value);

        // Clear localStorage after successful save
        localStorage.removeItem("game_title");
        localStorage.removeItem("game_genre");
        localStorage.removeItem("game_releaseYear");

        router.push('/games'); // Navigate back to the game list
      } catch (error) {
        console.error("Error saving game:", error);
      }
    };

    // Check if we are editing an existing game
    onMounted(() => {
      if (route.params.id) {
        isEditing.value = true;
        fetchGame(route.params.id);
      }
    });

    return { game, saveGame, isEditing };
  },
};
</script>
