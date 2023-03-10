<template>
    <el-main class="main" v-loading="loading">
        <div class="main-top p-3">

            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) in list.value" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{ 'padding': 0 }"
                    :class="{ 'border-blue-500':item.checked }">
                        <el-image :src="item.url" fit="cover" class="h-[150px]" style="width: 100%;"
                            :preview-src-list="[item.url]" :initial-index="1" hide-on-click-modal></el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">

                            <el-checkbox v-if="prop.openChoose" v-model="item.checked" @change="handleChecked(item)">{{}}</el-checkbox>
                            

                            <el-button type="primary" size="small" text @click="handleChange(item)">重命名</el-button>

                            <el-popconfirm title="真的要删除吗？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="del(item.id)">
                                <template #reference>
                                    <el-button class="!m-0" type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>


                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="aside-bottom">
            <!-- 属性 ：page-size每页显示页数   total总条目数 current-page当前页数 -->
            <el-pagination background layout="prev,pager, next" :total="total" :page-size="limit"
                :current-page="currentPage" @current-change="getData" />
        </div>

    </el-main>

    <el-drawer title="上传" v-model="drawer">
        <upLoadFile :data="{ image_class_id:imageList }" @success="handleSuccess"></upLoadFile>
    </el-drawer>

</template>

<script setup lang='ts'>
import { ref, reactive, getCurrentInstance,computed } from "vue";
import upLoadFile from "~/components/upLoadFile.vue";

import { showPrompt, toast } from "~/Hook/util";
//获取图库分类数据
import { getImageList, updageImageList, deleteImageList } from "~/api/image"
//openChoose 表示单选框是否显示

type Props ={
    openChoose?:boolean,
    limit?:number
}
const prop = withDefaults(defineProps<Props>(),{
    openChoose:false,
    limit:1
})

const instance = getCurrentInstance()

const drawer = ref(false)
const openUploadFile = () => drawer.value = true

const loading = ref(false)

//当前页码
const currentPage = ref(1)
//总页数
const total = ref(0)
//每页显示10条
const limit = ref(10)
const list = reactive<any>([])
//表示id
const imageList = ref(0)

//获取数据  p是你切换页码后的值 1-》2
function getData(p: any = null) {
    //切换页码时 更换currentPage ，用更换currentPage的值像服务器发送请求
    if (p != null) {
        currentPage.value = p
    }
    loading.value = true
    //获取
    getImageList(imageList.value, currentPage.value).then((res: any) => {
        total.value = res.totalCount
        list.value = res.list.map((o:any)=>{
            o.checked = false
            return o
        })


    }).finally(() => {
        loading.value = false
    })
}
//使用bus传参  兄弟组件imageAside传来的imageChange方法接收id值
//id值表示图标分类对应的数据
instance?.proxy?.$Bus.on('imageChange', (id) => {
    LoadDate(id)
})

const LoadDate = (id: any) => {
    currentPage.value = 1
    imageList.value = id
    getData()
}

//修改
function handleChange(item: any) {
    showPrompt('你想改成啥子样子？', item.name).then(({ value }) => {
        loading.value = true
        updageImageList(item.id, value).then((res: any) => {
            toast('成功', '修改成功')
            getData()
        }).finally(() => {
            loading.value = false
        })
    })
}
//删除
function del(ids: any) {
    loading.value = true
    deleteImageList([ids]).then((res: any) => {
        toast('成功', '删除成功')
        getData()

    }).finally(() => {
        loading.value = false
    })
}

function handleSuccess() {
    getData(1)
}

//选中的图片 判断传值
const emit = defineEmits(['choose'])
const checkedImage = computed(()=>{ 
   return list.value.filter((item:any)=>item.checked)
})
function handleChecked(item:any) {
    if(item.checked && checkedImage.value.length > prop.limit){
        item.checked = false
        return toast('失败',`最多只能传入${prop.limit}张图片`,'error')
    }
    emit('choose',checkedImage.value)
}



defineExpose({
    openUploadFile
})
</script>

<style scoped>
.main {
    position: relative;
}

.aside-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}


.main-top {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 50px;
    overflow-y: auto;
}


.main-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}

.image-title {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>