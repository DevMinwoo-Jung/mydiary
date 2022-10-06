/* eslint-disable no-undef */
import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import UserInfoMini from 'components/Profile/UserInfoMini'
import { ToggleProps } from 'libs/type'
import { POST_REQUEST_FASLE, REMOVE_POSTS } from 'reducers/post'
import { LOG_OUT_REQUEST } from 'reducers/user'
import { useDispatch } from 'react-redux'
import { COLOR_MAIN, FONT_COLOR, GRAY, WHITE } from '../../libs/css/color';

// eslint-disable-next-line no-undef
const SidebarContainer = styled.aside < { isOpened: boolean } > `
  margin-top: 3rem;
  background: ${COLOR_MAIN};
  width: ${(props) => (props.isOpened ? '10rem' : '0')};
  transition: width 0.5s;
  overflow: hidden;
  position: fixed;
  z-index: 10;
  border: 1px solid ${GRAY};
  & .ant-menu-item::after {
    border-right: ${COLOR_MAIN};
  }
  & li:first-child {
    height: 15vh;
    cursor: default;
    background: ${COLOR_MAIN};
    pointer-events: none;
  }
  & .ant-menu-item-selected {
    background-color: ${WHITE} !important;
    color: black;
  }
`;

const MenuStyle = styled(Menu)`
  color: ${FONT_COLOR};
  width: 10rem;
  border-color: ${GRAY};
`

const UserInfoContainer = styled.div`

`

const LogoutContainer = styled.div`
  width: 100%;
`
const LogoutOutlinedStyled = styled(LogoutOutlined)`
  margin-right: 0.5rem;
`

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

const _Slider = (props: ToggleProps) => {
  const { isOpened, toggleDrawer } = props
  const router = useRouter()
  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
    dispatch({
      type: REMOVE_POSTS,
    })
    router.push('/')
    dispatch({
      type: POST_REQUEST_FASLE,
    })
    toggleDrawer(false);
  }, [])

  const items: MenuItem[] = [
    getItem('', '0', <UserInfoContainer><UserInfoMini /></UserInfoContainer>),
    getItem('메인화면', '1', <HomeOutlined />),
    getItem('내 정보', '2', <UserOutlined />),
    getItem('', '3', <LogoutContainer onClick={onLogout}><LogoutOutlinedStyled />로그아웃</LogoutContainer>)]
  const onMoveRecord = (e) => {
    if (e.keyPath[0] === '1') {
      router.push('/')
      toggleDrawer(false)
    } else if (e.keyPath[0] === '2') {
      router.push('/profile')
      toggleDrawer(false)
    }
  }
  return (
    <SidebarContainer isOpened={isOpened}>
      <MenuStyle onClick={onMoveRecord} defaultSelectedKeys={['1']} mode="inline" items={items} />
    </SidebarContainer>
  )
}

const Slider = memo(_Slider)

export default Slider
