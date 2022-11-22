<template>
  <el-menu
    active-text-color="menuActiveText"
    class="el-menu-vertical"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    style="--el-menu-bg-color: menuBg"
    :collapse="!navStore.isNavOpen"
  >
    <el-sub-menu :index="item.id.toString()" v-for="(item, index) in menuList" :key="item.id">
      <template #title>
        <el-icon> <component :is="iconList[index]"></component> </el-icon>
        <span>{{ $t(`menus.${item.path}`) }}</span>
      </template>
      <el-menu-item :index="'/' + it.path" v-for="it in item.children" :key="item.id">
        <el-icon> <component :is="icon"></component> </el-icon>
        <span>{{ $t(`menus.${it.path}`) }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { getMenuList, type MenuItem } from "@/api/menu";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useNavStore } from "@/stores/navStore";

const navStore = useNavStore();

const route = useRoute();
const defaultActive = route.path;
const iconList = ["user", "setting", "shop", "tickets", "pie-chart"];
const icon = "menu";

const menuList = ref<MenuItem[]>();

const initMenuList = async () => {
  let res = await getMenuList();
  menuList.value = res.data;
};

initMenuList();
</script>
<style scoped></style>
