<template>
    <el-aside width="200px" class="aside" v-loading="loading">
        <div class="aside-top">
            <imageAsideList :active="activeId == item.id" v-for="(item, index) in list.value" :key="index" @edit="edit(item)"
                @del="del(item)" @click="handleChangeActive(item.id)">
                {{ item.name }}
            </imageAsideList>
        </div>
        <div class="aside-bottom">
            <!-- 属性 ：page-size每页显示页数   total总条目数 current-page当前页数 -->
            <el-pagination background layout="prev, next" :total="total" :page-size="limit" :current-page="currentPage"
                @current-change="getData" />
        </div>

    </el-aside>

    <FormDrawer :title="drawerTitle" :commit="editId ? '修改' : '添加'" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="formData" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="名称:" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop="order">
                <el-input-number v-model="formData.order" :min="0" :max="9999" />
            </el-form-item>
        </el-form>

    </FormDrawer>
</template>

<script setup lang='ts'>
import imageAsideList from "~/components/imageAsideList.vue";
import { getImageClassList, createImageClass, updateImageClass, delImageClass } from "~/api/image_class";
import { ref, reactive, computed ,getCurrentInstance,onMounted} from "vue";
import FormDrawer from "~/components/FormDrawer.vue";
import { toast } from "~/Hook/util";

const instance = getCurrentInstance()

//当前页码
const currentPage = ref(1)
//总页数
const total = ref(0)
//每页显示10条
const limit = ref(10)

//加载动画
const loading = ref(false)
const list = reactive<any>([])

//获取数据  p是你切换页码后的值 1-》2
function getData(p: any = null) {
    //切换页码时 更换currentPage ，用更换currentPage的值像服务器发送请求
    if (p != null) {
        currentPage.value = p
    }
    loading.value = true
    getImageClassList(currentPage.value).then((res: any) => {
        // console.log(res);
        total.value = res.totalCount
        
        //就很奇怪   getdata里面返回参数赋值给list   这里面可以正常使用list 但是在getdata外面就无法查看使用list
        //真尼玛奇怪？？？？？？？？
         list.value = res.list
         
        //右侧主体 初始化
        handleChangeActive(list.value[0].id)

        //默认激活第一个list 存在即激活
        let flag = list.value[0]
        if (flag) {
            activeId.value = list.value[0].id
        }


    }).finally(() => {
        loading.value = false
    })
}
getData()

// --------------------------------------表单提交组件编写
const formDrawerRef = ref()

const formData = reactive({
    name: "",
    order: 50
})

const rules = reactive({
    name: [{ required: true, message: "名称不能为空", trigger: 'blur' }],
})

const formRef = ref()

//修改要传入的id
let editId = ref(0)
//动态标题
let drawerTitle = computed(() => editId.value ? "修改" : "新增")

//提交表单
function handleSubmit() {
    formRef.value.validate((valid: any) => {
        if (!valid) return
        formDrawerRef.value.showLoading()
        const fun = editId.value ? updateImageClass(editId.value, formData) : createImageClass(formData)


        fun.then((res: any) => {
            //消息提示框  getData重新定位到第一页  关闭表单
            toast('成功', editId.value ? '修改成功' : '新增成功')
            getData(editId.value ? currentPage.value : 1)
            formDrawerRef.value.close()
        }).finally(() => {
            formDrawerRef.value.hideLoading()
        })
    })
}

//新增
function handleCreate() {
    //重置
    editId.value = 0
    formData.name = ""
    formData.order = 50
    formDrawerRef.value.open()
}


// /-----------------------imageAsideList图库列表 编辑和删除按钮
//编辑
function edit(item: any) {
    editId.value = item.id
    formData.name = item.name
    formData.order = item.order
    formDrawerRef.value.open()
}

function del(item: any) {
    loading.value = true
    delImageClass(item.id).then((res: any) => {
        toast('成功', '我被嘎掉了！')
        getData()
    }).finally(() => {
        loading.value = false
    })

}

//activeId表示记录激活状态的id值
//后面跳转路由的时候 记录路由对应的list.id 赋值activeId  
const activeId = ref(0)

const handleChangeActive = (id:any)=>{
    activeId.value = id
    console.log(activeId.value);
    //getCurrentInstance 获取组件实例对象 然后调用$Bus.emit 发送事件
    instance?.proxy?.$Bus.emit('imageChange',id)
}



//暴露给父组件调用打开抽屉方法
defineExpose({
    handleCreate
})




</script>

<style scoped>
.aside {
    position: relative;
}

.aside-top {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 50px;
    overflow-y: auto;
}

.aside-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}
</style>