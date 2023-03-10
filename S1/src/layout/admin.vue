<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside class="ElAside" :width="store.asideWidth">
                <Aside></Aside>
            </el-aside>
            <el-main>
                <TagList></TagList>
                <!-- 作用域插槽  -->
                <RouterView v-slot="{ Component }">
                    <!-- 自定义animate属性  官网animate.style  animate__faster动画以0.5s速度 -->
                    <Transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                    leave-active-class="animate__animated animate__fadeOut animate__faster"
                     mode="out-in"
                    >
                        <KeepAlive :max="10">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </Transition>

                </RouterView>
            </el-main>
        </el-container>

    </el-container>
</template>

<script setup lang='ts'>
import Header from "./components/header.vue";
import Aside from "./components/aside.vue";
import TagList from "./components/tagList.vue";
import { useStore } from "~/pinia";
import 'animate.css';


const store = useStore()
</script>

<style scoped>
.ElAside {
    transition: all 0.2s ease;
}
</style>