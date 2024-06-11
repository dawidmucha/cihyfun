<script setup>
import { ref, onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore'

const store = useXkcdStore()

const gotoComic = ref(null)

onMounted(() => {
  store.updateLocalStorage()
})

const onBtnPress = (option) => {
  const _gotoComic = gotoComic.value
  gotoComic.value = null

  switch(option) {
    case -2:
      store.getComic(1)
      break
    case -1:
      if(store.num > 1) store.getComic(store.num - 1)
      break
    case 0:
      store.getComic(_gotoComic)
      break
    case 1:
      if(store.num < store.numMax) store.getComic(store.num + 1)
      break
    case 2:
      store.getComic(store.numMax)
      break
    default:
      console.error("onBtnPress value outside <-2, 2> range")
  }
}
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
    <div>
      <button @click="onBtnPress(-2)">&lt;&lt;</button>
      <button @click="onBtnPress(-1)">&lt;</button>
      <span style="margin: 10px" />
      <input type="range" min="1" :max="store.numMax" v-model="store.num" @change="store.getComic(store.num)" /> {{ store.num }}/{{ store.numMax }}
      <input type="text" v-model="gotoComic" placeholder="comic number" />
      <button @click="onBtnPress(0)">SEND</button>
      <span style="margin: 10px" />
      <button @click="onBtnPress(1)">&gt;</button>
      <button @click="onBtnPress(2)">&gt;&gt;</button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
