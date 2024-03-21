<script setup>
import { useXkcdProgressStore } from '@/stores/counter'

import { ref, onMounted } from 'vue'

const store = useXkcdProgressStore()
const progress = localStorage.getItem("xkcdTracker").split(',')

const comic = ref({})
const isSeen = ref(false)

// tmp
const lsArrayLength = ref(localStorage.getItem("xkcdTracker").split(','))

onMounted(async () => {
  await store.getLatestComicNumber()
  comic.value = await store.getComic(store.latestComicNumber)

  if(!localStorage.getItem("xkcdTracker")) { // if storage doesn't exist, create one
    localStorage.setItem("xkcdTracker", new Array(store.latestComicNumber))
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
</script>

<template v-if="store.getLatestComicNumber() !== null">
    <main>
      xkcd progress view {{ store.comic.num || "?" }}/{{ store.latestComicNumber }} \\ local storage length: {{ lsArrayLength }}
      
      <img :src="store.comic.img" alt="image of the current comic"/>
      <!-- {{ store.comic }} -->

      <input type='range' min='1' :max='store.latestComicNumber' v-model="store.comic.num" @change="onComicChange()" />

      <div>
        <label for="isSeen">Mask as seen: </label>
        <input type="checkbox" id='isSeen' name='isSeen' v-model="isSeen" @change="(e) => markAsSeen(e)" /> <span style="opacity: 0.5">(will mark as seen after 15s)</span>  
      </div>

      <div>
        <div>Marked as seen: </div>
        <span v-for="(progressItem, i) in progress" :key="i">
          <span v-if="!!progressItem === true">{{ i }}, </span>
        </span>
      </div>
    </main>
</template>
