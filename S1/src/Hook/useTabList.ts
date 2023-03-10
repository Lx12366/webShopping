import { ref } from 'vue'

import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {
    const route = useRoute()
    const router = useRouter()

    const cookie = useCookies()
    type tabs = {
        title: any,
        path: string
    }


    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        }
    ])

    const addTab = (tab: tabs) => {
        //判断 当前点击左侧菜单栏时  tabs标签栏没有与之对应的标签时  添加该标签到tabList 同时设置cookie
        //findindex查找 当没有找到时返回-1
        let noTab = tabList.value.findIndex(item => item.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set('tagList', tabList.value)
    }
    //路由钩子 发生变化时 标签页添加标签
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })


    const TabChange = (e: any) => {
        activeTab.value = e
        router.push(e)
    }
    //tabs标签页删除标签函数
    function removeTab(e: string) {
        let tabs = tabList.value
        let active = activeTab.value
        if (active == e) {
            //当前点击删除标签路由=激活的路由时
            tabs.forEach((item, index) => {
                if (item.path == e) {
                    let flag = tabs[index + 1] || tabs[index - 1]
                    if (flag) {
                        active = flag.path
                    }
                }
            })
        }
        activeTab.value = active
        //删除点击删除的标签 更新tablist数组
        tabList.value = tabList.value.filter(item => item.path != e)
        cookie.set("tabList", tabList.value)

    }


    function initTagList() {
        let ttt = cookie.get("tagList")
        console.log(ttt);

        if (ttt) {
            tabList.value = ttt
        }
    }
    initTagList()


    //标签页下拉菜单
    function dropDown(e: string) {
        switch (e) {
            case 'clearOther':
                //删除其他标签 filter过滤 
                tabList.value = tabList.value.filter(item => item.path == '/' || item.path == activeTab.value)
                break;
            case 'allClear':
                //关闭所有标签（除了首页） 激活定位到首页  除了首页都删除
                activeTab.value = '/';
                tabList.value.splice(1)
                break;
            default:
                break;
        }

    }
return {
    activeTab,
    tabList,
    TabChange,
    removeTab,
    dropDown
}
}