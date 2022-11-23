export interface getUserResponse {
  total: number;
  pagenum: number;
  users: [
    {
      id: number;
      username: string;
      mobile: string;
      type: number;
      email: string;
      create_time: string;
      mg_state: number; // 当前用户的状态
      role_name: string;
    }
  ];
}

export interface getUserRequest {
  query: string;
  pagenum: number;
  pagesize: number;
}

export interface changeUserStateResponse {
  id: number;
  rid: number;
  username: string;
  mobile: string;
  email: string;
  mg_state: 0;
}

export interface addUserRequest {
  username: string;
  password: string;
  mobile: string;
  email: string;
}

export interface addUserResponse {
  id: number;
  role_id: number;
  username: string;
  mobile: string;
  email: string;
  create_time: number;
}

export interface editUserRequest {
  id: number;
  mobile: string;
  email: string;
}

export interface editUserResponse {
  id: number;
  role_id: number;
  mobile: string;
  email: string;
}
