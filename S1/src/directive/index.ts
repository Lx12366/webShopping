import { useStore } from "~/pinia";

//判断ruleName中是否有该权限
function hasPermission(value: any, el:HTMLElement) {
   if (!Array.isArray(value)) {
      throw new Error('需要配置权限111！')
   }
   const store = useStore()
         //权限判断  ruleName数组中找得到该值 则判为有该权限
   let flag = store.ruleNames.includes(value[0])
   if (el && !flag) {

      el.parentNode && el.parentNode.removeChild(el)
      // throw new Error('暂无此权限')
   }
   return flag
}

export default {
   install(app: any) {
      app.directive('permission', {
         mounted(el: any, binding: any) {
            hasPermission(binding.value, el)
         }
      })
   }
}

