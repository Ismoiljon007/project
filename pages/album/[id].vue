<template>
    <div class="album-details py-24">
        <!-- <pre>{{ details }}</pre> -->
        <div class="container">
            <div class="album-details__wrapper">
                <div class="album-details__item" v-for="item in details" :key="item"
                    @click="imgAlbum = item.url, imgAlbumOpen = true,store.overlay = true">
                    <div class="album-details__item-img">
                        <img :src="item.thumbnailUrl" alt="">
                    </div>
                    <h2 class="album-details__item-title text-lg">{{ item.title }}</h2>
                </div>
            </div>
            <transition name="album">
                <div class="album-img-modal" v-if="imgAlbumOpen">
                    <div class="album-img-modal-close" @click="imgAlbumOpen = false,store.overlay = false">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 20.4281L20.428 11M11 11L20.428 20.4281" stroke="#fff" stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                    </div>
                    <img :src="imgAlbum" alt="">
                </div>
            </transition>
            <transition name="overlay">
                <div class="overlay" v-if="store.overlay" @click="imgAlbumOpen = false,store.overlay = false"></div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
const { id } = useRoute().params
const details = await $fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
const imgAlbum = ref()
const imgAlbumOpen = ref(false)

</script>

<style lang="scss" scoped>
.album-img-modal-thumb {
    width: 700px;
}

.album-img-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    width: 100%;
    max-width: 600px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    z-index: 15;
    &-close {
        position: absolute;
        top: -30px;
        right: -30px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        
        @media (max-width: 750px) {
            top: 15px;
            right: 15px;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    }
}

.album-enter-active,
.album-leave-active {
    transition: all 0.5s ease;
    transform: translate(-50%,-50%);
}

.album-enter-from,
.album-leave-to {
    transition: all 0.5s ease;
    transform: translate(-50%,-50%);
    opacity: 0;
}
.overlay-enter-active,
.overlay-leave-active {
    transition: all 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
    transition: all 0.5s ease;
    opacity: 0;
}
</style>