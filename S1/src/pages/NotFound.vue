<template>
    <!--表示路径输入错误的时候跳转页面    详情查询vuerouter官网-->
<el-result title="404" sub-title="哎呀！给走丢了！！">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang='ts'>

</script>

<style scoped>

</style>