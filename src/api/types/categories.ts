export interface categoryItem {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children: categoryItem[];
}

export interface getCategoriesRequest {
  type?: 1 | 2 | 3;
  pagenum?: number;
  pagesize?: number;
}

export interface getCategoriesResponse {
  total: number;
  result: categoryItem[];
}

export interface addCategoryRequest {
  cat_pid: number;
  cat_name: string;
  cat_level: 0 | 1 | 2;
}

export interface addCategoryResponse {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: string;
}
export interface deleteCategoryResponse {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
}

export interface editCategoryRequest {
  cat_name: string;
}

export interface editCategoryResponse {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
}
