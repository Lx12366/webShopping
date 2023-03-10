<template>
        <el-form :model="searchForm" size="small" label-width="80px" class="mb-3">
            <el-row :gutter="20">
                <!-- 两个插槽 showSearch控制高级搜索框是否显示 hasShow控制展开按钮是否显示 -->
                <slot></slot>
                <template v-if="showSearch">
                    <slot name="show"></slot>
                </template>

                <el-col :span="8" :offset="showSearch ? 0 : 8">
                    <div class="flex items-center justify-end">
                        <el-button type="primary" @click="$emit('search')">搜索</el-button>
                        <el-button @click="$emit('reset')">重置</el-button>
                        <el-button v-if="hasShow" type="primary" text @click="showSearch = !showSearch">
                            {{ showSearch? '收起': '展开' }}
                            <el-icon class="ml-1">
                                <ArrowUp v-if="showSearch" />
                                <ArrowDown v-else />
                            </el-icon>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
</template>

<script setup lang='ts'>
import { ref,useSlots } from "vue";

type Props = {
    searchForm:any
}
defineProps<Props>()
defineEmits(['search', 'reset'])
const showSearch = ref(false)

const slots = useSlots()
//这里两个！！代表什么意思？
const hasShow = ref(!!slots.show)


</script>

<style scoped>

</style>