import * as yup from 'yup'

const REGEX_PASSWORD= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/
const REGEX_PHONE= /^\+?(\d.*){3,}$/
const REGEX_USERNAME = /^[a-z0-9_-]{3,16}$/
const REGEX_NAME =/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
const REGEX_ADDRESS =  /^(?!^\d+$)^.{5,}$/
const REGEX_NOIDAOTAO = /^(?!^\d+$)^.{3,}$/
const REGEX_DEGREE = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
yup.addMethod(yup.string, 'password', function (
  message,
) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'fullName', function (
  message,
) {
  return this.matches(REGEX_NAME, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'address', function (
  message,
) {
  return this.matches(REGEX_ADDRESS, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'username', function (
  message,
) {
  return this.matches(REGEX_USERNAME, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'phone', function (
  message,
) {
  return this.matches(REGEX_PHONE, {
    message,
    excludeEmptyString: true,
  })
})
yup.addMethod(yup.string, 'gender', function (
  message,
) {
  return this.matches(REGEX_NAME, {
    message,
    excludeEmptyString: true,
  })
})
yup.addMethod(yup.string, 'trainingPlaces', function (
  message,
) {
  return this.matches(REGEX_NOIDAOTAO, {
    message,
    excludeEmptyString: true,
  })
})
yup.addMethod(yup.string, 'degree', function (
  message,
) {
  return this.matches(REGEX_DEGREE, {
    message,
    excludeEmptyString: true,
  })
})
export default yup