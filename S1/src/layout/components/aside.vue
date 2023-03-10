<template>
    <div class="h-aside" :style="{ width: store.asideWidth }">
        <!-- default-active表示 menus侧边 默认激活的index的值 unique-opened 是否只能打开一个菜单   详情查看element-plus-->
        <!-- :default-active="Default"表示menus菜单默认打开的是哪个  跟路由对应 -->
        <el-menu style="border:0" @select="handlePath" unique-opened :collapse="isCollapse" :collapse-transition="false"
            :default-active="Default">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <!-- //一级标题信息图标  插槽来表示 -->
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item1, index1) in item.child" :key="index1" :index="item1.frontpath">
                        <el-icon>
                            <component :is="item1.icon"></component>
                        </el-icon>
                        <span>{{ item1.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>

</template>
    
<script setup lang='ts'>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute,onBeforeRouteUpdate } from "vue-router";
import { useStore } from "~/pinia";
const store = useStore()
const router = useRouter()
const route = useRoute()
//默认选中
const Default = ref(route.path)
//监听组件跳转  修改对应组件
onBeforeRouteUpdate((to,from)=>{
    Default.value=to.path
})

//计算属性  点击缩放 菜单栏缩回去   isCollapse属性控制菜单缩放  详情见element-plus
const isCollapse = computed(() => !(store.asideWidth == "250px"))

//菜单栏数据存放  当store.menus有数据时才返回，否则返回空
const asideMenus:any = computed(() => store.menus)

//单击对应二级菜单  el-menu通过handlePath回调函数  跳转路由
const handlePath = (e: string) => {
    //e表示index唯一标识
    router.push(e)
}
</script>
    
<style scoped>
.h-aside {
    transition: all 0.2s ease;
    top: 64px;
    left: 0px;
    bottom: 0px;
    @apply overflow-y-auto overflow-y-hidden fixed shadow-md;
}
</style>