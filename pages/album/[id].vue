<template>
    <div class="post-details py-24">
        <div class="container">
            <div class="post-details-left">
                <h2 class="post-details-title text-6xl font-semibold mb-5 capitalize">{{ details.title }}</h2>
            <p class="text-lg">{{ details.body }}</p>
            </div>
            <div class="post-details-right">
                
            </div>
        </div>
    </div>
</template>

<script setup>
const {id} = useRoute().params
const details = await $fetch('https://jsonplaceholder.typicode.com/posts/'+id)


</script>

<style lang="scss" scoped>

</style>