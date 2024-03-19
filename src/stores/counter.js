import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useXkcdProgressStore = defineStore('xkcdProgress', () => {
  const latestComicNumber = ref(1) 
  const comic = ref({})

  async function getLatestComicNumber() {
    let res = await axios("https://xkcd.vercel.app/?comic=latest")
    
    if(res) latestComicNumber.value = res.data.num
  }

  async function getComic(comicNumber) {
    let res = await axios(`https://xkcd.vercel.app/?comic=${comicNumber}`)

    if(res) comic.value = res.data
  }

  return { latestComicNumber, comic, getLatestComicNumber, getComic }
})