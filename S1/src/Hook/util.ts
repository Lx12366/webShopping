import { Warning } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from "nprogress";
//封装消息提示框
export const toast = (title: string, message: any, type: any = 'success') => {
  ElNotification({
    title,
    message,
    type,
    duration: 2500,
    dangerouslyUseHTMLString: false
  })
}


//退出登录
export const OutLogin = (title: string, type: any = 'Warning', content: string) => {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}

//显示全屏loading
export function ShowFullLoading() {
  nprogress.start()
}

//隐藏全屏loading
export function DoneFullLoading() {
  nprogress.done()
}

//封装消息弹出框
export function showPrompt(tip: string, value = '') {
  return ElMessageBox.prompt(tip, '重命名', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value,
    //这里是校验属性
    // inputPattern:
    //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    // inputErrorMessage: '输错啦！',
  })
}


//将query对象转化为url参数  商品列表api 构造URL请求  api/goods处使用
export function queryParams(query: any) {
  //判断传进来的对象是否存在  存在就拼接到url后面
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join("&")
  r = r ? ("?" + r) : ""
  return r
}


//商品规格上移
export function useArrayMoveUp(arr: Array<any>, index: any) {
  swapArray(arr, index, index - 1)
}



export function showModal(content: any = "提示内容", type: any = "warning", title: any = "") {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}

//下移
export function useArrayMoveDown(arr: Array<any>, index: any) {
  swapArray(arr, index, index + 1)
}



//调换数组
function swapArray(arr: Array<any>, index1: any, index2: any) {
  //splice返回删除的元素 两个元素变动位置
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// sku排列算法

export function cartesianProductOf(...arg:any) {
  console.log('我是排列-----',arg);
  console.log(arguments);
  
  return Array.prototype.reduce.call(arg, function (a: any, b: any) {
    var ret: any = [];
    a.forEach(function (a: any) {
      b.forEach(function (b: any) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [
    []
  ]);
}



