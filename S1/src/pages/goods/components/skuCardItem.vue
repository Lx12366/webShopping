<template>
    <div v-loading="loading">
        <el-tag v-for="(tag, index) in item.goodsSkusCardValue" :key="index" class="mx-1" closable
            :disable-transitions="false" @close="handleClose(tag)" effect="plain">
            <el-input v-model="tag.text" placeholde="选项值" 
            size="small" @change="handleChange($event,tag)"
            class="w-20 ml-[-10px]"></el-input>
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
            + 添加
        </el-button>
    </div>
</template>

<script setup lang='ts'>
import { initSkuCardItem } from "~/Hook/useSku";
type Props = {
    skuCardId: any
}
const props = defineProps<Props>()

//传入id查找goodsSkusCard中符合id的值
const {
    item,
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm,
    loading,
    handleChange
} = initSkuCardItem(props.skuCardId)




</script>

<style scoped>

</style>