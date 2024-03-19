<script setup>
import { useXkcdProgressStore } from '@/stores/counter'

import { ref, onMounted } from 'vue'

const store = useXkcdProgressStore()

const comic = ref({})
const isSeen = ref(false)

// tmp
const lsArrayLength = ref(0)

onMounted(async () => {
  await store.getLatestComicNumber()
  comic.value = store.getComic(store.latestComicNumber)

  if(!localStorage.getItem("xkcdTracker")) { // if storage doesn't exist, create one
    localStorage.setItem("xkcdTracker", new Array(store.latestComicNumber))
  } else { // if storage exists
    if(lsArrayLength.value != store.latestComicNumber) {
      const diff = store.latestComicNumber - lsArrayLength.value
      const diffArray = new Array(diff)
      localStorage.setItem('xkcdTracker', ...diffArray)
    }
  }
  
  lsArrayLength.value = store.latestComicNumber

  if(isSeen.value == false) {
    setTimeout(() => {
      if(isSeen.value == false) isSeen.value = true
    }, 1000)
  }
})

const markAsSeen = (e) => {
  // e.target.checked = true
  // const xkcdTracker = localStorage.getItem('xkcdTracker')
  // xkcdTracker[store.comic.num] = true
  // localStorage.setItem('xkcdTracker', xkcdTracker)
}
</script>

<template v-if="store.getLatestComicNumber() !== null">
    <main>
      xkcd progress view {{ store.comic.num || "?" }}/{{ store.latestComicNumber }} \\ local storage length: {{ lsArrayLength }}
      
      <img :src="store.comic.img" alt="image of the current comic"/>
      <!-- {{ store.comic }} -->

      <input type='range' min='1' :max='store.latestComicNumber' v-model="store.comic.num" @change="store.getComic(store.comic.num)" />

      <div>
        <label for="isSeen">Mask as seen: </label>
        <input type="checkbox" id='isSeen' name='isSeen' v-model="isSeen" @change="(e) => markAsSeen(e)" /> <span style="opacity: 0.5">(will mark as seen after 15s)</span>  
      </div>
    </main>
</template>
