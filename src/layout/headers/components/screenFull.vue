<template>
  <div @click="handleFullScreen" class="fullScreenBtn" id="screenFull">
    <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isFullscreen = ref(screenfull.isFullscreen);
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};

const changeIcon = () => {
  isFullscreen.value = screenfull.isFullscreen;
};
onMounted(() => {
  screenfull.on("change", changeIcon);
}),
  onBeforeUnmount(() => {
    screenfull.off("change", changeIcon);
  });
</script>

<style lang="scss" scoped>
.fullScreenBtn {
  cursor: pointer;
}
</style>
