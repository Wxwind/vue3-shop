<template>
  <el-container class="app-container">
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

.sidebar-container {
  transition: width #{$sideBarDuration};
  // width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: $menuBg;

  :deep(.el-menu) {
    background-color: $menuBg;
    border: none;
    height: 100%;
    width: 100%;
  }

  :deep(.el-menu-vertical:not(.el-menu--collapse)) {
    width: 200px;
    min-height: 400px;
  }

  // 重置 element-plus 的css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 16px;
  }

  .sub-el-icon {
    margin-right: 12px;
    margin-left: -2px;
  }

  .is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
  }
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
  padding: 0 0;
}
</style>
