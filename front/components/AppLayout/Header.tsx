import React, { memo, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Menu, ChevronLeft } from '@styled-icons/material'
import { Button } from 'antd'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import SignupForm from 'components/SignupForm'
import LoginForm from 'components/LoginForm'
import { useSelector } from 'react-redux'
import { BUTTON_COLOR, COLOR_MAIN, FONT_COLOR, GRAY } from 'libs/css/color'
import {  ToggleProps, UserState } from 'libs/type'
import SearchForm from 'components/SearchForm/SearchForm'

const ChevronLeftStyle = styled(ChevronLeft)`
  color: ${FONT_COLOR};
`
const MenuStyle = styled(Menu)`
  color: ${FONT_COLOR};
`

const HeaderContainer = styled.header`
  border: 1px solid ${GRAY};
  display: flex;
  margin-bottom: 5rem;
  background: ${COLOR_MAIN};
  height: 50px;
  align-items: center;
  justify-content: space-between;
  right: 0; 
  width: 100%;
  position: fixed;
  z-index: 100;
  & .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: none;
  }
  & .ant-menu-item-sel {
    background-color: none;
  }
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
  color: ${FONT_COLOR};
  border: 1px ${BUTTON_COLOR};
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: none;
    border-color: none;
    color: ${FONT_COLOR};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
    background-color: none;
    border-color: none;
    color: ${FONT_COLOR};
    font-weight: bolder;
  }
`

const HomeIcon = styled(BiMessageRoundedEdit)`
  font-size: 2rem;
`

const HomeButtonContainer = styled.div`
  margin-left: 20%;
  position: absolute;
  display: flex;
  color: ${FONT_COLOR};
  cursor: pointer;
`
const HomeHeader = styled.h2`
  color: ${FONT_COLOR};
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

const SearchFormDiv = styled.div`
  right: 8rem;
  margin: auto;
`

const _Header = (props: ToggleProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { isOpened, toggleDrawer } = props

  const router = useRouter()

  const me = useSelector((state:UserState) => state.user?.me)
  const logInDone = useSelector((state:UserState) => state.user?.logInDone)
  const signUpDone = useSelector((state:UserState) => state.user?.signUpDone)

  const onSignup = useCallback(() => {
    setShowSignUp((prev) => !prev)
    setIsClicked((prev) => !prev)
  }, [showSignUp])

  const onLogin = useCallback(() => {
    setShowLogin((prev) => !prev)
    setIsClicked((prev) => !prev)
  }, [showLogin])



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
          <HomeHeader>My Dairy</HomeHeader>
        </HomeButtonContainer>
        {
          me
          ?
          <SearchFormDiv>
          <SearchForm/>
          </SearchFormDiv>
          : null
        }
        <UserButtonContainer>
          {
            me
            ?
              null
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