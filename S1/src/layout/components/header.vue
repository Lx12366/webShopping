<template>
    <div class="header">
        <span class="logo">
            <el-icon class="mr-1">
                <Shop />
            </el-icon>
            龙欣商品
        </span>
        <el-icon class="icon" @click="store.handleAsideWidth()">
            <Fold v-if="store.asideWidth=='250px'"/>
            <Expand v-else/>
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon" @click="handleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>


        <div class="ml-auto flex">
            <el-icon class="icon">
                <VideoCameraFilled />
            </el-icon>


            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <MagicStick v-else />
                </el-icon>
            </el-tooltip>

            <div class="ml-auto flex items-center justify-center">
                <el-dropdown @command="handleOut">
                    <span class="el-dropdown-link">
                        <el-avatar :src="`${store.user.avatar}`" class="mr-4" />
                        {{ store.user.username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="UpadtePas">修改密码</el-dropdown-item>
                            <el-dropdown-item command="OutLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
    </div>

    //抽屉组件 包含表单
    <FormDrawer ref="drawer" title="修改密码" commit="提交" @submit="submitForm(ruleFormRef)">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm" label-position="left">
            <el-form-item label="旧密码:" prop="oldpassword">
                <el-input v-model="ruleForm.oldpassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码:" prop="password">
                <el-input v-model="ruleForm.password" type="password"  />
            </el-form-item>
            <el-form-item label="重复密码:" prop="repassword">
                <el-input v-model="ruleForm.repassword"  type="password"/>
            </el-form-item>
        </el-form>

    </FormDrawer>


</template>
    
<script setup lang='ts'>
import { useStore } from "~/pinia";
import { useFullscreen } from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue"
//更改密码方法抽离出去  方面后期维护
//一个是更新密码  一个是退出登录
import { useRepassword, GooutLogin } from "~/Hook/useManager";

const {
    ruleForm,
    rules,
    ruleFormRef,
    submitForm,
    drawer
} = useRepassword()

const {
    Out
} = GooutLogin()

const {
    isFullscreen,
    //全屏唯一值
    toggle
    //切换全屏
} = useFullscreen()


const store = useStore()
//下拉框 updatepas表示修改密码    outlogin表示退出登录
const handleOut = (value: string) => {
    switch (value) {
        case 'UpadtePas':
            drawer.value?.open()
            break;

        case 'OutLogin': Out();
            break;
    }

}

const handleRefresh = () => {
    location.reload()
}



</script>
    
<style scoped>
.header {
    @apply flex bg-indigo-700 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 999;
}

.logo {
    width: 250px;
    @apply flex items-center justify-center text-xl text-light-600 font-thin;
}

.icon {
    width: 42px;
    height: 64px;
    @apply flex items-center justify-center text-light-600;
}

.icon:hover {
    cursor: pointer;
    @apply bg-indigo-600;
}

.dropdown {
    height: 64px;
    @apply flex items-center justify-center;
}

.el-dropdown-link {
    @apply flex items-center justify-center text-light-200 mx-6;
}
</style>