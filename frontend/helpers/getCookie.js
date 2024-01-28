export const GetCookie = (name) =>
  document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2);
