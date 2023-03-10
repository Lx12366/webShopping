<template>
    <el-drawer title="设置轮播图" v-model="dialogVisible" size="50%" destroy-on-close>
        <el-form :model="form" label-width="80px">
            <el-form-item label="轮播图">
                <ChooseImage v-model="form.banners" :limit="9" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import ChooseImage from "~/components/chooseImage.vue";

import {
    readGoods,
    setGoodsBanner
} from "~/api/goods"
import { toast } from "~/Hook/util";

const dialogVisible = ref(false)

const form = reactive({
    banners: []
})

const goodsId = ref(0)
//打开open方法  调用api  返回数据传给chooseimage组件  渲染页面图片
const open = (row: any) => {
    goodsId.value = row.id
    row.bannersLoading = true
    readGoods(goodsId.value).then((res: any) => {
        form.banners = res.goodsBanner.map((o: any) => o.url)
        dialogVisible.value = true
    }).finally(() => {
        row.bannersLoading = false
    })
}

const emit = defineEmits(['refresh'])

const loading = ref(false)
const submit = () => {
    emit('refresh')
    loading.value = true
    setGoodsBanner(goodsId.value, form).then((res: any) => {
        toast('成功', '设置轮播图成功！')
        dialogVisible.value = false
    }).finally(() => {
        loading.value = false
    })
}

defineExpose({
    open
})

</script>
