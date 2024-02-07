export const DeleteCookie = (name) => {
  document.cookie =
    name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; sameSite=Lax;';
  document.cookie =
    name +
    '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; sameSite=Lax; domain=' +
    window.location.hostname;
};
