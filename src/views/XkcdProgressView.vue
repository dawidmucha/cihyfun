<script setup>
import ProgressVisualizer from '@/components/ProgressVisualizer.vue'
import { useXkcdProgressStore } from '@/stores/counter'

import { ref, onMounted } from 'vue'
import VueSlider from 'vue-3-slider-component'
// import 'vue-3-slider-component/theme/antd.css'

const store = useXkcdProgressStore()

let progress
if(localStorage.getItem("xkcdTracker")) {
  progress = localStorage.getItem("xkcdTracker").split(',').shift()
} else {
  progress = []
}
const comic = ref({})
const isSeen = ref(false)

// tmp
const lsArrayLength = ref(progress)

onMounted(async () => {
  await store.getLatestComicNumber()
  comic.value = await store.getComic(store.latestComicNumber)

  if(!localStorage.getItem("xkcdTracker")) { // if storage doesn't exist, create one
    localStorage.setItem("xkcdTracker", new Array(store.latestComicNumber-1))
  } else { // if storage exists
    if(lsArrayLength.value.length-1 != store.latestComicNumber) {
      console.log('different values', lsArrayLength.value.length-1, store.latestComicNumber)
      // TODO: finish a localStorage length correction
    }
  }
  
  lsArrayLength.value = store.latestComicNumber
  onComicChange()
})

const markAsSeen = () => {
  // for real time update
  progress[store.comic.num] = true

  // for backend update
  let xkcdTracker = localStorage.getItem('xkcdTracker').split(',')
  xkcdTracker[store.comic.num] = true
  localStorage.setItem('xkcdTracker', xkcdTracker)
}

const onComicChange = async () => {
  if(!store.comic.num) return

  await store.getComic(store.comic.num)
  isSeen.value = progress[store.comic.num] ? true : false

  if(isSeen.value === false) {
    setTimeout(() => {
      // a fucky wucky method to get the real time updates
      markAsSeen()
      isSeen.value = true
      onComicChange()
    }, 3000)
  }
}

const updateComic = (number) => {
  console.log('you clicked', number)
  store.comic.num = number
  onComicChange()
}
</script>

<template>
    <main>
      <div class="progress">
        <ProgressVisualizer @updateComic="(i) => updateComic(i)" />
      </div>
      <div v-if="store.getLatestComicNumber() !== null" class="mainframe">
        <h2>xkcd tracker</h2>
  
        <img :src="store.comic.img" alt="image of the current comic"/>

        <form>
          <div>
            <label for="isSeen">Mask as seen: </label>
            <input type="checkbox" id='isSeen' name='isSeen' v-model="isSeen" @change="(e) => markAsSeen(e)" /> <span style="opacity: 0.5">(will mark after 15s)</span>  
          </div>

          <div>
            <label for="comicNumber">{{ store.comic.num }}/{{ store.latestComicNumber }}</label>
            <vue-slider id="comicNumber" v-model="store.comic.num" :max='store.latestComicNumber-1' @change="onComicChange()"></vue-slider>
          </div>

          <div>
            <button @click.prevent="updateComic(1)">&lt;&lt;</button>
            <button @click.prevent="updateComic(store.comic.num - 1)">&lt;</button>
            <button @click.prevent="updateComic(store.comic.num + 1)">&gt;</button>
            <button @click.prevent="updateComic(store.latestComicNumber)">&gt;&gt;</button>     
          </div>
        </form>
      </div>
    </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}

.progress {
  width: 18.55rem;
  height: 100vh;
  overflow-y: scroll;
}

.mainframe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
