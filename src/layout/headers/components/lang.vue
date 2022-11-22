<template>
  <el-dropdown @command="handleCommand">
    <svg-icon name="language"></svg-icon>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLang === 'zh'">简体中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLang === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLangStore } from "@/stores/langStore";
import { computed } from "vue";

const i18n = useI18n();
const currentLang = computed(() => i18n.locale.value);

const langStore = useLangStore();
const handleCommand = (val: string) => {
  langStore.switchLanguage(val);
  i18n.locale.value = val;
  localStorage.setItem("lang", val);
};
</script>

<style lang="scss" scoped></style>
