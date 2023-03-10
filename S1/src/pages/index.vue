<template>
    <div>
        <!-- 骨架视口  panels里面没有值的时候显示骨架   -->
        <template v-if="panels.length == 0" >
            <el-row :gutter="20" v-permission="['getStatistics1,GET']">

                <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
                    <el-skeleton style="width=100%" animated :loading="loading">
                        <template #template>
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <div class="flex justify-between text-sm">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 10%" />
                                    </div>

                                </template>
                                <el-skeleton-item variant="h3" style="width: 70%" />
                                <el-divider />
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>

            </el-row>

        </template>

        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between text-sm">
                            <span>{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">{{ item.unit }}</el-tag>
                        </div>

                    </template>
                    <span class="text-3xl text-gray-500">
                        <CoutTo :value="item.value"></CoutTo>
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>

            </el-col>
        </el-row>
        <IndexNav></IndexNav>

        <el-row :gutter="20" class="mt-2">
            <el-col :span="12" :offset="0">
               <Echarts v-permission="['getStatistics3,GET']"></Echarts> 
            </el-col>
            <el-col :span="12" :offset="0">
               <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3"
               v-permission="['getStatistics2,GET']"></IndexCard>
               <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" 
               v-permission="['getStatistics2,GET']"></IndexCard>
            </el-col>
        </el-row>
        
        
    </div>
</template>

<script setup lang='ts'>
import { getStatistics1,getStatistics2 } from "~/api/index";
import { ref, computed } from "vue";
import CoutTo from "~/components/CoutTo.vue";
import IndexNav from "~/components/IndexNav.vue";
import Echarts from "~/components/Echarts.vue";
import IndexCard from "~/components/IndexCard.vue";

// type Panels = {
//     subTitle:boolean,
//     subUnit:string,
//     subValue:number,
//     title:string,
//     unit:string,
//     unitColor:string,
//     value:number,
// }

const panels = ref<any>([])
const loading = ref(true)
//调用数据
getStatistics1().then((res: any) => {
    panels.value = res.panels
})


const goods = ref([])
const order = ref([])
getStatistics2().then((res:any)=>{
    goods.value = res.goods
    order.value = res.order
})

</script>

<style  scoped>

</style>