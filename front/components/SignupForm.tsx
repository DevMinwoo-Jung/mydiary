import { Button, Input, Form } from 'antd';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from 'libs/hook/useInput';
import { MdOutlineClose } from 'react-icons/md'
import { BORDER_COLOR, FONT_COLOR, WHITE } from 'libs/css/color';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from 'reducers/user';
import Router from 'next/router';
import useLengthCheck from 'libs/hook/useLengthCheck';
import { UserState } from 'libs/type';
import useEngInput from '../libs/hook/useEngInput';

const LoginFormContainer = styled.div`
  position: fixed;
  width: 320px;
  z-index: 10;
  left: 0;
  right: 0;
  top: 20%;
  vertical-align: middle;
  margin: auto;
  background-color: white;
  -webkit-box-shadow: 0px 0px 9px 1px #a8a8a8; 
  box-shadow: 0px 0px 9px 1px #a8a8a8;
  border-radius: 12px;
`

const FormHeader = styled.h1`
  margin-top: 1rem;
  font-weight: bolder;
`

const FormContainer = styled.div`
  margin: auto;
  width: 80%;
  position: relative;
`
const ButtonStyle = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 2rem;
  background-color: ${WHITE};
  border-color: ${BORDER_COLOR};
  color: ${FONT_COLOR};
  border-color: none;
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
  background-color: ${WHITE};
  border-color: ${BORDER_COLOR};
  color: ${FONT_COLOR};
    font-weight: bolder;
  }
`

const InputStyle = styled(Input)`
  height: 50px;
  border-radius: 12px;
`

const InputPasswordStyle = styled(Input.Password)`
  height: 50px;
  border-radius: 12px;
`

const CloseButton = styled(MdOutlineClose)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`

const AlertMessageStyle = styled.div`
  position: absolute;
  color: #ff4d4f;
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
`

export type SignupFormProps = {
  onSignup: () => void
}

const _SignupForm: FC<SignupFormProps> = (props) => {
  const { onSignup } = props

  const { signUpLoading,
    signUpDone,
    signUpError, me } = useSelector((state:UserState) => state.user)

  const goSignup = () => {
    onSignup()
  }

  const dispatch = useDispatch()
  const [userId, onChangeUserId] = useEngInput('')
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [checkPassword, onChangeCheckPssword] = useInput('')
  const [checkIdLength, alertIdMessage] = useLengthCheck(15, userId, '아이디')
  const [checkNickNameLength, alertNickNameMessage] = useLengthCheck(10, nickname, '닉네임')
  const [checkPwLength, alertPwMessage] = useLengthCheck(20, password, '비밀번호')
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if (checkIdLength
        || checkNickNameLength
        || checkPwLength
        || passwordAlert) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [checkIdLength, checkNickNameLength, checkPwLength, passwordAlert])

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/') // 뒤로가기 했을 때 그 페이지 안나오기 하려면
    }
  }, [me && me.id])

  useEffect(() => {
    if (checkPassword !== password) {
      setPasswordAlert(true)
    } else {
      setPasswordAlert(false)
    }
  }, [checkPassword, password])

  useEffect(() => {
    if (signUpDone) {
      Router.push('/')
    }
  }, [signUpDone])

  useEffect(() => {
    if (signUpError) {
      alert(signUpError)
    }
  }, [signUpError])

  const onSubmit = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, userId, nickname },
    });
  }, [email, password, userId, nickname]);

  return (
    <LoginFormContainer>
      <FormHeader>회원가입</FormHeader>
      <CloseButton onClick={goSignup} />
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            required
          >
            <InputStyle value={userId} onChange={onChangeUserId} placeholder="아이디" maxLength={15} />
            {
              checkIdLength === true
                ? <AlertMessageStyle>{alertIdMessage}</AlertMessageStyle>
                : null
            }
          </Form.Item>
          <Form.Item
            name="nickname"
            required
          >
            <InputStyle value={nickname} onChange={onChangeNickname} placeholder="닉네임" maxLength={10} />
            {
              checkNickNameLength === true
                ? <AlertMessageStyle>{alertNickNameMessage}</AlertMessageStyle>
                : null
            }
          </Form.Item>
          <Form.Item
            name="email"
            required
            rules={[{ required: true, message: '올바른 이메일 형식이 아닙니다.' }]}
          >
            <InputStyle value={email} onChange={onChangeEmail} type="email" placeholder="이메일" maxLength={40} />
          </Form.Item>
          <Form.Item
            name="password"
            required
          >
            <InputPasswordStyle value={password} onChange={onChangePassword} placeholder="비밀번호" maxLength={20} />
            {
              checkPwLength === true
                ? <AlertMessageStyle>{alertPwMessage}</AlertMessageStyle>
                : null
            }
          </Form.Item>
          <Form.Item
            name="passwordCheck"
            required
          >
            <InputPasswordStyle value={checkPassword} onChange={onChangeCheckPssword} placeholder="비밀번호 확인" maxLength={20} />
            {
              passwordAlert === false ? null
                : <AlertMessageStyle>비밀번호가 일치하지 않습니다.</AlertMessageStyle>
            }
          </Form.Item>
          <ButtonStyle disabled={buttonDisabled} htmlType="submit" loading={signUpLoading}>
            회원가입
          </ButtonStyle>
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const SignupForm = memo(_SignupForm)

export default SignupForm
