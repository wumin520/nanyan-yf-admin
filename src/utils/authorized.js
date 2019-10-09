import { LOGIN_STATE } from "./constants";

export const isLogined = function() {
  return localStorage.getItem(LOGIN_STATE) || 1;
};

export const setLogined = function(val) {
  return localStorage.setItem(LOGIN_STATE, val);
};

export const transformMenuData = function transformMenuData(arr, excludeButton, disabledButton) {
  let result = [];
  let allButtons = [];
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];
    let obj = {
      id: item.id,
      key: item.id.toString(),
      title: item.name,
      name: item.name,
      url: item.url,
      value: item.id.toString()
    };
    if (disabledButton && item.type == '2') {
      obj.disabled = true;
    }
    if (item.childEbResourceVos && item.childEbResourceVos.length > 0) {
      obj.children = transformMenuData(item.childEbResourceVos, excludeButton, disabledButton);
    }
    if (excludeButton && item.type === '2') {
      allButtons.push(obj);
      window._authoriedButtons = allButtons;
      result = null;
    } else {
      result.push(obj);
    }
  }
  return result;
};
