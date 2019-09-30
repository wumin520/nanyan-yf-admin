import { LOGIN_STATE } from "./constants";

export const isLogined = function() {
  return localStorage.getItem(LOGIN_STATE) || 1;
};

export const setLogined = function(val) {
  return localStorage.setItem(LOGIN_STATE, val);
};

export const transformMenuData = function transformMenuData(arr) {
  let result = [];
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];
    let obj = {
      id: item.id,
      key: item.id,
      title: item.name,
      name: item.name,
      url: item.url
    };
    if (item.childEbResourceVos && item.childEbResourceVos.length > 0) {
      obj.children = transformMenuData(item.childEbResourceVos);
    }
    result.push(obj);
  }
  return result;
};
