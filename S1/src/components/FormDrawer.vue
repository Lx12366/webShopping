<template>
    <el-drawer v-model="isDrawer" :title="title" :size="props.size" :close-on-click-modal="false"
        :destroy-on-close="destroyOnClose">
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="footer">
                <el-button type="primary" @click="submit" :loading="loading">{{ commit }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref } from "vue";


const loading = ref(false)

type Props = {
    title: string,
    size?: string,
    commit?: string,
    //关闭drawer抽屉时，里面的元素是否销毁 默认flase
    destroyOnClose?: boolean
}
//withDefaults是ts默认值写法

// 警告缺少size  属性  这里已经设置了默认值 疑问？
const props = withDefaults(defineProps<Props>(), {
    size: "45%",
    destroyOnClose: false,
    commit:'提交'
})
console.log(props.destroyOnClose);


const emit = defineEmits(["submit"])


const isDrawer = ref<Boolean>(false)
//打开抽屉
const open = () => {
    isDrawer.value = true
}
//关闭抽屉
const close = () => {
    isDrawer.value = false
}
//提交按钮
const submit = () => {
    emit("submit")
}
//提交按钮加载中
const showLoading = () => {
    loading.value = true
}
//提交按钮加载完成
const hideLoading = () => {
    loading.value = false
}


defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})

</script>

<style scoped lang="less">
.formDrawer {
    width: 100%;
    height: 100%;
    @apply flex relative flex-col;
}

.formDrawer {
    .body {
        width: 100%;
        height: 100%;
        @apply overflow-y-auto;
    }

    .footer {
        @apply flex items-center mt-2;
    }
}
</style>