import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';  // Import the Home component
import GameForm from '../components/GameForm.vue';  // Import the GameForm component
import GameList from '@/components/GameList.vue';  // Import the GameList component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,  // Home component for the root path
  },
  {
    path: '/games',  // Game list route
    name: 'GameList',
    component: GameList,  // Show GameList component
  },
  {
    path: '/add-game',  // Add new game route
    name: 'AddGame',
    component: GameForm,  // Show GameForm component to add a game
  },
  {
    path: '/edit-game/:id',  // Edit game route
    name: 'EditGame',
    component: GameForm,  // Show GameForm component for editing a game
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
