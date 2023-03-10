<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <el-check-tag v-for="(item, index) in  options" :key="index" :checked="current == item.value"
                    @click="handleTag(item.value)">
                    {{ item.text }}
                </el-check-tag>
            </div>
        </template>
        <div ref="el" id="main" style="width:100%;height:300px;">

        </div>

    </el-card>

</template>

<script setup lang='ts'>
//echarts 插件 封装
import * as echarts from 'echarts';
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { getStatistics3 } from "~/api/index";
import { useResizeObserver } from '@vueuse/core'

const current = ref("week")
//tag标签数据
const options = [
    {
        text: "近一个月",
        value: "month"
    },
    {
        text: "近一个周",
        value: "week"
    },
    {
        text: "近24小时",
        value: "hour"
    }
]

//切换标签时函数
function handleTag(type: string) {
    current.value = type
    getData()
}
//echarts柱状图插件表示
var myChart: echarts.ECharts

//chartdom 和mychart要写到onMounted里  因为setup还没有渲染dom  找不到对应节点
onMounted(() => {
    var chartDom = document.getElementById('main') as HTMLElement;
    myChart = echarts.init(chartDom);


    getData()
})

//切换页面时会出现图表白屏情况 是由于图标没有正确销毁导致
//调用 echarts.dispose函数销毁函数 重新渲染时会init初始化图标
//详情见echarts官网
onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart)
})

function getData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    myChart.showLoading()
    getStatistics3(current.value).then((res: any) => {
        option.xAxis.data = res.x
        option.series[0].data = res.y
        //绘画图表 
        myChart.setOption(option);
    }).finally(() => {
        myChart.hideLoading()
    })
}

const el = ref(null)
useResizeObserver(el, (entries) => {
    //浏览器窗口适配
    //在有些场景下，我们希望当容器大小改变时，图表的大小也相应地改变。
    //这种情况下，可以监听页面的 window.onresize 事件获取浏览器大小改变的事件，然后调用 echartsInstance.resize 改变图表的大小。
    //此处调用vueuse的useResizeObserver（）方法监听窗口变化  然后让echarts图标自适应宽高
    myChart.resize();
})
</script>

<style scoped>

</style>