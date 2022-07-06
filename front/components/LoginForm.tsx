import React, { FC, memo, useCallback, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import Image from 'next/image'
import { IoLogoGoogle } from 'react-icons/io'
import useInput from 'libs/hook/useInput'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction, LOG_IN_SUCCESS } from 'reducers/user'

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
`
const ButtonPara = styled.p`
  position: absolute;
  font-size: 14px;
  width: 100%;
  font-weight: bolder;
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

const GoogleLogin = styled.div`
  width: 100%;
  display: flex;
  background-color: red;
  border-radius: 12px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: white;
`

const ImgStyle = styled(Image)`
  border-radius: 12px;
`

const GoogleLogo = styled(IoLogoGoogle)`
  width: 25px;
  height: 25px;
  margin-left: 0.7rem;
  margin-top: 0.7rem;
  color: white;
`

const CheckboxStyle = styled(Checkbox)`
  position: absolute;
  left: 0;
  top: 0;
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

type user = {

}

const _LoginForm: FC<LoginFormProps> = (props) => {
  const { onLogin } = props
  const { logInLoading, logInError, logInDone } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  console.log(logInError, logInLoading, logInDone)

  const [userId, onChangeUserId] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    dispatch({
      type:LOG_IN_SUCCESS
    })
  }, []);

  const onSocialLogin = useCallback((e) => {
    console.log(e.target)
  }, [])

  return (
    <LoginFormContainer>
      <FormHeader>로그인</FormHeader>
      <CloseButton onClick={onLogin}/>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
          >
            <InputStyle value={userId} onChange={onChangeUserId} placeholder='아이디'/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <InputPasswordStyle value={password} onChange={onChangePassword} placeholder='비밀번호'/>
          </Form.Item>
          <ButtonStyle type="primary" htmlType="submit">
              로그인하기
            </ButtonStyle> 
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
            <CheckboxStyle>로그인 상태 유지</CheckboxStyle>
          </Form.Item>
          <Form.Item>
            <KakaoLogin onClick={onSocialLogin}>   
                <ImgStyle src='/asset/logo/kakaoLogo.png' alt="" width="45px" height="45px"/>
                <ButtonPara>
                  카카오로 로그인하기 
                </ButtonPara>
            </KakaoLogin>
            <GoogleLogin onClick={onSocialLogin}>
                <GoogleLogo/>
                <ButtonPara>
                  구글로 로그인하기
                </ButtonPara>
            </GoogleLogin>
          </Form.Item>
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const LoginForm = memo(_LoginForm)

export default LoginForm