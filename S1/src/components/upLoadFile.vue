<template>
    <el-upload class="upload-demo" drag :action="upLoadImage" multiple 
        :headers="{ token }" name="img" :data="prop.data"
        :on-success="uploadSuccess" :on-error="uploadError">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup lang='ts'>
//拖拽上传组件
import { upLoadImage } from "~/api/image";
import { getCookie } from "~/Hook/cookie";
import { toast } from "~/Hook/util";
const token = getCookie()

const emit = defineEmits(['success'])

type Props = {
    data: Object
}
const prop = defineProps<Props>()
    console.log(prop.data);

//上传成功和上传失败时调用的方法
function uploadSuccess(response: any, uploadFile: any, uploadFiles: any) {
    console.log(response);
    toast('成功', '上传成功')
    emit('success', { response, uploadFile, uploadFiles })
}
function uploadError(error: any, uploadFile: any, uploadFiles: any) {
    console.log(error);

    let msg = JSON.parse(error.message).msg || '上传失败'
    toast('失败', msg, 'error')
}






</script>

<style scoped>

</style>