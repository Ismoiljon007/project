<template>
    <div class="todos">
        <div class="container">
            <div class=" w-full flex items-center justify-center ">
                <div class="bg-white   p-6 m-4 w-full lg:w-3/4 ">
                    <div class="mb-4">
                        <h1 class="text-grey-darkest">Todo List</h1>
                        <div class="flex mt-4">
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                                placeholder="Add Todo">
                            <button class="px-8 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">Add</button>
                        </div>
                    </div>
                    <div>
                        <div class="flex mb-4 items-center">
                            <p class="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                            <div class="checkbox-wrapper-11">
                                <input id="02-11" type="checkbox" name="r" value="2">
                                <label for="02-11">To-do</label>
                            </div>
                            <button
                                class="flex-no-shrink p-2 ml-2 rounded text-red-400 border transition-all duration-500 ease border-red-400 hover:bg-red-500 hover:text-white">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>