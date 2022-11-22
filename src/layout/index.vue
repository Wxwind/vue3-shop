<template>
  <el-container class="app-wrapper">
    <el-aside class="sidebar-container" style="--el-aside-width: asideWidth"><Menu /></el-aside>
    <el-container class="container" :class="{ hidderContainer: !navStore.isNavOpen }">
      <el-header><Headers /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./menu/index.vue";
import Headers from "./headers/index.vue";
import { computed } from "vue";
import { useNavStore } from "@/stores/navStore";
const navStore = useNavStore();
const asideWidth = computed(() => {
  return navStore.isNavOpen ? "$sideBarWidth" : "$hideSideBarWidth";
});
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

:deep(.el-header) {
  padding: 0;
}
</style>
