import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useXkcdStore = defineStore('xkcd', () => {
  // from getComic
  const day = ref('')
  const month = ref('')
  const year = ref('')
  const title = ref('')
  const img = ref('')
  const alt = ref('')
  const num = ref(0)

  // from getLatestComic
  const numMax = ref(0)

  // settings
  const size = ref('large')
  const filter = ref('both')
  const settingsCurrent = ref('')

  async function getLatestComic() {
    let res = await axios("https://xkcd.vercel.app/?comic=latest")
    
    if(res) numMax.value = res.data.num
  }

  async function getComic(comicNumber) {
    let res = await axios(`https://xkcd.vercel.app/?comic=${comicNumber}`)

    if(res) {
      day.value = res.data.day
      month.value = res.data.month
      year.value = res.data.year
      title.value = res.data.title
      img.value = res.data.img
      alt.value = res.data.alt
      num.value = res.data.num
    }
  }

  function setSettingsCurrent(name) {
    settingsCurrent.value = name
  }

  function settingsChange(setting, name) {
    if(setting === "size") size.value = name
    else if(setting === "filter") filter.value = name
  }

  async function updateLocalStorage() {
    await getLatestComic()

    //create a localStorage item if visiting a website for the first time (or localStorage was cleared)
    if(localStorage.getItem('xkcd') === null) {
      const empty = new Array(numMax.value).fill(0)
      empty.unshift(0)

      localStorage.setItem('xkcd', empty.toString())
    }

    //when returning to the webiste, extend the localStorage item with missing new comics (marked as unseen)
    const lsLength = localStorage.getItem('xkcd').split(',').length

    if(lsLength !== numMax.value + 1) {
      const diff = numMax.value + lsLength + 1

      const lsTmp = localStorage.getItem('xkcd').split(',')
      lsTmp.push(...new Array(diff).fill(0))
    }
  }

  return { 
    getLatestComic, getComic, setSettingsCurrent, settingsChange, updateLocalStorage, 
    day, month, year, title, img, alt, num, numMax, size, filter, settingsCurrent
  }
})
   