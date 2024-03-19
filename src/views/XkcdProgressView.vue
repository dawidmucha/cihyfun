<script setup>
import { useXkcdProgressStore } from '@/stores/counter'

import { ref, onMounted } from 'vue'

const store = useXkcdProgressStore()

const currentComicNumber = ref(1)
const comic = ref({})

onMounted(async () => {
  await store.getLatestComicNumber()
  currentComicNumber.value = store.latestComicNumber
  comic.value = store.getComic(store.latestComicNumber)

  if(!localStorage.getItem("xkcdTracker")) { // if storage doesn't exist, create one
    localStorage.setItem("xkcdTracker", new Array(store.latestComicNumber))
  } else if(store.latestComicNumber !== localStorage.getItem("xkcdTracker").length) { // if new comics exists, make space for them in an array
    const diff = localStorage.getItem("xkcdTracker").length - store.latestComicNumber
    const filler = new Array(diff)
    localStorage.setItem("xkcdTracker", [...localStorage.getItem("xkcdTracker"), ...filler])
    // TODO: check if succesful
  }
  
  // TODO: check if it actually works lmao (with data not being wiped)
})
</script>

<template v-if="store.getLatestComicNumber() !== null">
    <main>
      xkcd progress view {{ store.comic.num || "?" }}/{{ store.latestComicNumber }}
      
      <img :src="store.comic.img" alt="image of the current comic"/>
      <!-- {{ store.comic }} -->

      <input type='range' min='1' :max='store.latestComicNumber' v-model="currentComicNumber" @change="store.getComic(currentComicNumber)" />
    </main>
</template>
