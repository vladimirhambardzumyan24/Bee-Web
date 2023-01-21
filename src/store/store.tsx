import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducers/authenticationReducer'
import { AuthInitialState } from '../global-components/GlobalTypes'

interface StoreType {
  authenticationState: AuthInitialState
}

const store = configureStore<StoreType>({
  reducer: {
    authenticationState: authenticationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
