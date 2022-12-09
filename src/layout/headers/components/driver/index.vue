<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <svg-icon name="guide"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { onMounted } from "vue";
import { steps } from "./steps";
import { i18n } from "@/localization";
import { watchLang } from "@/localization/watchLang";

const t = i18n.global.t;

let driver: Driver;
onMounted(() => {
  initDriver();
});

const initDriver = () => {
  driver = new Driver({
    className: "scoped-class", // className to wrap driver.js popover
    animate: false, // Whether to animate or not
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
    padding: 10, // Distance of element from around the edges
    allowClose: true, // Whether the click on overlay should close or not
    overlayClickNext: false, // Whether the click on overlay should move next
    doneBtnText: t("driver.doneBtnText"), // Text on the final button
    closeBtnText: t("driver.closeBtnText"), // Text on the close button for this step
    stageBackground: "#ffffff", // Background color for the staged behind highlighted element
    nextBtnText: t("driver.nextBtnText"), // Next button text for this step
    prevBtnText: t("driver.prevBtnText"), // Previous button text for this step
  });
};

const handleGuide = () => {
  //steps声明成一个函数是因为每次切换语言要刷新里面的文本
  driver.defineSteps(steps());
  driver.start();
};

watchLang((newLang) => {
  initDriver();
});
</script>

<style lang="scss" scoped></style>
