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
      <a :href="'https://xkcd.com/'+store.num+'/'" target="_blank"><img id="image" :src="store.img" /></a>
    </div>

    <div id="comicNavContainer">
      
      <div id="comicNavTitle">{{ store.title }}</div>

      <div id="comicNavUpper">
        <button @click="onBtnPress(-2)">&lt;&lt;</button>
        <button @click="onBtnPress(-1)">&lt;</button>
        
        <div id="comicNavUpperCenter">
          <input id="comicRange" type="range" min="1" :max="store.numMax" v-model="store.num" @change="store.getComic(store.num)" /> 
          <label for="comicRange">{{ store.num }}/{{ store.numMax }}</label>
        </div>

        <button @click="onBtnPress(1)">&gt;</button>
        <button @click="onBtnPress(2)">&gt;&gt;</button>
      </div>

      <div id="comicNavLower">
        <div>  
          <input type="text" v-model="gotoComic" placeholder="comic nr" />
          <button @click="onBtnPress(0)">SEND</button>
        </div>

        <button @click="store.markAsSeen(store.num)">mark as seen</button>
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

label {
  font-size: 1.3rem;
  padding-left: 1rem;
  position: relative;
  bottom: 3px;
}

#comicImageContainer {
  height: calc(100vh - (100vh - 100%));
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

#comicNavContainer {
  background: radial-gradient(
    ellipse at 50% 90%,
    rgba(0,0,0,0.7) 20%, 
    rgba(0,0,0,0) 70%
  );

  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#comicNavTitle {
  font-size: 2rem;
  text-shadow: black 2px 0 7px;
}

#comicNavUpper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

#comicNavUpperCenter {
  margin: 1rem 2rem;
}

#comicNavLower {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

input[type=text] {
  width: 6rem;
}

#image {
  margin: 0 auto;
}
</style>
