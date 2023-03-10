<template>
    <RouterView></RouterView>
</template>

<script setup lang='ts'>
console.log(import.meta.env);

</script>

<style >
/* 进度条样式 */
#nprogress .bar{
    height: 5px !important;
    background-color: rgb(18, 238, 87) !important;
}
body{
    @apply bg-gray-100;
}
::-webkit-scrollbar{
    width: 5px;height: 6px;
    cursor: pointer;
}
::-webkit-scrollbar-corner{
    display: block;
}
::-webkit-scrollbar-thumb{
    border-radius: 8px;
    background-color: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track{
    border-radius: 8px;
}
</style>