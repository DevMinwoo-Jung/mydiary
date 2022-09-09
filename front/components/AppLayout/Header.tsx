import React, { memo, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Menu, ChevronLeft } from '@styled-icons/material'
import { Button } from 'antd'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import SignupForm from 'components/SignupForm'
import LoginForm from 'components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from 'reducers/user'
import { BUTTON_COLOR, COLOR_MAIN, WHITE } from 'libs/css/color'
import { ToggleProps } from 'libs/type'

const ChevronLeftStyle = styled(ChevronLeft)`
  color: ${WHITE};
`
const MenuStyle = styled(Menu)`
  color: ${WHITE};
`

const HeaderContainer = styled.header`
  display: flex;
  background: ${COLOR_MAIN};
  height: 50px;
  align-items: center;
  justify-content: space-between;
  right: 0; 
  width: 100%;
  position: relative;
  z-index: 100;
`;

const IconContainer = styled.div`
  padding: 10px;
  & svg {
    height: 30px;
    cursor: pointer;
  }
`;

const UserButtonContainer = styled.div`
  & button {
    cursor: pointer;
  }
`

const ButtonStyle = styled(Button)`
  font-size: 12px;
  margin: 5px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  border-color: ${BUTTON_COLOR};
  &:hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
  &::selection {
    background-color: ${BUTTON_COLOR};
  }
`

const HomeIcon = styled(BiMessageRoundedEdit)`
  font-size: 2rem;
`

const HomeButtonContainer = styled.div`
  margin: auto;
  display: flex;
  color: white;
  cursor: pointer;
`
const HomeHeader = styled.h2`
  color: white;
  margin: 0 0 0 1rem; 
`

const SignupLoginFormContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`

const _Header = (props: ToggleProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { isOpened, toggleDrawer } = props

  const router = useRouter()
  const dispatch = useDispatch()

  const { me, logInDone, signUpDone } = useSelector((state) => state.user)

  const onSignup = useCallback(() => {
    setShowSignUp((prev) => !prev)
    setIsClicked((prev) => !prev)
  }, [showSignUp])

  const onLogin = useCallback(() => {
    setShowLogin((prev) => !prev)
    setIsClicked((prev) => !prev)
  }, [showLogin])

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
    router.push('/')
  }, [isLogin])

  const onHome = useCallback(() => {
    router.push('/')
    toggleDrawer(false)
  }, [])

  useEffect(() => {
    if (signUpDone === true) {
      setShowSignUp((prev) => !prev)
      setIsClicked((prev) => !prev)
    }
  }, [signUpDone])

  useEffect(() => {
    logInDone === true ? setIsLogin(true) : setIsLogin(false)
  }, [logInDone])
  
  return (
    <>
    <HeaderContainer>
        <IconContainer>
          {
            me 
            ? <> {isOpened ? <ChevronLeftStyle onClick={() => toggleDrawer(false)}/> : <MenuStyle onClick={() => toggleDrawer(true)}/>} </>
            : null
          }
        </IconContainer>
        <HomeButtonContainer onClick={onHome}>
          <HomeIcon/>
          <HomeHeader>My Dairy</HomeHeader>
        </HomeButtonContainer>
        <UserButtonContainer>
          {
            me
            ?
              <ButtonStyle onClick={onLogout}>로그아웃</ButtonStyle>
            :
              <ButtonStyle disabled={isClicked} onClick={onLogin}>로그인</ButtonStyle>
          }
          {
            me
            ?
              null
            :
              <ButtonStyle disabled={isClicked} onClick={onSignup}>회원가입</ButtonStyle>
          }
        </UserButtonContainer>
    </HeaderContainer>
      {
        showSignUp 
          ?
          <SignupLoginFormContainer>
            <SignupForm onSignup={onSignup}/>
          </SignupLoginFormContainer>
          :
          null
        }
        {
        showLogin
          ?
          <SignupLoginFormContainer>
            <LoginForm onLogin={onLogin}/>
          </SignupLoginFormContainer>
          :
          null
      }  
    </>
  )
}

const Header = memo(_Header)

export default Header