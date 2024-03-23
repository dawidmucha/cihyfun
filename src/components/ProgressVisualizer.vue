<script setup>
const progress = localStorage.getItem("xkcdTracker").split(',')
</script>

<template>
  heeekki
  <div class="progressBoard">
    <div v-for="(progressItem, i) of progress" :key="progressItem">
      <span v-if="progressItem === ''" class="progress-item progress-item-unseen">{{ i+1 }}</span>
      <span v-else class="progress-item progress-item-seen">{{ i+1 }}</span>
    </div>
  </div>
</template>

<style scoped>
.progressBoard {
  font-size: 7px;
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
}

.progress-item {
  background-color: grey;
  width: 15px;
  height: 15px;
  padding: 0.2rem;
}

.progress-item-seen {
  background-color: green;
}

.progress-item-unseen {
  background-color: red;
}
</style>