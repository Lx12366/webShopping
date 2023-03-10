import { ref, reactive } from "vue";
import { useStore } from "~/pinia";
import { OutLogin, toast } from "~/Hook/util";
import type { FormInstance, FormRules } from 'element-plus'
import { updatePassword } from "~/api/manager";
import FormDrawer from "~/components/FormDrawer.vue"
import { removeCookie } from "~/Hook/cookie";
import { useRouter } from "vue-router";

type User = {
    avatar: string,
    menus: Object[],
    role: Object,
    ruleNames: string[],
    super: number,
    username: string
}

//用户修改密码

export const useRepassword = () => {
    const store = useStore()
    const router = useRouter()
    const ruleForm = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })

    const drawer = ref<InstanceType<typeof FormDrawer>>()

    const rules = reactive<FormRules>({
        oldpassword: [{ required: true, message: "请输入旧密码", trigger: 'blur' }],
        password: [{ required: true, message: "请输入新密码", trigger: 'blur' }],
        repassword: [{ required: true, message: "请输入新密码", trigger: 'blur' }],
    })
    const ruleFormRef = ref()


    //确认修改密码
    const submitForm = (formEl: FormInstance | undefined) => {
        formEl?.validate((valid) => {

            if (valid) {
                drawer?.value?.showLoading()
                updatePassword(ruleForm).then(res => {
                    // console.log(res);
                    toast("成功", "修改成功，请重新登录")
                    //移除token
                    removeCookie()
                    //清除用户状态
                    store.$patch((state) => {
                        state.user = {} as User
                    })

                    //调回登录页
                    router.push('/login')

                }).finally(() => {
                    drawer?.value?.hideLoading()
                })
            }
        })
    }
    return {
        ruleForm,
        rules,
        ruleFormRef,
        submitForm,
        drawer
    }
}

//用户退出登录
export const GooutLogin = () => {
    const store = useStore()
    const router = useRouter()
    const Out = () => {
        console.log(router);
        OutLogin("警告", "warning", "是否退出登录").then(() => {
            //移除token
            removeCookie()
            //清除用户状态
            store.$patch((state) => {
                state.user = {} as User
            })

            //调回登录页
            router.push('/login')
            //提出登陆成功
            toast("成功", "退出成功", "success")
        })
    }
    return {
        Out
    }
}
