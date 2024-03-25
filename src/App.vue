<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="appContainer">
    <header class="sidebar">
        <nav class="links">
          <RouterLink to="/" class="mainLink"><h1>cihy.fun</h1></RouterLink>
          <RouterLink to="/xkcdProgress">xkcd progress</RouterLink>
        </nav>
    </header>
  
    <RouterView class="routerView" />
  </div>
</template>

<style scoped>
.appContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100vh;
  width: 100vw;
  padding: 0;
}

.sidebar {
  background-color: #222222;
  text-align: center;
  width: 15%;
  min-width: 150px;
}

.links {
  display: flex;
  flex-direction: column;
}

.mainLink {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.routerView {
  background-color: #333333;
  width: 85%;
}
</style>
