export type { LoginRequest, LoginResponse } from "./login";
export type { MenuItem } from "./menu/menu";

export interface MyResponseType<T> {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
}
