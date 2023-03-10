<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 -->
        <ListHeader @create="handleCreate" @get-list="getData"></ListHeader>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
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
                <el-form-item label="公告名称:" prop="title">
                    <el-input v-model="form.title" placeholder="公告名称"></el-input>
                </el-form-item>
                <el-form-item label="公告内容:" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5" />
                </el-form-item>
            </el-form>

        </FormDrawer>
    </el-card>
</template>
<script setup lang="ts">
import {
    getNoticeList,
    createNoticeList,
    updateNoticeList,
    deleteNoticeList
} from "~/api/notice"
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
    handleDelete
} = useInitTable({
    searchForm: {
        keyWord: ""
    },
    delete:deleteNoticeList,
    getList: getNoticeList
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
        title: "",
        content: "",
    },
    getData,
    create: createNoticeList,
    update: updateNoticeList
})


//数据代码全部封装到hook/usecommon里面去了


</script>