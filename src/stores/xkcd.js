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

  // from localStorage
  const numMaxLs = ref(0)

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

    if(localStorage.getItem('xkcd') === null) {
      const empty = new Array(numMax.value)
      empty.unshift(null)

      localStorage.setItem('xkcd', empty.toString())
    }

    numMaxLs.value = localStorage.getItem('xkcd').split(',').length

    if(numMaxLs.value !== numMax.value) {
      const diff = numMax.value - numMaxLs.value
      const filler = new Array(diff).fill(0)

      const xkcdLs = localStorage.getItem('xkcd').split(',').push(...filler)
      localStorage.setItem('xkcd', xkcdLs)
    }
  }

  return { getLatestComic, getComic, setSettingsCurrent, settingsChange, updateLocalStorage }
})