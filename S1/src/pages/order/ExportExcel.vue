<template>
    <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="订单类型">
                <el-select v-model="form.tab" placeholder="请选择">
                    <el-option v-for="item in tabs" :key="item.key" :label="item.name" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间范围">
                <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">导出</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import {
    exportOrder
} from "~/api/order"
import { toast } from "~/Hook/util";
type Props = {
    tabs:Array<any>
}
defineProps<Props>()
const dialogVisible = ref(false)

const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false

type Form = {
    tab:any,
    time:any
}

const form:any = reactive({
    tab: null,
    time: ""
})

const loading = ref(false)
const onSubmit = () => {
    if (!form.tab) return toast("错误","订单类型不能为空", "error")
    loading.value = true
    let starttime = null
    let endtime = null
    if (form.time && Array.isArray(form.time)) {
        //form.time 表示时间参数赋值给statrtime和endtime
        starttime = form.time[0]
        endtime = form.time[1]
    }
    exportOrder({
        //像服务器传入参数  tab表示全部还是单个  然后起始时间
        tab: form.tab,
        starttime,
        endtime
    }).then((data:any) => {
        //表示服务器调用成功传回数据下载
        let url = window.URL.createObjectURL(new Blob([data]))
        console.log(data);
        
        let link = document.createElement("a")
        link.style.display = "none"
        link.href = url
        //new date表示标准时间  toLocaleDateString表示当前年月日
        let filename ="龙欣商品_" + (new Date()).toLocaleDateString() + ".xlsx"
        link.setAttribute("download", filename)
        document.body.appendChild(link)
        link.click()
        close()
    }).finally(() => {
        loading.value = false
    })
}

defineExpose({
    open
})
</script>