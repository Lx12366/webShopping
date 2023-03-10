import { useCookies } from '@vueuse/integrations/useCookies' //导入vueuse插件的cookie函数
//设置cookie调用
const TokenKey = "admin-token"
const cookie = useCookies()
//获取token值
export const getCookie=()=>{
   return cookie.get(TokenKey)
}

//设置token值
export const setCookie=(token:string)=>{
    cookie.set(TokenKey,token)
}

//删除token值
export const removeCookie=()=>{
    cookie.remove(TokenKey)
}

