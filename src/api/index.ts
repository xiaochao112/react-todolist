import request from '@/utils/request';

export function get<T>(url: string, params?: object) {
  return request.get<T>(url, params);
}
export function post<T, P>(url: string, params: P) {
  console.log(111);

  return request.post<T, P>(url, params);
}
export function put<T>(url: string, params?: object) {
  return request.put<T>(url, params);
}
export function del<T>(url: string, params?: object) {
  return request.delete<T>(url, params);
}
