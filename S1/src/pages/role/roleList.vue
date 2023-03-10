<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 -->
        <ListHeader @create="handleCreate" @get-list="getData"></ListHeader>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="desc" label="角色描述" width="380" />
            <!-- 修改状态  -->
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handelStatus($event, row)" :loading="row.onStatus" :disabled="row.super == 1">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="openSetRule(scope.row)">配置权限</el-button>
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                    <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <FormDrawer :title="drawerTitle" commit="提交" ref="formDrawerRef" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="角色名称:" prop="name">
                    <el-input v-model="form.name" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述:" prop="desc">
                    <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :rows="5" />
                </el-form-item>
                <el-form-item label="状态:" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </FormDrawer>


        <!-- 权限配置 -->
        <FormDrawer ref="setRuleFormDrawerRef" commit="提交" title="权限配置" @submit="handleSetRuleSubmit">
            <el-tree-v2 ref="elTreeRef" :check-strictly="checkStrictly" :default-expanded-keys="defaultexpandedkeys" :data="ruleList" :props="{ label: 'name', children: 'child' }" show-checkbox
                :height="treeHeight"  @check="handleTreeCheck">
                <template #default="{ node, data }">
                    <el-tag :type="data.menu ? '' : 'info'" size="small">
                        {{ data.menu ? "菜单" : "权限" }}
                    </el-tag>
                    <span class="ml-2 text-sm">{{ data.name }}</span>
                </template>
            </el-tree-v2>
        </FormDrawer>

    </el-card>
</template>
<script setup lang="ts">
import { toast } from "~/Hook/util";
import { ref } from "vue"
import {
    getRuleList
} from "~/api/rule"

import {
    getRoleList,
    createRoleList,
    updateRoleList,
    deleteRoleList,
    updateRoleStatus,
    setRoleRules
} from "~/api/role"
import FormDrawer from "~/components/FormDrawer.vue";
import { useInitTable, useInitForm } from "~/Hook/useCommon";
import ListHeader from "~/components/ListHeader.vue";
const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handelStatus
} = useInitTable({
    searchForm: {
        keyWord: ""
    },
    delete: deleteRoleList,
    getList: getRoleList,
    updateStatus: updateRoleStatus
})


const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit,
} = useInitForm({
    form: {
        name: "",
        desc: "",
        status: 1
    },
    getData,
    create: createRoleList,
    update: updateRoleList
})
//树形节点 属性 父子之间是否绑定
const checkStrictly = ref(false)

const setRuleFormDrawerRef = ref()
const ruleList = ref([])
//高度
const treeHeight = ref(0)

const elTreeRef = ref( )
//获取当前角色的权限id 
const rulesId = ref<any>([])

//默认展开的节点的 key 的数组
const defaultexpandedkeys = ref([])
const roleId = ref(0)
const openSetRule = (row: any) => {
    roleId.value = row.id
    treeHeight.value = window.innerHeight - 180
    checkStrictly.value=true

    getRuleList(1).then((res: any) => {
        ruleList.value = res.list
        defaultexpandedkeys.value=res.list.map((o:any)=>o.id)
        setRuleFormDrawerRef.value.open()

        //获取当前角色的权限id
        rulesId.value = row.rules.map((o:any)=>o.id)
        
        setTimeout(() => {
            //默认选中的数组
            elTreeRef.value.setCheckedKeys(rulesId.value)
            checkStrictly.value=false
        }, 150);
    })
}

const handleSetRuleSubmit = ()=>{
  setRuleFormDrawerRef.value.showLoading()
  setRoleRules(roleId.value,rulesId.value)
  .then((res:any)=>{
    toast("成功","配置成功")
    getData()
    setRuleFormDrawerRef.value.close()
  })
  .finally(()=>{
    setRuleFormDrawerRef.value.hideLoading()
  })
}

const handleTreeCheck = (...e:any)=>{
  const { checkedKeys,halfCheckedKeys } = e[1]
  rulesId.value = [...checkedKeys,...halfCheckedKeys]
}


//数据代码全部封装到hook/usecommon里面去了


</script>