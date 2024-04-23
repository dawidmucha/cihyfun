<script setup>
let progress
if(localStorage.getItem("xkcdTracker")) {
  progress = localStorage.getItem("xkcdTracker").split(',').shift()
} else {
  progress = []
}
</script>

<template>
  <div class="progressBoard">
    <div class="progressBoardItemContainer" @click.prevent="$emit('updateComic', i+1)" v-for="(progressItem, i) of progress" :key="progressItem">
      <span v-if="progressItem === ''" class="progress-item progress-item-unseen">{{ i+1 }}</span>
      <span v-else class="progress-item progress-item-seen">{{ i+1 }}</span>
    </div>
  </div>
</template>

<style scoped>
.progressBoard {
  font-size: 7px;
  display: grid;
  grid-template-columns: repeat(10, 1.7rem);
}

.progress-item {
  text-align: center;
  display: block;
  width: 100%;
  background-color: grey;
  padding: 0.1rem;
  margin: 0px;
  font-size: 0.7rem;
}

.progress-item-seen {
  background-color: green;
}

.progress-item-unseen {
  background-color: red;
}
</style>