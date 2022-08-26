import React, { FC, memo, useCallback, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import Image from 'next/image'
import { IoLogoGoogle } from 'react-icons/io'
import useInput from 'libs/hook/useInput'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST, LOG_IN_SUCCESS } from 'reducers/user'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'

const LoginFormContainer = styled.div`
  position: absolute;
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
  margin-top: 1rem;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  border-color: ${BUTTON_COLOR};
  & .ant-btn:hover, .ant-btn:focus, ::after {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
    font-size: 100rre;
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

const KakaoLogin = styled.div`
  display: flex;
  width: 100%;
  background-color: #FEE500;
  border-radius: 12px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 1rem;
  cursor: pointer;
  color: black;
`
const CheckboxStyle = styled(Checkbox)`
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 1rem;
`

const CloseButton = styled(MdOutlineClose)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`

export type LoginFormProps = {
  onLogin: () => void
}

const _LoginForm: FC<LoginFormProps> = (props) => {
  const { onLogin } = props
  const { logInLoading, logInError, logInDone } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [userId, onChangeUserId] = useInput('')
  const [password, onChangePassword] = useInput('')

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  useEffect(() => {
    logInDone === true ? onLogin() : ''
  }, [logInDone])

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {userId, password}
    })
  }, [userId, password]);

  return (
    <LoginFormContainer>
      <FormHeader>로그인</FormHeader>
      <CloseButton onClick={onLogin}/>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onSubmitForm}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
          >
            <InputStyle name="userId" value={userId} onChange={onChangeUserId} placeholder='아이디' required />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <InputPasswordStyle name="userPassword" value={password} onChange={onChangePassword} placeholder='비밀번호' required />
          </Form.Item>
          <ButtonStyle htmlType="submit">
              로그인하기
            </ButtonStyle> 
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
            {/* <CheckboxStyle>로그인 상태 유지</CheckboxStyle> */}
          </Form.Item>
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const LoginForm = memo(_LoginForm)

export default LoginForm