import { createSlice } from '@reduxjs/toolkit'
import { AuthInitialState } from '../../../src/global-components/GlobalTypes'
import {
  getUserDataCookie,
  removeUserDataCookie,
  setUserDataCookie
} from '../../../src/utils/CookieUtils'

const initialState: AuthInitialState = {
  userData: getUserDataCookie() || null
}

export const AuthReducer = createSlice({
  name: 'authenticationReducer',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      setUserDataCookie(payload)
      return {
        ...state,
        userData: payload
      }
    },
    logOut: state => {
      removeUserDataCookie()
      return {
        ...state,
        userData: null
      }
    }
  }
})

export const { setUserData, logOut } = AuthReducer.actions

export default AuthReducer.reducer
