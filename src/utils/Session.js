import {getCookie, setCookie, deleteCookie} from "./cookie";

const LOGIN_COOKIE_NAME = 'sessionId'

console.log("isAuthenticated:", getCookie(LOGIN_COOKIE_NAME))

export function isAuthenticated() {
  return getCookie(LOGIN_COOKIE_NAME)
}

export function logout() {
  deleteCookie(LOGIN_COOKIE_NAME)
  window.location.href = '/';
}
