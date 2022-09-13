import { Button, Input, Form } from 'antd'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { MdOutlineClose } from 'react-icons/md'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from 'reducers/user'
import Router from 'next/router'

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
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 2rem;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  border-color: none;
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
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

export type SignupFormProps = {
  onSignup: () => void
}

const _SignupForm: FC<SignupFormProps> = (props) => {
  const { onSignup } = props

  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user)

  const goSignup = () => {
    onSignup()
  }

  const dispatch = useDispatch()
  const [userId, onChangeUserId] = useInput('')
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/') // 뒤로가기 했을 때 그 페이지 안나오기 하려면
    }
  },[me && me.id])

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
      data: { email, password, userId, nickname }
    });
  }, [email, password, userId, nickname]);

  return (
    <LoginFormContainer>
      <FormHeader>회원가입</FormHeader>
      <CloseButton onClick={goSignup}/>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
            hasFeedback
            >
            <InputStyle value={userId} onChange={onChangeUserId} placeholder='아이디'/>
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}
            hasFeedback
            >
            <InputStyle value={nickname} onChange={onChangeNickname} placeholder='닉네임'/>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: '올바른 이메일 형식이 아닙니다.' }]}
            hasFeedback
            >
            <InputStyle value={email} onChange={onChangeEmail} type='email' placeholder='이메일'/>
          </Form.Item> 
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
            hasFeedback
            >
            <InputPasswordStyle value={password} onChange={onChangePassword} placeholder='비밀번호'/>
          </Form.Item>
          <Form.Item
            name="passwordCheck"
            required
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '비밀번호를 한번 더 입력해주세요!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 일지하지 않습니다'));
                },
              }),
            ]}
            >
            <InputPasswordStyle placeholder='비밀번호 확인'/>
          </Form.Item>
          <ButtonStyle htmlType="submit" loading={signUpLoading}>
              회원가입
          </ButtonStyle> 
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const SignupForm = memo(_SignupForm)

export default SignupForm