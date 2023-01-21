import { UserDataType } from '../global-components/GlobalTypes'
import cookies from '../helpers/addCookies'
import { CookieSetOptions } from 'universal-cookie/cjs/types'

const USER_DATA_COOKIE_NAME = 'userData'
const DEFAULT_COOKIE_OPTIONS: CookieSetOptions = {
  path: '/'
}

export const setUserDataCookie = (userData: UserDataType): void => {
  cookies.set(USER_DATA_COOKIE_NAME, userData, DEFAULT_COOKIE_OPTIONS)
}

export const removeUserDataCookie = (): void => {
  cookies.remove(USER_DATA_COOKIE_NAME, DEFAULT_COOKIE_OPTIONS)
}

export const getUserDataCookie = (): UserDataType => {
  return cookies.get(USER_DATA_COOKIE_NAME)
}
