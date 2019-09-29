import { LOGIN_STATE } from './constants';

export const isLogined = function() {
  return localStorage.getItem(LOGIN_STATE) || 1;
};

export const setLogined = function(val) {
  return localStorage.setItem(LOGIN_STATE, val);
};
