<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

import { watch, ref, onMounted } from "vue";
import { useLangStore } from "@/stores/langStore";
import { storeToRefs } from "pinia";

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
const locale = ref<any>();

const initLang = () => {
  locale.value = lang.value === "zh" ? zhCn : en;
};

onMounted(() => {
  initLang();
});

watch(() => {
  return lang.value;
}, initLang);
</script>
