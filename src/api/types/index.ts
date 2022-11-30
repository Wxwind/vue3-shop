export * from "./login";
export * from "./menu";
export * from "./user";
export * from "./right";

export interface MyResponseType<T> {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
}
