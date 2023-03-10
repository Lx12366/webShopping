import { defineStore } from "pinia";
import { getInfo, login } from "~/api/manager";
import { toast } from "~/Hook/util";
import { setCookie } from "~/Hook/cookie";
import { User } from "@element-plus/icons-vue";


type formType = {
    username: string,
    password: string
}

type User = {
    avatar: string,
    menus: Object[],
    role: Object,
    ruleNames: string[],
    super: number,
    username: string
}

export const useStore = defineStore('Main', {
    state: () => {
        return {
            user: <User>{},
            asideWidth: "250px",
            menus:<Object>[],
            ruleNames:<any>[]
        }
    },
    getters: {

    },
    actions: {
        SET_USER(user: any) {
            this.user = user
        },
        get_info() {
            //获取用户信息
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    this.SET_USER(res)
                    this.SET_MENUS()
                    this.SET_RULENAMES()
                    resolve(res)
                }, err => {
                    reject(err)
                })
            })
        },
        Login({ username, password }: formType) {
            //调用登录接口实现登录，并返回token的值
            return new Promise((resolve, reject) => {
                login(username, password).then((res: any) => {
                    toast('成功', '登录成功', 'success')
                    setCookie(res.token)
                    resolve(res.token)
                }).catch(err => {
                    reject(err)
                })

            })

        },
        handleAsideWidth() {
            //改变菜单栏宽度函数
            this.asideWidth = (this.asideWidth == "250px" ? "64px" : "250px")
        },
        SET_MENUS(){
            this.menus = this.user.menus
        },
        SET_RULENAMES(){
            this.ruleNames = this.user.ruleNames
        }
    }
})