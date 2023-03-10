<template>
    <el-row class="login-content">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>欢迎来到京津冀靠的就是莲富大厦街坊邻居山莨菪碱</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <div class="d1">欢迎回来</div>
            <div class="d2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span class="mx-4">账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>

            <el-form :rules="rules" ref="rulesForm" :model="formData" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formData.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-[250px]" round color="#626aef" type="primary" @click="onSubmit(rulesForm)"
                        :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus' //导入element插件库
import { useRouter } from "vue-router";
import { AxiosResponse, AxiosHeaders } from "axios";
import { useStore } from "~/pinia/index";

type Request = {
    config: Object,
    data: Object,
    headers: AxiosHeaders,
    request: XMLHttpRequest,
    status: number,
    statusText: string,
}
const loading = ref<Boolean>(false)
const router = useRouter()
const store = useStore()
//表单数据绑定   el-from-item要用prop绑定子项（user，pas)
const formData = reactive({
    username: '',
    password: '',
})

const rulesForm = ref<FormInstance>()

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        //element验证规则  required 是否开启验证  message：验证提示信息，trigger 失去焦点时验证
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        //同上
    ]
})


const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (!valid) return false

        //loading表示加载状态 
        loading.value = true

         store.Login(formData).then(async(res)=>{
            // console.log('token是----------',res);
            
           const r1 = await store.get_info()
           console.log(r1);
           
            
            router.push('/')
            //账号密码正确跳转路由页面
        }).finally(() => {
            loading.value = false
        })

    })
}


function OnKeyUp(e: any) {
    // console.log(e);
    //此函数表示回车键登录
    if (e.key == "Enter") {
        onSubmit(rulesForm.value)
    }
}

onMounted(() => {
    document.addEventListener('keydown', OnKeyUp)
})

onBeforeMount(() => {
    document.removeEventListener('keydown',OnKeyUp)
})


</script>

<style lang="less" scoped>
//主模块的内容区域
.login-content {
    @apply min-h-screen bg-indigo-500;

    .left {
        @apply flex flex-col justify-center items-center;

        div {
            div:first-child {
                @apply text-light-50 text-7xl font-bold py-8;
            }

            div:last-child {
                @apply text-gray-50 text-sm tracking-widest;
            }
        }
    }

    .right {
        @apply bg-light-50 flex flex-col justify-center items-center;

        .d1 {
            @apply font-bold text-3xl text-gray-800;
        }

        .d2 {
            @apply flex items-center justify-center my-5 text-gray-300;
        }
    }
}
</style>