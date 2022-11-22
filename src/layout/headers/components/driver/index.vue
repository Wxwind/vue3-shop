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
    showButtons: true, // Do not show control buttons in footer
    keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
    scrollIntoViewOptions: {}, // We use `scrollIntoView()` when possible, pass here the options for it if you want any
  });
};

const handleGuide = () => {
  driver.defineSteps(steps);
  driver.start();
};

watchLang(() => {
  initDriver();
});
</script>

<style lang="scss" scoped></style>
