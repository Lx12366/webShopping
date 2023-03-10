import { router, addRoutes } from "./router/index";
import { getCookie } from "~/Hook/cookie";
import { toast, ShowFullLoading, DoneFullLoading } from "~/Hook/util";
import { useStore } from "~/pinia";

//前端路由钩子
let hasGetInfo = true
router.beforeEach(async (to, from, next) => {
    const token = getCookie()
    const store = useStore()
    //显示进度条
    ShowFullLoading()

    //获取cookie的值
    if (!token && to.path !== "/login") {
        //当用户未登录时-即没有token的时候  强制登录
        toast('错误', '用户未登录', 'error')
        return next({ path: "/login" })
    }
    // if (token && to.path == "/login") {
    //     //当用户登录以后还想进入登录页 不让路由跳转
    //     toast('警告', '用户已登录', 'warning')
    //     return next({ path: from.path })
    // }

    let hasNewRoutes = false

   
    if (token && hasGetInfo) {
        //路由前置钩子  路由跳转时（包括页面刷新）时   向服务器重新请求数据 获得用户状态信息给store的User存储
        //每次刷新页面都会请求一次   是否会造成性能问题 可采pinia数据持久化插件解决。。。。2022.12.15
        hasGetInfo=false
        //数据只请求一次
        await store.get_info()
        //动态添加路由
        hasNewRoutes = addRoutes(store.menus)

    }
    document.title = to.meta.title as string + "--龙欣商品"
    
    hasNewRoutes ? next(to.fullPath) : next()
})


router.afterEach((to, from) => {
    //隐藏进度条
    DoneFullLoading()
})