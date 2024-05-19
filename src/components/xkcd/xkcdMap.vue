<script setup>
import { useXkcdStore } from '@/stores/xkcdStore'
import { ref } from 'vue'

const store = useXkcdStore()

const ls = ref(localStorage.getItem('xkcd').split(','))

store.$subscribe(() => {
  ls.value = localStorage.getItem('xkcd').split(',')
})
</script>

<template>
  <div>
    <div id="xkcdMap">
      xkcdMap
      <ol>
        <li v-for="comicNumber in store.numMax" :key="comicNumber">
          <div @click="store.getComic(comicNumber)">{{ comicNumber }} {{ ls[comicNumber] === "0" ? "" : " - Seen" }}</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
#xkcdMap {
  height: 100%;
  overflow-y: scroll;
}
</style>