import * as Yup from 'yup'
import regexp from '../constants/Regexp'
import TextConstants from '../constants/TextConstants'

export const emailValidation = () => {
  return Yup.string()
    .required(TextConstants.ERROR_TEXT.REQUIRED)
    .matches(regexp.email, TextConstants.ERROR_TEXT.EMAIL)
}

export const passwordValidation = () => {
  return Yup.string()
    .required(TextConstants.ERROR_TEXT.REQUIRED)
    .matches(regexp.password, TextConstants.ERROR_TEXT.PASSWORD)
}
