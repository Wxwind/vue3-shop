export interface MenuItem {
  id: number;
  authName: string;
  path: string;
  children: MenuItem[];
  order: number;
}
