<template>
    <div class="request-modal">
        <h2>Are you sure you want to delete it?</h2>
        <div class="request-modal__btns">
            <button @click="store.requestModal = false,store.requestModalAny = false,store.overlay = false">No</button>
            <button @click="remove(),store.succesContent = 'You successfully deleted the post',store.succesModal = true, store.requestModal = false,
            store.requestModalAny = false">yes</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const emit = defineEmits(['remove'])
const store = useStore()
function remove() {
    emit('remove')
}
</script>

<style lang="scss" scoped>
.request-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    border-radius: 8px;
    padding: 30px;
    background: #fff;
    color: #333;
    z-index: 18;
    border: 2px solid #333;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-weight: 700;
        font-size: 22px;
        line-height: 1.2;
        margin-bottom: 40px;
    }

    button {
        width: 100%;
        border: none;
        border-radius: 10px;
        padding: 4px 25px;
        background: #333;
        cursor: pointer;
        color: #fff;
        font-weight: 500;
        font-size: 16px;
        line-height: 1.2;
        text-transform: capitalize;
    }

    &__btns {
        display: flex;
        align-items: center;
        gap: 20px;
    }
}
</style>