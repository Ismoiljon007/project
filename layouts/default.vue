<template>
    <header>
        <div class="container">
            <NuxtLink class="site-logo" to="/">Logo</NuxtLink>
            <ul>
                <li>
                    <NuxtLink to="/">Посты</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/albums">Фото</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/todos">Задачи</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/save">Избранное {{ store.savePosts.length + store.saveAlbum.length}}</NuxtLink>
                </li>
            </ul>
        </div>
    </header>
    <NuxtPage />
</template>

<script setup>
import { useStore } from '~~/store/store';
const store= useStore()
</script>

<style lang="scss" scoped></style>