<template>
    <div class="succes-modal">
        <div class="succes-modal__wrapper">
            <button class="succes-modal__close-btn" @click="store.overlay = false,store.succesModal = false">
                <img src="@/assets/close.svg" alt="">
            </button>
            <div class="succes-modal__icon">
                <svg width="90px" height="90px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <circle id="filled-circle" fill="#fff" cx="66.5" cy="66.5" r="54.5" />
                        <circle id="white-circle" fill="#fff" cx="66.5" cy="66.5" r="55.5" />
                        <circle id="outline" stroke="#fff" stroke-width="4" cx="66.5" cy="66.5" r="54.5" />
                        <polyline id="check" stroke="#333" stroke-width="5.5" points="41 70 56 85 92 49" />
                    </g>
                </svg>
            </div>
            <div class="succes-modal__title">{{ content }}</div>
            <div class="succes-modal__btns">
                <button class="succes-modal__button" @click="store.overlay = false,store.succesModal = false">close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
const {content} = defineProps(['content'])
</script>

<style lang="scss" scoped>
.succes-modal {
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
}

.succes-modal__close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -25px;
    right: -25px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background: none;
}

.succes-modal__wrapper {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    position: relative;
}

.succes-modal__title {
    font-weight: 700;
    font-size: 22px;
    line-height: 1.2;
    margin-bottom: 20px;
}

.succes-modal__button {
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
}

.succes-modal__icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #333;
}

.succes-modal__icon img {
    width: 51px;
    height: 35px;
}

#check-group {
    animation: 0.32s ease-in-out 1.03s check-group;
    transform-origin: center;
}

#check-group #check {
    animation: 0.24s cubic-bezier(0.65, 0, 1, 1) 0.5s forwards check;
    stroke-dasharray: 0, 75px;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
}

#check-group #outline {
    animation: 0.38s ease-in outline;
    transform: rotate(0deg);
    transform-origin: center;
}

#check-group #white-circle {
    animation: 0.35s ease-in 0.35s forwards circle;
    transform: none;
    transform-origin: center;
}

@keyframes outline {
    from {
        stroke-dasharray: 0, 345.576px;
    }

    to {
        stroke-dasharray: 345.576px, 345.576px;
    }
}

@keyframes circle {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(0);
    }
}

@keyframes check {
    from {
        opacity: 0;
        stroke-dasharray: 0, 75px;
    }

    to {
        opacity: 1;
        stroke-dasharray: 75px, 75px;
    }
}

@keyframes check-group {
    from {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    to {
        transform: scale(1);
    }
}
</style>