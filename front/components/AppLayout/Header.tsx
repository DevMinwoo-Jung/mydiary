import React, { memo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Menu, ChevronLeft } from '@styled-icons/material'
import { Button } from 'antd'

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
  color: #fc86aa;
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
    margin: 5px;
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
        <UserButtonContainer>
          <ButtonStyle type="primary">{isLogin ? '로그아웃' : '로그인'}</ButtonStyle>
          <ButtonStyle type="primary">{isLogin ? '내정보' : '회원가입'}</ButtonStyle>
        </UserButtonContainer>
    </HeaderContainer>
  )
}

const Header = memo(_Header)

export default Header