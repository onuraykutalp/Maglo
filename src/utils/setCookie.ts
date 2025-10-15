export function setCookie(name: string, value: string, days = 1) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  
  const isLocal = window.location.hostname === "localhost" || window.location.protocol === "http:";
  const secureFlag = isLocal ? "" : "; secure";
  document.cookie = `${name}=${value || ""}${expires}; path=/; sameSite=Strict${secureFlag}`;
}