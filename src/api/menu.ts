import type { MenuItem } from "@/types";
import { request } from "./request";

export const getMenuList = () => {
  return request<any, MenuItem[]>({
    url: "/menus",
    method: "GET",
  });
};

export type { MenuItem } from "@/types";
