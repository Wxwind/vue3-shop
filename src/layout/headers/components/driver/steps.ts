import { i18n } from "@/localization";

const t = i18n.global.t;

export const steps = () => [
  {
    element: "#guide",
    popover: {
      title: t("driver.guideBtn"),
      description: "Body of the popover",
      position: "left",
    },
  },
  {
    element: "#hamburger", //
    popover: {
      title: t("driver.hamburgerBtn"),
      description: "Body of the popover",
      position: "bottom",
    },
  },
  {
    element: "#screenFull",
    popover: {
      title: t("driver.fullScreenBtn"),
      description: "Body of the popover",
      position: "left",
    },
  },
];
