<template>
    <div class="aside-list" :class="{ active: active }">
        <span class="truncate">
            <slot></slot>
        </span>
        <el-button size="small" text type="primary" class="ml-auto px-1" @click.stop="edit">
            <el-icon>
                <Edit :size="12" />
            </el-icon>
        </el-button>
        <span @click.stop="() => { }">
            <el-popconfirm title="真的要删除吗？" confirm-button-text="确认" cancel-button-text="取消" @confirm.stop="del">
                <template #reference>
                    <el-button size="small" text type="primary" class="px-1">
                        <el-icon>
                            <Close :size="12" />
                        </el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </span>
    </div>
</template>
<script setup lang='ts'>
type Props = {
    active: Boolean
}
defineProps<Props>()

const emit = defineEmits(['edit', 'del'])

function edit() {
    emit('edit')
}

function del() {
    emit('del')
}

</script>

<style scoped>
.aside-list {
    /* background-color: red; */
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-true-gray-600;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>