<template>
    <!-- 数字滚动组件 -->
    {{ gunDong.num.toFixed(2) }}
</template>

<script setup lang='ts'>
import gsap from "gsap";
import { ref, reactive, watch } from "vue";
type Props = {
    value: Number
}

const prop = defineProps<Props>()


const gunDong = reactive({
    num: 0
})

function AnimateGunDong() {
    gsap.to(gunDong, {
        duration: 0.5,
        num: prop.value
    })
}

AnimateGunDong()
//触发更新事件 立马调用动画函数 滚动数字
watch(() => prop.value, () => AnimateGunDong())

</script>

<style scoped>

</style>