<template>
    <div class="albums">
        <div class="container">
            <h2 class="post-title">Posts</h2>
            <div class="post-wrapper">
                <almub-item v-for="el in store.albums" :key="el.id" :item="el"/>
            </div>
            <button @click="store.getNewAlbums()"
                class="inline-block rounded-md border border-transparent bg-slate-600 px-8 py-3 text-center font-medium text-white hover:bg-slate-500">more
                posts</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
store.getAlbums()
</script>

<style lang="scss" scoped></style>