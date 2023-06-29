<template>
    <div class="post">
        <button class="save-post">

        </button>
        <transition name="modal">
            <succes-modal v-if="store.succesModal" :content="store.succesContent" />
        </transition>
        <transition name="modal">
            <request-modal v-if="store.requestModalAny" @remove="store.removeAllPost"/>
        </transition>
        <transition name="modal">
            <request-modal v-if="store.requestModal" @remove="store.deleteItem"/>
        </transition>
        <button class="delete-posts" v-if="store.allPost.length" @click="store.requestModalAny = true,store.overlay = true">
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
        <div class="container">
            <h2 class="post-title">Posts</h2>
            <div class="post-wrapper">
                <post-item v-for="item in store.posts" :key="item.id" :item="item" />
            </div>
            <button @click="store.getNewPosts()"
                class="inline-block rounded-md border border-transparent bg-slate-600 px-8 py-3 text-center font-medium text-white hover:bg-slate-500">more
                posts</button>
        </div>
    </div>
    <div class="overlay" v-if="store.overlay"
        @click="store.editModal = false, store.overlay = false, store.requestModal = false,store.requestModalAny = false"></div>
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
                <button @click="store.editModal = false,store.succesContent = 'You successfully update the post',store.succesModal = true,store.edit()"
                    class="inline-block rounded-md border border-transparent bg-slate-600 px-8 py-2 text-center font-medium text-white hover:bg-slate-500 capitalize">edit</button>
            </form>
        </div>
    </transition>

    <!-- store.edit(item) -->
</template>

<script setup>
import { useStore } from "~~/store/store"
const store = useStore()
store.getPosts()
</script>

<style lang="scss" scoped>
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