import { request } from "./request";
import type {
  getCategoriesResponse,
  getCategoriesRequest,
  addCategoryResponse,
  addCategoryRequest,
  deleteCategoryResponse,
  editCategoryRequest,
  editCategoryResponse,
} from "./types/categories";

export const getCategories = (params: getCategoriesRequest) => {
  return request<never, getCategoriesResponse>({
    url: "categories",
    method: "GET",
    params,
  });
};

export const addCateItem = (data: addCategoryRequest) => {
  return request<addCategoryRequest, addCategoryResponse>({
    url: "categories",
    method: "POST",
    data: data,
  });
};

export const editCateItem = (id: number, data: editCategoryRequest) => {
  return request<editCategoryRequest, editCategoryResponse>({
    url: `categories/${id}`,
    method: "PUT",
    data: data,
  });
};

export const deleteCateItem = (id: number) => {
  return request<never, deleteCategoryResponse>({
    url: `categories/${id}`,
    method: "GET",
  });
};
