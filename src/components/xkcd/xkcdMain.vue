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
    <!-- <div>
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
    </div> -->

    <div id="comicImageContainer">
      <img :src="store.img" />
    </div>

    <div id="comicNavContainer">
      
      <div>
        <button @click="onBtnPress(-2)">&lt;&lt;</button>
        <button @click="onBtnPress(-1)">&lt;</button>
        
        <input type="range" min="1" :max="store.numMax" v-model="store.num" @change="store.getComic(store.num)" /> {{ store.num }}/{{ store.numMax }}
        <button @click="onBtnPress(1)">&gt;</button>
        <button @click="onBtnPress(2)">&gt;&gt;</button>
      </div>

      <div>
        <input type="text" v-model="gotoComic" placeholder="comic number" />
        <button @click="onBtnPress(0)">SEND</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template: 80% 20% / 100%;
}

button, input[type=text] {
  padding: 0.5rem;
  font-size: 1.2rem;
  
}

#comicImageContainer {
  height: 100vh;
  overflow: auto;
}

#comicNavContainer {
  background: radial-gradient(
    ellipse at 50% 90%,
    rgba(0,0,0,0.7) 20%, 
    rgba(0,0,0,0) 70%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
