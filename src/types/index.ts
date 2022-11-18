export interface MyResponseType<T> {
  meta: metaType;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: string;
  rid: string;
  username: string;
  mobile: string;
  email: string;
}

interface metaType {
  status: number;
  msg: string;
}
