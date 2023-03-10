<template>
    <el-form label="规格设置">
        <table class="border">
            <thead>
                <tr>
                    <th class="border" v-for="(th, thi) in tableThs" :key="thi" 
                    :width="th.width" :rowspan="th.rowspan" :colspan="th.colspan">
                        {{ th.name }}
                    </th>
                </tr>
                <tr>
                    <th class="border" v-for="(th, thi) in skuLabels" :key="thi">
                        {{ th.name }}111
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in sku_list" :key="index">
                    <td width="100" class="border text-center" v-for="(sku,skui) in  item.skus" :key="skui">
                        {{ sku.value }}
                    </td>
                    <td class="border">
                        <!--销售价 市场价  成本价 库存 体积 体重 编码-->
                        <el-input v-model="item.pprice" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.oprice" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.oprice" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.cprice" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.stock" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.weight" size="small" type="number"></el-input>
                    </td>
                    <td class="border">
                        <el-input v-model="item.code" size="small" ></el-input>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-form>

</template>

<script setup lang='ts'>
import { initSkuTable } from "~/Hook/useSku";
const {
    skuLabels,
    tableThs,
    sku_list
} = initSkuTable()
</script>

<style scoped>

</style>