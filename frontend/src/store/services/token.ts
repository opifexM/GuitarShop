import { AUTH_TOKEN_KEY_NAME } from '../../const.ts';
import { dropCookie, getCookie, saveCookie } from './cookie.ts';

function getToken(): string {
  return getCookie(AUTH_TOKEN_KEY_NAME);
}

function saveToken(token: string = ''): void {
  saveCookie(AUTH_TOKEN_KEY_NAME, token);
}

function dropToken(): void {
  dropCookie(AUTH_TOKEN_KEY_NAME);
}

export { getToken, saveToken, dropToken };
