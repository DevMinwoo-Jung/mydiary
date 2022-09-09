import React, { memo } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { FONT_WHITE, COLOR_MAIN, WHITE } from '../../libs/css/color'
import UserInfoMini from 'components/Profile/UserInfoMini'
import { ToggleProps } from 'libs/type'

const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: ${COLOR_MAIN};
  width: ${(props) => (props.isOpened ? "10rem" : "0")};
  transition: width 0.5s;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  border: 1px solid ${COLOR_MAIN};
  & .ant-menu-item::after {
    border-right: ${COLOR_MAIN};
  }
  & li:first-child {
    height: 15vh;
    cursor: default;
    background: ${COLOR_MAIN};
    pointer-events: none;
  }
`;

const MenuStyle = styled(Menu)`
  background: ${COLOR_MAIN};
  color: ${FONT_WHITE};
  width: 10rem;
  border-color: ${COLOR_MAIN};
`

const UserInfoContainer = styled.div`

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
  } as MenuItem;
}

const _Slider = (props: ToggleProps) => {
  const { isOpened, toggleDrawer } = props
  const router = useRouter()
  const items: MenuItem[] = [
    getItem('','0', <UserInfoContainer><UserInfoMini/></UserInfoContainer>),
    getItem('메인화면', '1', <HomeOutlined />),
    getItem('내 정보', '2', <UserOutlined />),
    getItem('기록 보기', '3', <BarChartOutlined />)]
    
  const onMoveRecord = (e) => {
    if (e.keyPath[0] === '1') {
      router.push('/')
      toggleDrawer(false)
    } else if (e.keyPath[0] === '2') {
      router.push('/profile')
      toggleDrawer(false)
    } else if (e.keyPath[0] === '3') {
      router.push('/record')
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