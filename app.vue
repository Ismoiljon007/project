<template>
  <div>
    <NuxtLayout/>
  </div>
</template>
<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
onMounted(()=> {
  if(localStorage.getItem('savePosts')) {
    store.savePosts = JSON.parse(localStorage.getItem('savePosts'))
  }
  if(localStorage.getItem('saveAlbums')) {
    store.saveAlbum = JSON.parse(localStorage.getItem('saveAlbums'))
  }
})
</script>