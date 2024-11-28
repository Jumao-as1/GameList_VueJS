<template>
  <div class="container mt-4">
    <button class="btn btn-success mb-3" @click="navigateToAddGame">Add New Game</button>
    <table class="table table-striped">
      <thead class="table-primary">
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Release Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through games and display them -->
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.title }}</td>
          <td>{{ game.genre }}</td>
          <td>{{ game.releaseYear }}</td>
          <td>
            <button class="btn btn-warning me-2 text-white" @click="editGame(game.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteGame(game.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router"; // Import useRouter for navigation

export default {
  name: "GameList",
  setup() {
    const games = ref([]); // Array to hold games
    const gamesCollection = collection(db, "games"); // Reference to the Firestore collection
    const router = useRouter(); // Initialize Vue Router

    // Fetch games from Firestore
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(gamesCollection); // Get all documents in the collection
        games.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map Firestore docs to games array
        console.log("Fetched games:", games.value); // Check the fetched games in the console
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    // Delete a game from Firestore
    const deleteGame = async (id) => {
      try {
        await deleteDoc(doc(db, "games", id)); // Delete the game from Firestore by id
        fetchGames(); // Refresh the game list after deletion
      } catch (error) {
        console.error("Error deleting game:", error);
      }
    };

    // Navigate to the game form for editing
    const editGame = (id) => {
      router.push({ name: 'EditGame', params: { id } });  // Navigate to EditGame route
    };

    // Navigate to the add game form
    const navigateToAddGame = () => {
      router.push({ name: 'AddGame' });  // Navigate to AddGame route
    };

    // Fetch games when component is mounted
    onMounted(fetchGames);

    // Returning the data and methods so they are accessible in the template
    return { games, deleteGame, editGame, navigateToAddGame, fetchGames };
  },
};
</script>

<style scoped>
/* Optional styles */
</style>
