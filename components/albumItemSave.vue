<template>
    <div ref="album"
        class="album-item flex flex-col bg-white light:bg-slate-900 rounded-lg h-fit px-6 py-8 ring-1 ring-slate-900/5 shadow-xl`">
        <NuxtLink :to="`/album/${item.id}`" class="capitalize h-max text-slate-900 light:text-white text-base font-medium mb-3 tracking-tight pb-3" style="border-bottom: 1px solid #222">{{ item?.title }}
        </NuxtLink>
        <div class="post-item-user flex items-center gap-2 mb-10">
            <img class="rounded-full" src="https://picsum.photos/30" alt="">
            <span ref="albumUser">{{ user.name }}</span>
        </div>
        <div class="post-item-comment-wr" v-if="commentOpen">
            <div class="post-item-comment" v-for="el in comments" :key="el">
                <div class="post-item-comment__top">
                    <h4>{{ el?.name }}</h4>
                    <h4>{{ el?.email }}</h4>
                </div>
                <p class="post-item-commetn__text">
                    {{ el.body }}
                </p>
            </div>
        </div>
        <div class="post-item-btns flex gap-3 ">
            <button class="cursor-pointer save-button mr-auto" @click="store.albumId = item.id, saveAlbum()"
                :class="saveAlbumId ? 'save-button-active' : ''">
                <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
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
const emit = defineEmits(['getSave'])
const { item } = defineProps(['item'])
const user = ref([])
const album = ref([])
const albumUser = ref()
store.getUsers()
function getSave() {
    emit('getSave')
}
const saveAlbumId = computed(()=> {
   const id = store.saveAlbum.find(el => el === item.id)
   return id
})
const check = ref()
const checkedItems = ref()
const checkChecckBox = () => {
    if (!check.value?.checked) {
        store.allAlbums.push(album.value)
        store.allAlbumsSave.push(item.id)
    } else {
        store.allAlbums.forEach((el, i) => {
            if (el == album.value) {
                store.allAlbums.splice(i, i + 1)
            }
        })
    }
}


function saveAlbum() {
    if (store.saveAlbum.length != 0) {
        const elem = store.saveAlbum.find(el => el == item.id)
        if (!elem) {
            store.saveAlbum.push(item.id);
        } else {
            const arr = store.saveAlbum.filter(item => !Array.of(elem).includes(item))
            store.saveAlbum = arr
        }
        localStorage.setItem('saveAlbums', JSON.stringify(store.saveAlbum))
    } else {
        store.saveAlbum.push(item.id);
        localStorage.setItem('saveAlbums', JSON.stringify(store.saveAlbum))
    }
    getSave()
}

onMounted(() => {
    albumUser.value.classList.add(`album-user-${item.id}`)
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