export interface RightListItem {
  id: number;
  authName: string;
  level: string;
  pid: string;
  path: string;
}

export interface RightTreeItem {
  id: number;
  authName: string;
  pid: string;
  path: string;
  children: RightTreeItem[];
}
