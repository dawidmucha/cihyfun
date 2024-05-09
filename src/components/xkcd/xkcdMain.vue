<script setup>
import { onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore'

const store = useXkcdStore()

onMounted(() => {
  store.updateLocalStorage()
})
</script>

<template>
  <main id="xkcdMain">
    xkcdMain
    <div> <!-- pinia store debug -->
      <b>store:</b>
      <ul>
        <li>day: {{ store.day }}</li>
        <li>month: {{ store.month }}</li>
        <li>year: {{ store.year }}</li>
        <li>title: {{ store.title }}</li>
        <li>img: {{ store.img }}</li>
        <li>alt: {{ store.alt }}</li>
        <li>num: {{ store.num }}</li>
        <li>numMax: {{ store.numMax }}</li>
        <li>size: {{ store.size }}</li>
        <li>filter: {{ store.filter }}</li>
        <li>settingsCurrent: {{ store.settingsCurrent }}</li>
        <li @click="store.markAsSeen(store.num)">mark as seen</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
