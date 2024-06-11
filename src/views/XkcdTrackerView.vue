<script setup>
import XkcdMap from '@/components/xkcd/xkcdMap.vue'
import XkcdMain from '@/components/xkcd/xkcdMain.vue'
</script>

<template>
    <main id="xkcdTrackerView">
      <XkcdMap id="map" />
      <XkcdMain id="main" />
    </main>
</template>

<style scoped>
#xkcdTrackerView {
  display: flex;
  flex-direction: row;
}

#map { 
  width: 281px;
  flex-shrink: 0;
  background-color: #666;
}

#main {
  flex-grow: 1;
  background-color: #888;
}
</style>