<template>
    <div ref="post"
        class="post-item flex flex-col bg-white light:bg-slate-900 rounded-lg h-fit px-6 py-8 ring-1 ring-slate-900/5 shadow-xl`">
        <h3 class="capitalize h-max text-slate-900 light:text-white text-base font-medium mb-3 tracking-tight">{{ item?.title }}
        </h3>
        <p class="text-slate-500 light:text-slate-400 pb-3 mt-auto  mb-4 text-sm" style="border-bottom: 1px solid #222">
            {{ item?.body }}
        </p>
        <div class="post-item-user flex items-center gap-2 mb-10">
            <img class="rounded-full" src="https://picsum.photos/30" alt="">
            <span ref="postUser">{{ user.name }}</span>
        </div>
        <transition name="comment">
            <div class="post-item-comment-wr" v-if="commentOpen">
            <div class="post-item-comment border-b-2 pb-2" v-for="el in comments" :key="el">
                <div class="post-item-comment__top mb-3">
                    <h4>name: {{ user.name }}</h4>
                    <h4>email: {{ el?.email }}</h4>
                </div>
                <p class="post-item-commetn__text">
                    {{ el.body }}
                </p>
            </div>
        </div>
        </transition>
        <div class="post-item-btns flex gap-3 ">
            <button class="cursor-pointer comment-button" :class="{'active-comment': commentOpen}"
                @click="commentOpen = !commentOpen">
                <svg enable-background="new 0 0 512 512" height="24" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M170.476,166.19h155.097c4.285,0,7.76-3.469,7.76-7.754s-3.475-7.765-7.76-7.765H170.476c-4.285,0-7.754,3.48-7.754,7.765  S166.191,166.19,170.476,166.19z"/><path d="M348.088,203.362H202.74c-4.284,0-7.759,3.469-7.759,7.754s3.475,7.765,7.759,7.765h145.348c4.284,0,7.754-3.48,7.754-7.765  S352.372,203.362,348.088,203.362z"/><path d="M306.695,256.052H170.476c-4.285,0-7.754,3.469-7.754,7.754c0,4.284,3.469,7.754,7.754,7.754h136.219  c4.279,0,7.754-3.47,7.754-7.754C314.448,259.521,310.974,256.052,306.695,256.052z"/><path d="M396.776,86.288H115.225c-29.992,0-54.403,22.562-54.403,50.308v154.83c0,27.735,24.411,50.297,54.403,50.297h166.034  l119.812,83.989v-84.135c27.996-2.038,50.108-23.753,50.108-50.151v-154.83C451.179,108.85,426.768,86.288,396.776,86.288z   M427.906,291.426c0,14.902-13.972,27.025-31.131,27.025h-18.978v62.523l-89.193-62.523h-173.38  c-17.164,0-31.131-12.123-31.131-27.025v-154.83c0-14.913,13.967-27.035,31.131-27.035h281.551  c17.159,0,31.131,12.123,31.131,27.035V291.426z"/></svg>
            </button>
            <button class="cursor-pointer save-button mr-auto" @click="store.postId = item.id, savePost()"
                :class="savePostId ? 'save-button-active' : ''">
                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"
                        fill="#c9c9c9" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "~~/store/store"
const store = useStore()
const { item } = defineProps(['item'])
const user = ref([])
const emit = defineEmits(['getSave'])
const commentOpen = ref(false)
const post = ref([])
const postUser = ref()
store.getUsers()
const savePostId = computed(()=> {
   const id = store.savePosts.find(el => el === item.id)
   return id
})
function getSave() {
    emit('getSave')
}
const check = ref()
const checkedItems = ref()
const checkChecckBox = () => {
    if (!check.value?.checked) {
        store.allPost.push(post.value)
        store.allPostSave.push(item.id)
    } else {
        store.allPost.forEach((el, i) => {
            if (el == post.value) {
                store.allPost.splice(i, i + 1)
            }
        })
    }
}

const comments = await $fetch('https://jsonplaceholder.typicode.com/comments?postId='+item?.id)

function savePost() {
    if (store.savePosts.length != 0) {
        const elem = store.savePosts.find(el => el == item.id)
        if (!elem) {
            store.savePosts.push(item.id);
        } else {
            const arr = store.savePosts.filter(item => !Array.of(elem).includes(item))
            store.savePosts = arr
        }
        localStorage.setItem('savePosts', JSON.stringify(store.savePosts))
    } else {
        store.savePosts.push(item.id);
        localStorage.setItem('savePosts', JSON.stringify(store.savePosts))
    }
    getSave()
}

onMounted(() => {
    postUser.value.classList.add(`post-user-${item.id}`)
    store.users?.forEach(elem => {
        if (item.userId == elem.id) {
            user.value = elem
        }
    })
})
watchEffect(() => {

})
</script>

<style lang="scss">
.active-comment {
    svg {
        path {
            fill: red !important;
        }
    }
}
.post-item-comment__top {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.post-item-comment-wr {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 300px;
    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c9c9c9;
    }
    overflow-y: auto;
    margin-bottom: 20px;
}
.check-box {
    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]:checked {
        ~label {
            &::after {
                display: block;
                animation: checkbox 0.5s ease forwards;

                @keyframes checkbox {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }

                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
        }
    }

    label {
        cursor: pointer;
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #222;
        border-radius: 2px;
        position: relative;
        overflow: hidden;

        &::after {
            display: none;
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: #222;
            border: 1px solid #fff;
            border-radius: 2px;
        }
    }
}

.comment-enter-active,
.comment-leave-active {
    transition: all 1s ease;
    height: 300px;
}

.comment-enter-from,
.comment-leave-to {
    // opacity: 0;
    transition: all 1s ease;
    height: 0px;
}
</style>