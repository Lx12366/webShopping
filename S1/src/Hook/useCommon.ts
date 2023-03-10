///--------------------
///--------------------
///--------------------
//公告模块和图库模块的组件代码封装！！！！！！！！！！！！！！
import { ref, reactive, computed } from "vue";
import { toast } from "~/Hook/util";
//列表分页  搜索  删除 修改状态  多选选中删除
export function useInitTable(options: any = {}) {
    let searchForm: any = null
    let resetSearchForm: any = null
    if (options.searchForm) {
        searchForm = reactive({ ...options.searchForm })
        resetSearchForm = () => {
            for (let key in searchForm) {
                searchForm[key] = options.searchForm[key]
            }
            getData()
        }
    }

    const tableData = ref<any>([])
    const loading = ref(false)

    // current当前分页   total 总页数  limit当前页最大显示条数
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    // 获取数据
    function getData(p: any = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }

        loading.value = true
        options.getList(currentPage.value, searchForm)
            .then((res: any) => {
                if (options.onGetListSuccess && typeof options.onGetListSuccess == 'function') {
                    //options.onGetListSuccess 表示回调函数 
                    options.onGetListSuccess(res)
                } else {
                    tableData.value = res.list
                    total.value = res.totalCount
                }

            })
            .finally(() => {
                loading.value = false
            })
    }
    getData()


    // 修改管理员状态
    function handelStatus(status: any, row: any) {

        console.log(status, row);

        row.onStatus = true
        options.updateStatus(row.id, status).then((res: any) => {
            row.status = status
        }).finally(() => {
            row.onStatus = false
        })

    }
    //删除
    const handleDelete = (id: any) => {
        loading.value = true
        options.delete(id).then((res: any) => {
            toast('成功', "删除成功")
            getData()
        }).finally(() => {
            loading.value = false
        })
    }



    //多选框id值
    const multSelectionIds = ref([])
    const handleSelectionChange = (e: any) => {
        multSelectionIds.value = e.map((o: any) => o.id);
    }

    //批量删除
    const tableRef = ref()
    const handleMultDelete = () => {
        loading.value = true
        options.delete(multSelectionIds.value).then((res: any) => {
            toast('成功', '批量删除成功')
            //清空选中
            if (multSelectionIds.value) {
                tableRef.value.clearSelection()
            }
            getData()
        }).finally(() => {
            loading.value = false
        })

    }

    //批量上架/下架
    const handleMultStatusChange = (status: any) => {
        loading.value = true
        options.updateStatus(multSelectionIds.value, status).then((res: any) => {
            toast('成功', '批量修改成功')
            //清空选中
            if (multSelectionIds.value) {
                tableRef.value.clearSelection()
            }
            getData()
        }).finally(() => {
            loading.value = false
        })

    }


    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handelStatus,
        handleDelete,
        handleSelectionChange,
        tableRef,
        handleMultDelete,
        handleMultStatusChange,
        multSelectionIds,
        
    }
}

//新增  修改 封装
export function useInitForm(options: any = {}) {
    const formDrawerRef = ref()
    const formRef = ref()
    const defaultForm = options.form
    const form = reactive<any>({})
    const rules = options.rules || {}
    const editId = ref(0)
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")



    const handleSubmit = () => {
        formRef.value.validate((valid: any) => {
            if (!valid) return
            //表单提交前要进行什么操作 回调函数
            let body = {}
            if (options.beforeSubmit && typeof options.beforeSubmit == 'function') {
                body = options.beforeSubmit({ ...form })
            } else {
                body = form
            }

            formDrawerRef.value.showLoading()
            const fun = editId.value ? options.update(editId.value, body) : options.create(body)
            fun.then((res: any) => {
                toast('成功', drawerTitle.value + "成功")

                // 修改刷新当前页，新增刷新第一页
                options.getData(editId.value ? false : 1)
                formDrawerRef.value.close()
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })

        })
    }

    // 重置表单
    //每次新增或者修改表单数据都要调用resetform函数 把form数据重新赋值
    function resetForm(row: any = false) {
        if (formRef.value) formRef.value.clearValidate()
        for (const key in defaultForm) {
            form[key] = row[key]
        }
    }

    // 新增
    const handleCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }


    //编辑
    const handleEdit = (row: any) => {
        editId.value = row.id
        console.log(row);

        resetForm(row)
        formDrawerRef.value.open()
    }
    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit
    }
}
