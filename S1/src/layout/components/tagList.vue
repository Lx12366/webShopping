<template>
  <div class="tabs" :style="{ left: store.asideWidth }">
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" style="min-width:100px" @tab-change="TabChange"
      @tab-remove="removeTab">
      <el-tab-pane v-for="item in tabList" :closable="item.path != '/'" :key="item.path" :label="item.title"
        :name="item.path">

      </el-tab-pane>
    </el-tabs>


    <span class="drop">
      <el-dropdown @command="dropDown">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="allClear">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height:44px"></div>
</template>

<script setup lang='ts'>
import { useStore } from "~/pinia";
import { useTabList } from "~/Hook/useTabList";
const store = useStore()

const {
  activeTab,
  tabList,
  TabChange,
  removeTab,
  dropDown
} = useTabList()

</script>

<style scoped>
.tabs {
  @apply flex items-center fixed bg-gray-100 px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 99;
}

.drop {
  height: 32px;
  width: 32px;
  @apply ml-auto bg-white flex items-center justify-center rounded;
}

:deep(.el-tabs__header) {
  margin: 0;
  border: 0 !important;
  @apply flex items-center;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded my-1;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
}
</style>