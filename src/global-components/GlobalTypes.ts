export type BlockDataType = {
  id: string
  value: {
    children: { text: string }[]
  }[]
}

export type UserDataType = {
  uid: string
  email: string
} | null

export type AuthInitialState = {
  userData: UserDataType
}
