export const DeleteCookie = (name) => {
  document.cookie = name + '=; Path=/; sameSite=Lax;';
};
