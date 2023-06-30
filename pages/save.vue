<template>
    <div class="saves py-16">
        <div class="container">
            <div class="save-item mb-16">
                <h2 class="text-3xl mb-4 font-medium leading-8">Posts</h2>
                <div class="save-item-wrapper">
                    <save-poast-item @getSave="getSavePost" v-for="item in posts" :key="item" :item="item" />
                </div>
                <div class="save-none" v-if="!store.savePosts.length">
                    <h2>no saved post</h2>
                </div>
            </div>
            <div class="save-item">
                <h2 class="text-3xl mb-4 font-medium leading-8">Albums</h2>
                <div class="save-item-wrapper">
                    <album-item-save @getSave="getAlbumsPost" v-for="item in albums" :key="item" :item="item" />
                </div>
                <div class="save-none" v-if="!store.saveAlbum.length">
                    <h2>no saved albums</h2>
                </div>
            </div>
        </div>
    </div>
    <transition name="modal">
        <succes-modal v-if="store.succesModal" :content="store.succesContent" />
    </transition>
    <transition name="modal">
        <request-modal v-if="store.requestModalAny" @remove="store.removeAllPost" />
    </transition>
    <transition name="modal">
        <request-modal v-if="store.requestModal" @remove="store.deleteItem" />
    </transition>
    <transition name="modal">
        <div class="post-edit-modal" v-if="store.editModal">
            <div class="post-edit-modal-top">
                <h2 class="post-edit-modal-title">Edit Post</h2>
                <button @click="store.editModal = false, store.overlay = false">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <form action="#" @submit.prevent="">
                <input v-model="store.postTitle" placeholder="title" type="text">
                <input v-model="store.postName" placeholder="name and lasname" type="text">
                <textarea v-model="store.postDesc" placeholder="description"></textarea>
                <button
                    @click="store.editModal = false, store.succesContent = 'You successfully update the post', store.succesModal = true, store.edit()"
                    class="inline-block rounded-md border border-transparent bg-slate-600 px-8 py-2 text-center font-medium text-white hover:bg-slate-500 capitalize">edit</button>
            </form>
        </div>
    </transition>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
const posts = ref([])
const albums = ref([])
const arr = ref([])
async function getSavePost() {
    const data = await $fetch('https://jsonplaceholder.typicode.com/posts')
    posts.value = []
    JSON.parse(localStorage.getItem('savePosts')).forEach(el => {
        const item = data.find(elem => elem.id === el)
        if (item !== undefined) {
            posts.value.push(item)
        }
    })
    localStorage.getItem('savePosts')
}
async function getAlbumsPost() {
    const data = await $fetch('https://jsonplaceholder.typicode.com/albums')
    albums.value = []
    JSON.parse(localStorage.getItem('saveAlbums')).forEach(el => {
        const item = data.find(elem => elem.id === el)
        if (item !== undefined) {
            albums.value.push(item)
        }
    })
    localStorage.getItem('saveAlbums')
}

watchEffect(() => {
    getAlbumsPost()
    getSavePost()
})
</script>

<style lang="scss">
.save-none {
    padding: 30px 20px;
    background: #222;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
        color: #fff;
        font-weight: 500;
        font-size: 20px;
        line-height: 1.1;
        &::first-letter {
            text-transform: uppercase;
        }
    }
}
</style>