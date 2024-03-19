<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="appContainer">
    <header>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/xkcdProgress">xkcd progress</RouterLink>
        </nav>
    </header>
  
    <RouterView class="routerView" />
  </div>
</template>

<style scoped>
.appContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90vh;

}

/* header, .routerView {
  background-color: blue;
} */

.routerView {
  flex-grow: 2;
}
</style>
