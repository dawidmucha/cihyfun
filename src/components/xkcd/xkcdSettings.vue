<!-- eslint-disable no-unused-vars -->
<script setup>
import { useXkcdStore } from '@/stores/xkcdStore'
import { ref } from 'vue'

const store = useXkcdStore()

const selectedSize = ref([0, 0, 0])
const selectedFilter = ref([0, 0, 0])

store.$subscribe(() => {
  switch(store.size) {
    case "large": selectedSize.value = [1, 0, 0]; break
    case "small": selectedSize.value = [0, 1, 0]; break
    case "minimal": selectedSize.value = [0, 0, 1]; break
    default: console.error('store.size invalid value')
  }

  switch(store.filter) {
    case "seen": selectedFilter.value = [1, 0, 0]; break
    case "unseen": selectedFilter.value = [0, 1, 0]; break
    case "both": selectedFilter.value = [0, 0, 1]; break
    default: console.error('store.filter invalid value')
  }
})
</script>

<template>
  <div>
    this diva {{ selectedSize }} {{ selectedFilter }}
    <div v-show="store.settingsCurrent === ''">
      <button @click="store.setSettingsCurrent('size')">size</button>
      <button @click="store.setSettingsCurrent('filter')">filter</button>
    </div>
    <div v-show="store.settingsCurrent === 'size'">
      <button @click="store.setSettingsCurrent('')">&lt;</button>
      <button @click="store.settingsChange('size', 'large')" :disabled="selectedSize[0]">Large</button>
      <button @click="store.settingsChange('size', 'small')" :disabled="selectedSize[1]">Small</button>
      <button @click="store.settingsChange('size', 'minimal')" :disabled="selectedSize[2]">Minimal</button>
    </div>
    <div v-show="store.settingsCurrent === 'filter'">
      <button @click="store.setSettingsCurrent('')">&lt;</button>
      <button @click="store.settingsChange('filter', 'seen')" :disabled="selectedFilter[0]">Seen</button>
      <button @click="store.settingsChange('filter', 'unseen')" :disabled="selectedFilter[1]">Unseen</button>
      <button @click="store.settingsChange('filter', 'both')" :disabled="selectedFilter[2]">Both</button>
    </div>
  </div>
</template>

<style scoped>
</style>