<script setup>
import XkcdSettings from '@/components/xkcd/xkcdSettings.vue'
import { useXkcdStore } from '@/stores/xkcdStore'
import { ref } from 'vue'

const store = useXkcdStore()

const selectedSize = ref(0)
const selectedFilter = ref(0)

const ls = ref(localStorage.getItem('xkcd').split(',').map(Number))

store.$subscribe(() => {
  ls.value = localStorage.getItem('xkcd').split(',').map(Number)

  switch(store.size) {
    case "minimal": selectedSize.value = 0; break
    case "small": selectedSize.value = 1; break
    case "large": selectedSize.value = 2; break
    default: console.error('store.size invalid value')
  }

  switch(store.filter) {
    case "unseen": selectedFilter.value = 0; break
    case "seen": selectedFilter.value = 1; break
    case "both": selectedFilter.value = 2; break
    default: console.error('store.filter invalid value')
  }
})

const isComicShown = (setting, comic) => {
  if(setting === 2) return true
  else return (setting === comic)
}
</script>

<template>
  <div>
    <div id="xkcdMap">
      <XkcdSettings :selectedSizeProp="selectedSize" :selectedFilterProp="selectedFilter" />
      xkcdMap {{ selectedSize }} {{ selectedFilter }}
      <ol>
        <span v-for="comicNumber in store.numMax" :key="comicNumber">
          <li v-if="isComicShown(selectedFilter, ls[comicNumber])"> 
            <!-- <div @click="store.getComic(comicNumber)">{{ comicNumber }} {{ ls[comicNumber] === 0 ? "" : " - Seen" }}</div>  -->
            <div :class="{ 
              mapTileSeen: ls[comicNumber], 
              mapTileUnseen: !ls[comicNumber],
              mapTileMinimal: (selectedSize === 0),
              mapTileSmall: (selectedSize === 1),
              mapTileLarge: (selectedSize === 2),
            }">{{ comicNumber }}</div>
          </li>
        </span>
      </ol>
    </div>
  </div>
</template>

<style scoped>
#xkcdMap {
  height: 100%;
  overflow-y: scroll;
}

.mapTileMinimal {
  width: 5px;
  height: 5px;
}

.mapTileSmall {
  width: 22px;
  height: 22px;
}

.mapTileLarge {
  width: 50px;
  height: 50px;
}

.mapTileSeen {
  background-color: green;
}

.mapTileUnseen {
  background-color: darkred;
}
</style>