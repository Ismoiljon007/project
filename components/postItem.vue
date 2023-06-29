<template>
    <div ref="post"
        class="post-item flex flex-col bg-white light:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl`">
        <h3 class="capitalize text-slate-900 light:text-white text-base font-medium mb-3 tracking-tight">{{ item?.title }}
        </h3>
        <p class="text-slate-500 light:text-slate-400 pb-3 mt-auto mb-4 text-sm" style="border-bottom: 1px solid #222">
            {{ item?.body }}
        </p>
        <div class="post-item-user flex items-center gap-2 mb-10">
            <img class="rounded-full" src="https://picsum.photos/30" alt="">
            <span ref="postUser">{{ user.name }}</span>
        </div>
        <div class="post-item-btns flex gap-3">
            <button class="cursor-pointer delete-button"
                @click="store.postId = item.id, store.requestModal = true, store.overlay = true">
                <img src="@/assets/delete.svg" alt="">
            </button>
            <button class="cursor-pointer edit-button"
                @click="store.postId = item.id, store.post = postUser, store.overlay = true, store.editModal = true">
                <img src="@/assets/edit.svg" alt="">
            </button>
            <button class="cursor-pointer save-button mr-auto" @click="store.postId = item.id, savePost()"
                :class="savePostId ? 'save-button-active' : ''">
                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"
                        fill="#c9c9c9" />
                </svg>
            </button>
            <div class="check-box">
                <input ref="check" :id="`checkbox-${item.id}`" type="checkbox">
                <label @click="checkChecckBox()" :for="`checkbox-${item.id}`"></label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "~~/store/store"
const store = useStore()
const { item } = defineProps(['item'])
const user = ref([])
const post = ref([])
const postUser = ref()
store.getUsers()
const savePostId = computed(()=> {
   const id = store.savePosts.find(el => el === item.id)
   return id
})
const check = ref()
const checkedItems = ref()
const checkChecckBox = () => {
    if (!check.value?.checked) {
        store.allPost.push(post.value)
    } else {
        store.allPost.forEach((el, i) => {
            if (el == post.value) {
                store.allPost.splice(i, i + 1)
            }
        })
    }
}

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

<style lang="scss" scoped>
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
</style>