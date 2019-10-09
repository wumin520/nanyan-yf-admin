import { LOGIN_STATE } from "./constants";

export const isLogined = function() {
  return localStorage.getItem(LOGIN_STATE) || 1;
};

export const setLogined = function(val) {
  return localStorage.setItem(LOGIN_STATE, val);
};

export const transformMenuData = function transformMenuData(arr, excludeButton, disabledButton) {
  let result = [];
  window._authoriedButtons = window._authoriedButtons || [];
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];
    let obj = {
      id: item.id,
      key: item.id.toString(),
      title: item.name,
      name: item.name,
      url: item.url,
      value: item.id.toString(),
      parentId: item.parentId
    };
    if (disabledButton && item.type == '2') {
      obj.disabled = true;
    }
    if (item.childEbResourceVos && item.childEbResourceVos.length > 0) {
      obj.children = transformMenuData(item.childEbResourceVos, excludeButton, disabledButton);
    }
    if (excludeButton && item.type === '2') {
      window._authoriedButtons.push(obj);
      result = null;
    } else {
      result.push(obj);
    }
  }
  return result;
};

export const filterMenuButtons = function(id = window.currentSelectedMenuId) {
  window._authoriedButtons = window._authoriedButtons || [];
  let result = [];
  result = window._authoriedButtons.filter(val => {
    return val.parentId == id;
  });
  result = result.map(val => {
    return {
      buttonName: val.name
    };
  });
  console.log('filterMenuButtons -> ', result);
  return result.join(',');
};
