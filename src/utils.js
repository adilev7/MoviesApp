import { LS_ACCOUNT, LS_SESSION, LS_TOKEN, API_IMG_URL } from "@/constants";

export const ls = window.localStorage;

export const checkApiAuth = () => ls.getItem(LS_TOKEN) && ls.getItem(LS_SESSION) && ls.getItem(LS_ACCOUNT);

export const getApiImageUrl = (path, size) => {
  const imgSize = !size || size === 'original' ? 'original' : `w${size}`;
  return `${API_IMG_URL}/${imgSize}/${path.replace('/', '')}`
}