import { createRouter, createWebHashHistory } from "vue-router";

import Admin from "~/layout/admin.vue";
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/NotFound.vue"
import goodsList from "~/pages/goods/goodsList.vue";
import categoryList from "~/pages/category/categoryList.vue";
import UserList from '~/pages/user/userList.vue'
import OrderList from '~/pages/order/orderList.vue'
import CommentList from '~/pages/comment/commentList.vue'
import ImageList from '~/pages/image/imageList.vue'
import NoticeList from '~/pages/notice/noticeList.vue'
import SettingBase from '~/pages/setting/settingList.vue'
import CouponList from '~/pages/coupon/couponList.vue'  
import ManagerList from '~/pages/manager/managerList.vue'  
import AccessList from '~/pages/access/accessList.vue'  
import RoleList from '~/pages/role/roleList.vue'  
import SkusList from '~/pages/skus/skusList.vue'  
import levelList from '~/pages/level/levelList.vue'  
import SettingBuy from '~/pages/setting/buy.vue'  
import SettingShip from '~/pages/setting/ship.vue'  
import DistributionIndex from '~/pages/distribution/index.vue'  
import Setting from '~/pages/distribution/setting.vue'  



const routes: any = [
    {
        path: '/',
        name: 'admin',
        component: Admin,

    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: "登录页"
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },

]


//动态添加路由
const asyncRoutes = [
    {
        path: '/',
        name:'/',
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/goods/list',
        name:'/goods/list',
        component: goodsList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/category/list',
        name:'/category/list',
        component: categoryList,
        meta: {
            title: "分类管理"
        }
    },{
        path:"/user/list",
        name:"/user/list",
        component:UserList,
        meta:{
            title:"用户列表"
        }
    },{
        path:"/order/list",
        name:"/order/list",
        component:OrderList,
        meta:{
            title:"订单列表"
        }
    },{
        path:"/comment/list",
        name:"/comment/list",
        component:CommentList,
        meta:{
            title:"评价列表"
        }
    },{
        path:"/image/list",
        name:"/image/list",
        component:ImageList,
        meta:{
            title:"图库列表"
        }
    },{
        path:"/notice/list",
        name:"/notice/list",
        component:NoticeList,
        meta:{
            title:"公告列表"
        }
    },{
        path:"/setting/base",
        name:"/setting/base",
        component:SettingBase,
        meta:{
            title:"配置"
        }
    },{
        path:"/coupon/list",
        name:"/coupon/list",
        component:CouponList,
        meta:{
            title:"优惠券列表"
        }
    },{
        path:"/manager/list",
        name:"/manager/list",
        component:ManagerList,
        meta:{
            title:"管理员管理"
        }
    },{
        path:"/access/list",
        name:"/access/list",
        component:AccessList,
        meta:{
            title:"菜单权限管理"
        }
    },{
        path:"/role/list",
        name:"/role/list",
        component:RoleList,
        meta:{
            title:"角色权限管理"
        }
    },{
        path:"/skus/list",
        name:"/skus/list",
        component:SkusList,
        meta:{
            title:"规格管理"
        }
    },{
        path:"/level/list",
        name:"/level/list",
        component:levelList,
        meta:{
            title:"会员等级"
        }
    },{
        path:"/setting/buy",
        name:"/setting/buy",
        component:SettingBuy,
        meta:{
            title:"支付设置"
        }
    },{
        path:"/setting/ship",
        name:"/setting/ship",
        component:SettingShip,
        meta:{
            title:"物流设置"
        }
    },{
        path:"/distribution/index",
        name:"/distribution/index",
        component:DistributionIndex,
        meta:{
            title:"物流设置"
        }
    },{
        path:"/distribution/setting",
        name:"/distribution/setting",
        component:Setting,
        meta:{
            title:"分销设置"
        }
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//添加动态路由
export function addRoutes(menus: any) {
    //是否有新的路由
    let hasNewRoutes = false
    const AddRoutesMenus = (arr: any) => {
        arr.forEach((item:any) => {
            let flag = asyncRoutes.find(o=>{
                return o.path == item.frontpath
            })
            
            if(flag && !router.hasRoute(flag.path)){
                //给admin路由添加子路由  详情见vue-router官网
                router.addRoute("admin",flag)
                hasNewRoutes=true
            }
            if(item.child && item.child.length>0){
                AddRoutesMenus(item.child)
            }
        })
    }
    AddRoutesMenus(menus)

    return hasNewRoutes
    
}
