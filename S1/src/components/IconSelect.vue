<template>
    <div class="flex items-center">
        <el-icon :size="20" v-if="modelValue" class="mr-2">
            <component :is="modelValue"></component>
        </el-icon>
        <el-select filterable :modelValue="modelValue" class="m-2" placeholder="请选择图标" @change="handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item">
                <div class="flex items-center justify-between">
                    <el-icon>
                        <component :is="item"></component>
                    </el-icon>
                    <span class="text-gray-500">{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import * as iconList from '@element-plus/icons-vue'
type Props = {
    modelValue: any
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const icons = ref(Object.keys(iconList))
console.log(icons);



const handleChange = (e: any) => {
    emit('update:modelValue', e)
}
</script>

<style scoped>

</style>