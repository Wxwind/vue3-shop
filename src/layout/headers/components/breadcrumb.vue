<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index"
      ><span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{ $t(`menus.${item.name}`) }}</span>
      <span class="redirect" v-else @click="handleRedirect(item.path)">{{ $t(`menus.${item.name}`) }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const breadcrumbList = ref<any[]>(route.matched);
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched;
  console.log(route.matched);
};

const handleRedirect = (path: string) => {
  router.push(path);
};

watch(route, () => {
  initBreadcrumbList(), { deep: true, immediate: true };
});
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #97a8be;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: $menuBg;
  }
}
</style>
