<script setup>
import { ref, onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore'

const store = useXkcdStore()

const gotoComic = ref(null)

onMounted(() => {
  store.updateLocalStorage()
})

const onBtnPress = (option) => {
  switch(option) {
    case -2:
      store.getComic(1)
      break
    case -1:
      if(store.num > 1) store.getComic(store.num - 1)
      break
    case 0:
      if(typeof gotoComic.value !== "number") {
        console.error(gotoComic.value, "is not a number")
        gotoComic.value = null
        break
      }
      if(gotoComic.value > store.numMax || gotoComic.value < 1) {
        console.error("value is outside range")
        gotoComic.value = null
        break
      }
      store.getComic(gotoComic.value)
      gotoComic.value = null
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
      <input type="text" v-model.number="gotoComic" placeholder="comic number" />
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
