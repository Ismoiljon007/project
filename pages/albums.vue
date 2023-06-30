<template>
    <div class="albums py-10">
        <div class="overlay" v-if="store.overlay" @click="store.succesModal = false,store.overlay= false,store.requestModal = false,store.requestModalAny = false"></div>
        <div class="container">
            <button class="delete-posts" v-if="store.allAlbums.length" @click="store.requestModalAny = true,store.overlay = true">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <title />
                <g id="trash">
                    <rect class="cls-1" height="22" width="18" x="7" y="7" />
                    <line class="cls-1" x1="3" x2="29" y1="7" y2="7" />
                    <line class="cls-1" x1="13" x2="19" y1="3" y2="3" />
                    <line class="cls-1" x1="13" x2="13" y1="12" y2="22" />
                    <line class="cls-1" x1="19" x2="19" y1="12" y2="22" />
                </g>
            </svg>
        </button>
        <button class="filter p-2 border-2 border-black rounded" @click="fillterAlbums()"><img width="26" height="30" src="@/assets/filter.svg" alt=""></button>

        <button class="save-posts" v-if="store.allAlbums.length" @click="store.saveAlbums()">
            <img src="@/assets/save.svg" alt="">
        </button>
            <h2 class="font-semibold mb-5 text-3xl text-center">Albums</h2>
            <div class="post-wrapper">
                <almub-item v-for="el in store.albums" :key="el.id" :item="el"/>
            </div>
            <button @click="store.getNewAlbums()"
                class="inline-block rounded-md border border-transparent bg-slate-600 px-8 py-3 text-center font-medium text-white hover:bg-slate-500">more
                posts</button>
        </div>
        
        <transition name="modal">
            <request-modal v-if="store.requestModalAny" @remove="store.removeAllAlbums"/>
        </transition>
        <transition name="modal">
            <request-modal v-if="store.requestModal" @remove="store.deleteAlbum"/>
        </transition>
        <transition name="modal">
            <succes-modal v-if="store.succesModal" :content="store.succesContent" />
        </transition>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
store.getAlbums()
function fillterAlbums() {
    store.albums.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
}
</script>

<style lang="scss">
.cls-1 {
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2px;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.5s ease;
    transform: translate(-50%, -50%) scale(1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transition: all 0.5s ease;
    transform: translate(-50%, -50%) scale(0.8);
}

</style>