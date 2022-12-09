export * from "./login";
export * from "./menu";
export * from "./user";
export * from "./right";
export * from "./role";
export * from "./categories";

export interface MyResponseType<T> {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
}
