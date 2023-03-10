import { ref, nextTick, computed } from "vue"
import {
    createGoodsSkusCard,
    updateGoodsSkusCard,
    deleteGoodsSkusCard,
    sortGoodsSkusCard,
    createGoodsSkusCardValue,
    updateGoodsSkusCardValue,
    deleteGoodsSkusCardValue,
    chooseAndSetGoodsSkusCard
} from "~/api/goods";
import { cartesianProductOf } from "~/Hook/util";
import { useArrayMoveUp, useArrayMoveDown } from "~/Hook/util";
//当前商品
export const goodsId = ref(0)


//规格选项列表 (goodsSkusCard表示多规格规格选项的父值  goodsSkusCardValue表示子值)
export const sku_card_list = ref<any>([])

export const sku_list = ref<any>([])

//初始化规格选项列表
export function initSkuCardList(item: any) {
    console.log(item);
    
    sku_card_list.value = item.goodsSkusCard.map((o: any) => {
        o.text = o.name
        o.loading = false
        o.goodsSkusCardValue.map((v: any) => {
            v.text = v.value || '属性值'
            return v
        })
        return o
    })
    sku_list.value = item.goodsSkus

}



// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id: goodsId.value,
        name: "规格选项",
        order: 50,
        type: 0
    }).then((res: any) => {
        //更新规格选项列表
        sku_card_list.value.push({
            ...res,
            text: res.name,
            loading: false,
            goodsSkusCardValue: []
        })
    })
        .finally(() => {
            btnLoading.value = false
        })
}

//修改规格选项
export function handleUpdate(item: any) {
    item.loading = true
    updateGoodsSkusCard(item.id, {
        goods_id: item.goods_id,
        name: item.text,
        order: item.order,
        type: 0
    }).then((res: any) => {
        item.name = item.text
    }).catch((err) => {
        item.text = item.name
    }).finally(() => {
        item.loading = false
    })
}

//删除规格
export function handleDelete(item: any) {
    item.loading = true
    deleteGoodsSkusCard(item.id).then((res: any) => {
        const flag = sku_card_list.value.findIndex((o: any) => o.id == item.id)
        if (flag != -1) {
            sku_card_list.value.splice(flag, 1)
        }
        getTableData()
    })
}


//排序规格选项
export const bodyLoading = ref(false)
export function sortCard(action: any, index: any) {
    let oList = JSON.parse(JSON.stringify(sku_card_list.value))
    let func = action == 'up' ? useArrayMoveUp : useArrayMoveDown
    func(oList, index)
    //给body参数赋值
    let sortData = oList.map((item: any, index: any) => {
        return {
            id: item.id,
            order: index + 1
        }
    })

    bodyLoading.value = true
    sortGoodsSkusCard({
        sortdata: sortData
    }).then((res: any) => {
        func(sku_card_list.value, index)
        getTableData()
    }).finally(() => {
        bodyLoading.value = false
    })

}



// 选择设置规格
export function handleChooseSetGoodsSkusCard(id: any, data: any) {
    let item = sku_card_list.value.find((o: any) => o.id == id)
    item.loading = true
    chooseAndSetGoodsSkusCard(id, data).then((res: any) => {
        //调用接口 传回的值赋值给本地数据
        item.name = item.text = res.goods_skus_card.name
        item.goodsSkusCardValue = res.goods_skus_card_value.map((o: any) => {
            o.text = o.value || '属性值'
            return o
        })
        getTableData()
    }).finally(() => {
        item.loading = false
    })
}


//----------------------------------------------------
//初始化规格item的值
export function initSkuCardItem(id: any) {
    //传入id 在数据中找到符合条件的参数并返回
    const item = sku_card_list.value.find((o: any) => o.id == id)

    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref()



    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value.input.focus()
        })
    }

    //添加触发函数
    const loading = ref(false)
    const handleInputConfirm = () => {
        //当输入框内没哟值的时候 inputVisible隐藏（输入框）什么操作都不用做
        if (!inputValue.value) {
            inputVisible.value = false
            return
        }

        loading.value = true
        createGoodsSkusCardValue({
            "goods_skus_card_id": id,
            "name": item.name, //规格名称
            "order": 50, //排序
            "value": inputValue.value //规格选项名称
        }).then((res: any) => {
            item.goodsSkusCardValue.push({
                ...res,
                text: res.value
            })
            getTableData()
        }).finally(() => {
            loading.value = false
            inputVisible.value = false
            inputValue.value = ''
        })
    }

    //修改item规格值时触发函数
    const handleChange = (value: any, tag: any) => {
        loading.value = true
        console.log(tag);

        updateGoodsSkusCardValue(tag.id, {
            "goods_skus_card_id": id, //规格ID
            "name": item.name, //规格名称
            "order": tag.order, //排序
            "value": value //规格选项名称
        }).then((res: any) => {
            tag.value = value
            getTableData()
        }).catch((err: any) => {
            tag.text = tag.value
        }).finally(() => {
            loading.value = false
        })
    }

    //触发删除事件
    const handleClose = (tag: any) => {
        loading.value = true
        deleteGoodsSkusCardValue(tag.id)
            .then((res: any) => {
                let flag = item.goodsSkusCardValue.findIndex((o: any) => o.id == tag.id)
                if (flag != -1) {
                    item.goodsSkusCardValue.splice(flag, 1)
                }
                getTableData()
            }).finally(() => {
                loading.value = false
            })
    }

    return {
        item,
        inputValue,
        inputVisible,
        InputRef,
        handleClose,
        showInput,
        handleInputConfirm,
        loading,
        handleChange
    }
}


//初始化表格
export function initSkuTable() {
    const skuLabels = computed(() => sku_card_list.value.filter((v: any) => v.goodsSkusCardValue.length > 0))
    //获取表头数据

    const tableThs = computed(() => {
        let length = skuLabels.value.length
        return [
            {
                name: "商品规格",
                colspan: length,
                width: "",
                rowspan: length > 0 ? 1 : 2
            },
            {
                name: "销售价",
                width: "100",
                rowspan: 2
            },
            {
                name: "市场价",
                width: "100",
                rowspan: 2
            },
            {
                name: "成本价",
                width: "100",
                rowspan: 2
            },
            {
                name: "库存",
                width: "100",
                rowspan: 2
            },
            {
                name: "体积",
                width: "100",
                rowspan: 2
            },
            {
                name: "重量",
                width: "100",
                rowspan: 2
            },
            {
                name: "编码",
                width: "100",
                rowspan: 2
            }
        ]
    })
    return {
        skuLabels,
        tableThs,
        sku_list
    }
}

//获取规格表格数据
function getTableData() {
    console.log(sku_list);
    
    setTimeout(() => {
        if (sku_card_list.value.length === 0) return []

        //存放规格选项值组成的树值
        let list: Array<any> = []
        sku_card_list.value.forEach((o: any) => {
            if (o.goodsSkusCardValue && o.goodsSkusCardValue.length > 0) {
                list.push(o.goodsSkusCardValue)
            }
        })
        if (list.length == 0) {
            return []
        }

        //[1,2] + [3,4] =>[{1,3},{1,4},{2,3},{2,4}] sku排列算法重新组合
        let arr: any = cartesianProductOf(...list)


        // 获取之前的规格列表，将规格ID排序之后转化成字符串
        let beforeSkuList = JSON.parse(JSON.stringify(sku_list.value)).map((o:any)=>{
            if(!Array.isArray(o.skus)){
                //变为数组
                o.skus = Object.keys(o.skus).map(k=>o.skus[k])
            }
            o.skusId = o.skus.sort((a:any,b:any)=>a.id - b.id).map((s:any)=>s.id).join(",")
            return o
        })

        sku_list.value = []
        sku_list.value = arr.map((skus:any)=>{
            let o = getBeforeSkuItem(JSON.parse(JSON.stringify(skus)),beforeSkuList)
            return {
                code: o?.code || "",
                cprice:o?.cprice || "0.00",
                goods_id: goodsId.value,
                image: o?.image || "",
                oprice: o?.oprice || "0.00",
                pprice: o?.pprice || "0.00",
                skus,
                stock:o?.stock ||  0,
                volume:o?.volume ||  0,
                weight:o?.weight ||  0,
            }
        })
    }, 200);
}

//新旧比对
function getBeforeSkuItem(skus:any,beforeSkuList:any){
    let skusId = skus.sort((a:any,b:any)=>a.id - b.id).map((s:any)=>s.id).join(",")
    return beforeSkuList.find((o:any)=>{
        if(skus.length > o.skus.length){
            return skusId.indexOf(o.skusId) != -1
        }
        return o.skusId.indexOf(skusId) != -1
    })
}