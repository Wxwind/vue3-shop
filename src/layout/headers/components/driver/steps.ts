import { i18n } from "@/localization";

const t = i18n.global.t;

export const steps = () => [
  {
    element: "#guide",
    popover: {
      title: t("driver.guideBtn"),
      description: t("driver.guideBtnDesc"),
      position: "left",
    },
  },
  {
    element: "#hamburger", //
    popover: {
      title: t("driver.hamburgerBtn"),
      description: t("driver.hamburgerDesc"),
      position: "bottom",
    },
  },
  {
    element: "#screenFull",
    popover: {
      title: t("driver.fullScreenBtn"),
      description: t("driver.fullScreenDesc"),
      position: "left",
    },
  },
];
