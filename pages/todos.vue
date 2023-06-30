<template>
    <div class="todos">
        <div class="container">
            <button class="filter p-1 border-2 border-black rounded" @click="fillterTodo()"><img width="26" height="30" src="@/assets/filter.svg" alt=""></button>
            <div class=" w-full flex items-center justify-center ">
                <div class="bg-white   p-6 m-4 w-full lg:w-3/4 ">
                    <div class="mb-4">
                        <h1 class="text-grey-darkest">Todo List</h1>
                        <div class=" mt-4">
                            <form class="flex" action="#" @submit.prevent="addTodo()">
                                <input v-model="addTodoInput"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                                    placeholder="Add Todo">
                                <button
                                    class="px-8 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">Add</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div class="flex mb-4 items-center" v-for="item in todos" :key="item">
                            <p class="w-full text-grey-darkest" :class="{ 'todo-completed': item.completed }">{{ item.title
                            }}
                            </p>
                            <div class="checkbox-wrapper-11">
                                <input @change="item.completed = $event.target.checked" :id="`todo-check-${item.id}`"
                                    type="checkbox" :checked="item.completed" name="r" value="2">
                                <label :for="`todo-check-${item.id}`">To-do</label>
                            </div>
                            <button @click="idTodo = item.id, deleteTodo()"
                                class="flex-no-shrink p-2 ml-2 rounded text-red-400 border transition-all duration-500 ease border-red-400 hover:bg-red-500 hover:text-white">Remove</button>
                            <button @click="idTodo = item.id, store.overlay = true, editTodo = true">
                                <img width="32" height="32" src="@/assets/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <transition name="modal">
                <div class="todo-edit-modal" v-if="editTodo">
                    <h2 class="post-edit-modal-title mb-6">Edit Todo</h2>
                    <form action="#" @submit.prevent="edit()" class="flex">
                        <input v-model="editTodoInput"
                            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                            placeholder="Edit content" type="text">
                        <button class="px-8 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">edit</button>
                    </form>
                </div>
            </transition>
            <transition name="modal">
                <succes-modal v-if="store.succesModal" :content="store.succesContent" />
            </transition>
        </div>
        <div class="overlay" v-if="store.overlay" @click="store.overlay = false, editTodo = false"></div>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
const todos = ref(null)
const editTodo = ref(false)
const editTodoInput = ref()
const addTodoInput = ref()
async function getTodos() {
    const data = await $fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=' + 10)
    const arr = data.filter(item => item.completed == true)
    const arr2 = data.filter(item => item.completed != true)
    todos.value = arr
    todos.value.push(...arr2)
}
const idTodo = ref()
function deleteTodo() {
    const item = todos.value.find((el) => el.id === idTodo.value);
    if (item !== undefined) {
        todos.value = todos.value.filter((elem) => elem.id !== idTodo.value);
    }
}
function fillterTodo() {
    const ar = todos.value.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
    todos.value = ar
}
function addTodo() {
    const val = addTodoInput.value.split(' ').join('')
    if (val) {
        todos.value.push({
            "userId": 1,
            "id": todos.value[todos.value.length - 1].id + 1,
            "title": addTodoInput.value,
            "completed": false
        })
    }
    addTodoInput.value = ""
}
function edit() {
    todos.value.map(el => {
        if (el.id == idTodo.value) {
            el.title = editTodoInput.value
        }
    })
    editTodo.value = false
    store.overlay = false
    editTodoInput.value = ""
}
getTodos()
</script>

<style lang="scss">
.todo-completed {
    text-decoration: line-through;
    color: #c6c6c6;
}
.filter {
    position: fixed;
    top: 240px;
    right: 20px;
    width: 30px;
    height: 30px;
    img {
        width: 100%;
    }
}
.todo-edit-modal {
    z-index: 15;
    width: 100%;
    max-width: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 6px;
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