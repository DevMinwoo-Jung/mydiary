import React, { memo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Menu, ChevronLeft } from '@styled-icons/material'
import { Button } from 'antd'
import { CgGym } from 'react-icons/cg'

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
`
const HomeHeader = styled.h2`
  color: white;
  margin: 0 0 0 1rem; 
`
const _Header = (props: HeaderProps) => {
  const { isOpened, toggleDrawer } = props
  let isLogin = true

  const router = useRouter()
  
  return (
    <HeaderContainer>
        <IconContainer onClick={toggleDrawer}>
        {isOpened ? <ChevronLeft /> : <Menu />}
        </IconContainer>
        <HomeButtonContainer>
          <GymIcon/>
          <HomeHeader>Health Dairy</HomeHeader>
        </HomeButtonContainer>
        <UserButtonContainer>
          {
            isLogin 
            ?
              <ButtonStyle type="primary">로그아웃</ButtonStyle>
            :
              <ButtonStyle type="primary">로그인</ButtonStyle>
          }
          {
            isLogin 
            ?
              <ButtonStyle type="primary">내정보</ButtonStyle>
            :
              <ButtonStyle type="primary">회원가입</ButtonStyle>
          }
        </UserButtonContainer>
    </HeaderContainer>
  )
}

const Header = memo(_Header)

export default Header