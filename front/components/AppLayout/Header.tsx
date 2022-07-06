import React, { memo, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Menu, ChevronLeft } from '@styled-icons/material'
import { Button } from 'antd'
import { CgGym } from 'react-icons/cg'
import SignupForm from 'components/SignupForm'
import LoginForm from 'components/LoginForm'
import { useSelector } from 'react-redux'

type HeaderProps = {
  isOpened: boolean,
  toggleDrawer: () => void,
};

const HeaderContainer = styled.header`
  display: flex;
  background: #00022e;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  color: #4c5aa0;
  right: 0; 
`;

const IconContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  & svg {
    height: 30px;
  }
`;

const UserButtonContainer = styled.div`
  cursor: pointer;
`

const ButtonStyle = styled(Button)`
  font-size: 12px;
  margin: 5px;
`

const GymIcon = styled(CgGym)`
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

const _Header = (props: HeaderProps) => {
  const { isOpened, toggleDrawer } = props

  const [isLogin, setIsLogin] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)  

  const router = useRouter()

  const { logInDone } = useSelector((state) => state.user)

  const onSignup = useCallback(() => {
    setShowSignUp((prev) => !prev)
  }, [showSignUp])

  const onLogin = useCallback(() => {
    setShowLogin((prev) => !prev)
  }, [showLogin])

  const onLogout = useCallback(() => {
    setIsLogin((prev) => !prev)
    router.push('/')
  }, [isLogin])

  const onHome = useCallback(() => {
    router.push('/')
    setIsLogin((prev) => prev === true ? !prev : prev)
    setShowLogin((prev) => prev === true ? !prev : prev)
    setShowSignUp((prev) => prev === true ? !prev : prev)
  }, [])

  useEffect(() => {
    logInDone && setShowLogin(false)
  }, [logInDone])
  
  return (
    <>
    <HeaderContainer>
        <IconContainer onClick={toggleDrawer}>
          {isOpened ? <ChevronLeft /> : <Menu />}
        </IconContainer>
        <HomeButtonContainer onClick={onHome}>
          <GymIcon/>
          <HomeHeader>Health Dairy</HomeHeader>
        </HomeButtonContainer>
        <UserButtonContainer>
          {
            logInDone 
            ?
              <ButtonStyle type="primary" onClick={onLogout}>로그아웃</ButtonStyle>
            :
              <ButtonStyle type="primary" onClick={onLogin}>로그인</ButtonStyle>
          }
          {
            logInDone 
            ?
              <ButtonStyle type="primary" onClick={() => router.push('/profile')}>내정보</ButtonStyle>
            :
              <ButtonStyle type="primary" onClick={onSignup}>회원가입</ButtonStyle>
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