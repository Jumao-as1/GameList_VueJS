<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Game List brand -->
      <a class="navbar-brand" href="/">Game List</a>

      <!-- Toggle button for mobile screens -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- Home link -->
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Games</router-link>
          </li>

          <!-- Add New Game link -->
          <li class="nav-item">
            <router-link class="nav-link" to="/add-game">Add New Game</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Navbar styling adjustments for large screens */
.navbar {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 1.25rem;  /* Larger font size on bigger screens */
}

/* Navbar links adjustments */
.navbar-nav .nav-link {
  font-size: 1.1rem;
  padding-left: 25px;
  padding-right: 25px;
}

/* Responsive adjustments for medium screens */
@media (max-width: 991px) {
  .navbar-nav {
    text-align: center;
    width: 100%;
  }

  .navbar-nav .nav-item {
    margin: 8px 0;
  }
}

/* Extra small screen adjustments */
@media (max-width: 767px) {
  .navbar-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navbar-toggler {
    margin-right: 15px;
  }

  .navbar-brand {
    font-size: 1.75rem;
  }

  .navbar-nav .nav-link {
    font-size: 1.2rem;
    padding: 15px 20px;
  }
}
</style>
