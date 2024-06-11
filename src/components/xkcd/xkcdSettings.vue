<!-- eslint-disable no-unused-vars -->
<script setup>
import { useXkcdStore } from '@/stores/xkcdStore'
import { defineProps } from 'vue'

const props = defineProps(['selectedSizeProp', 'selectedFilterProp'])

const store = useXkcdStore()
</script>

<template>
  <div>
    this diva {{ props.selectedSizeProp }} {{ props.selectedFilterProp }}
    <div v-show="store.settingsCurrent === ''">
      <button @click="store.setSettingsCurrent('size')">size</button>
      <button @click="store.setSettingsCurrent('filter')">filter</button>
    </div>
    <div v-show="store.settingsCurrent === 'size'">
      <button @click="store.setSettingsCurrent('')">&lt;</button>
      <button @click="store.settingsChange('size', 'large')" :disabled="selectedSizeProp == 'large'">Large</button>
      <button @click="store.settingsChange('size', 'small')" :disabled="selectedSizeProp == 'small'">Small</button>
      <button @click="store.settingsChange('size', 'minimal')" :disabled="selectedSizeProp == 'minimal'">Minimal</button>
    </div>
    <div v-show="store.settingsCurrent === 'filter'">
      <button @click="store.setSettingsCurrent('')">&lt;</button>
      <button @click="store.settingsChange('filter', 'seen')" :disabled="selectedFilterProp == 'seen'">Seen</button>
      <button @click="store.settingsChange('filter', 'unseen')" :disabled="selectedFilterProp == 'unseen'">Unseen</button>
      <button @click="store.settingsChange('filter', 'both')" :disabled="selectedFilterProp == 'both'">Both</button>
    </div>
  </div>
</template>

<style scoped>
</style>