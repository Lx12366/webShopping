<template>
    <div class="flex items-center justify-between mb-4">
        <div>
            <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>
            <el-button v-if="btns.includes('delete')" type="danger" size="small" @click="$emit('delete')">批量删除</el-button>
            <slot></slot>
        </div>
        <el-tooltip v-if="btns.includes('getList')" effect="dark" content="刷新数据" placement="top">
            <el-button text @click="$emit('getList')">
                <el-icon :size="15">
                    <Refresh />
                </el-icon>
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="btns.includes('download')" effect="dark" content="导出数据" placement="top">
            <el-button size="small" text @click="$emit('download')">
                <el-icon :size="15">
                    <Download />
                </el-icon>
            </el-button>
        </el-tooltip>
    </div>
</template>

<script setup lang='ts'>
import { computed } from "vue";
type Props = {
    layout?: string
}
const props = withDefaults(defineProps<Props>(), {
    layout: "create,getList"
})

const btns = computed(() => props.layout.split(','))
defineEmits(['create', 'getList', 'delete','download'])
</script>

<style scoped></style>