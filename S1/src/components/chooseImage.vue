<template>
    <div v-if="props.modelValue && preview">
        <el-image v-if="typeof props.modelValue == 'string'" :src="props.modelValue" fit="fill"
            class="w-[100px] h-[100px] rounded border mr-3"></el-image>
        <!-- 传入的是数组 -->
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in props.modelValue" :key="index">
                <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full"
                    style="z-index: 10;" @click="removeImage(url)">
                    <CircleClose />
                </el-icon>
                <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-3 mt-1"></el-image>
            </div>
        </div>
    </div>

    <div class="chooseImage" @click="open" v-if="preview">
        <el-icon>
            <Plus />
        </el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogShow" width="80%" top="5vh">
        <el-container class="container" style="height:75vh">
            <el-header class="header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增</el-button>
                <el-button type="success" size="small" @click="handleOpenIpLoad">上传图片</el-button>
            </el-header>
            <el-container class="box">
                <imageAside ref="ImageAsideRef"></imageAside>
                <imageMain :limit="limit" :open-choose="true" ref="handleMainRef" @choose="handleChoose"></imageMain>
            </el-container>
        </el-container>

        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
import imageAside from "~/components/imageAside.vue";
import imageMain from "~/components/imageMain.vue";
import { toast } from "~/Hook/util";

const dialogShow = ref(false)

const callbackFunction = ref<any>()
const open = (callback:any = null) => {
    callbackFunction.value = callback
    dialogShow.value = true
}
const close = () => {
    dialogShow.value = false
}



const handleMainRef = ref()

const ImageAsideRef = ref()

function handleOpenCreate() {
    ImageAsideRef.value.handleCreate()
}

function handleOpenIpLoad() {
    handleMainRef.value.openUploadFile()
}

type Props = {
    modelValue?: any,
    limit?: number,
    preview?:boolean
}
const props = withDefaults(defineProps<Props>(), {
    limit: 1,
    preview:true
})

const emit = defineEmits(['update:modelValue'])

//筛选值url 并通过v-model组件默认值传回去
let urls: Array<any> = []
function handleChoose(e: any) {
    console.log(e);

    urls = e.map((item: any) => item.url)
}

const submit = () => {
    let value = []
    if (props.limit == 1) {
        value = urls[0]
    } else {
        value = props.preview ? [...props.modelValue, ...urls] :[...urls]
        if (value.length > props.limit){
            let limit = props.preview ? props.limit-props.modelValue.length : props.limit
            return toast('警告',`最多还能选择${limit}张`,'warning')
        }
    }
    if (value && props.preview) {
        emit('update:modelValue', value)
    }
    if(!props.preview && typeof callbackFunction.value ==='function'){
        callbackFunction.value(value)
    }
    close()
}

const removeImage = (url: any) => emit("update:modelValue", props.modelValue.filter((u: any) => u != url))

defineExpose({
    open
})
</script> 

<style scoped>
.chooseImage {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}

.container {
    @apply bg-white rounded;
}

.header {
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    @apply flex items-center;
}
</style>