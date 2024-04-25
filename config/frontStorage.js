import request from "@/utils/request";

export function list(params) {
  return request({
    url: "/system/system/frontStorage/list",
    method: "get",
    params,
  });
}

export function detail(params) {
  return request({
    url: "/system/system/frontStorage/detail",
    method: "get",
    params,
  });
}

export function add(data) {
  return request({
    url: "/system/system/frontStorage",
    method: "post",
    data,
  });
}

export function update(data) {
  return request({
    url: "/system/system/frontStorage",
    method: "put",
    data,
  });
}

export function del(params) {
  return request({
    url: "/system/system/frontStorage/delete",
    method: "post",
    params,
  });
}

export function expt(params) {
  return request({
    url: "/system/system/frontStorage/export",
    method: "post",
    params,
  });
}
