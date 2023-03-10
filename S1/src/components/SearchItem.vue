<template>
    <el-col :span="8" :offset="0">
        <el-form-item :label="label" size="default">
           <slot></slot>
        </el-form-item>
    </el-col>
</template>

<script setup lang='ts'>
type Props ={
    label:string
}
defineProps<Props>()
</script>

<style scoped>

</style>