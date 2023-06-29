<template>
    <div class="album-item flex flex-col bg-slate-600 rounded-lg border border-gray-700">
        <h2 class="albul-item__title bg-white text-2xl py-2 px-4">{{item?.title}}</h2>
        <h4 class="albul-item__user text-white py-2 mt-auto px-4">Azamjon Baby</h4>
    </div>
</template>

<script setup>
const {item} = defineProps(['item'])
</script>

<style lang="scss" scoped>
.albul-item__title {
    border-radius: 8px 8px 0 0;
    height: 100% !important;
}
</style>