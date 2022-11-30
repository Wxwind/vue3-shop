import { request } from "./request";
import type { RightItem } from "@/api/types";

export const getRightList = (type: "list" | "tree") => {
  return request<any, RightItem[]>({
    url: `/rights/${type}`,
    method: "GET",
  });
};
