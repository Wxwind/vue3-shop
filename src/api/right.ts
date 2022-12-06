import { request } from "./request";
import type { RightListItem, RightTreeItem, MyResponseType } from "@/api/types";

export function getRightList(type: "list"): Promise<MyResponseType<RightListItem[]>>;
export function getRightList(type: "tree"): Promise<MyResponseType<RightTreeItem[]>>;
export function getRightList(type: "list" | "tree"): Promise<MyResponseType<RightListItem[] | RightTreeItem[]>> {
  return request<null, RightListItem[] | RightTreeItem[]>({
    url: `/rights/${type}`,
    method: "GET",
  });
}

export function editRightList(roleId: number, rightIds: string) {
  return request<string, null>({
    url: `roles/${roleId}/rights`,
    method: "POST",
    data: rightIds,
  });
}
