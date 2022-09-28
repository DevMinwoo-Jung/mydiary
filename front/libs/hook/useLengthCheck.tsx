import { useState, useEffect } from "react"

export const useLengthCheck = (num:number, input:string, message:string) => {
  const length = num
  const [checkLength, setCheckLength] = useState(false)

  useEffect(() => {
    if (message === '비밀번호'){
      if (input.length >= length || input.length <= 7) {
        setCheckLength(true)
      } else {
        setCheckLength(false)
      }
    } else if (message === '닉네임') {
      if (input.length >= length || input.length <= 1) {
        setCheckLength(true)
      } else {
        setCheckLength(false)
      }
    } else if (message === '아이디') {
      if (input.length >= length ||input.length < 5) {
        setCheckLength(true)
      } else {
        setCheckLength(false)
      }
    }
  })

  if(message == '비밀번호') {
    const alertMessage = `
    ${message}는 8자 이상 ${num}미만이어야 합니다.
    `
    return [checkLength, alertMessage];
  } else if (message == '닉네임') {
    const alertMessage = `
    ${message}은 2자 이상 ${num}미만이어야 합니다.
  ` 
  return [checkLength, alertMessage];
  } else {
    const alertMessage = `
    ${message}는 4자 이상 ${num}미만이어야 합니다.
    ` 
    return [checkLength, alertMessage];
  }
};