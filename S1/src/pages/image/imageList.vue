<template>
    <el-container class="container" :style="{ height: (h + 'px') }">
        <el-header class="header">
            <el-button type="primary" size="small" @click="handleOpenCreate">新增</el-button>
            <el-button type="success" size="small" @click="handleOpenIpLoad">上传图片</el-button>
        </el-header>
        <el-container class="box">
                <imageAside ref="ImageAsideRef"></imageAside>
                <imageMain ref="handleMainRef"></imageMain>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import imageAside from "~/components/imageAside.vue";
import imageMain from "~/components/imageMain.vue";
import { ref } from "vue";
const handleMainRef = ref()

const Height = window.innerHeight || document.body.clientHeight
const h = Height - 64 - 44 - 40

const ImageAsideRef = ref()

function handleOpenCreate() {
    ImageAsideRef.value.handleCreate()
}

function handleOpenIpLoad() {
    handleMainRef.value.openUploadFile()
}

</script>

<style scoped>
.container {
    @apply bg-white rounded;
    
}

.header {
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    @apply flex items-center;
}

</style>