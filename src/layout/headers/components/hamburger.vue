<template>
  <div class="hamburger-container" @click="onClick" id="hamburger">
    <svg-icon :name="icon"></svg-icon>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useNavStore } from "@/stores/navStore";
const navStore = useNavStore();
const onClick = () => {
  navStore.switchNavState();
};

const icon = computed(() => {
  return navStore.isNavOpen === true ? "hamburger-opened" : "hamburger-closed";
});
</script>
<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
