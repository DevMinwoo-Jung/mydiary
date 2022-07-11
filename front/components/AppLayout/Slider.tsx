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
import { FONT_WHITE, HEADER_AND_SLIDER_MAIN } from '../../libs/css/color'

type SidebarProps = {
  isOpened: boolean;
};

const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: ${HEADER_AND_SLIDER_MAIN};
  width: ${(props) => (props.isOpened ? "10rem" : "0")};
  transition: width 0.5s;
  overflow: hidden;
  position: absolute;
  height: calc(100% - 50px);
  z-index: 10;
  border: 1px solid ${HEADER_AND_SLIDER_MAIN};
  & .ant-menu-item::after {
    border-right: ${HEADER_AND_SLIDER_MAIN};
  }
`;

const MenuStyle = styled(Menu)`
  background: ${HEADER_AND_SLIDER_MAIN};
  color: ${FONT_WHITE};
  width: 10rem;
  border-color: ${HEADER_AND_SLIDER_MAIN};
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

const _Slider = (props: SidebarProps) => {
  const { isOpened } = props
  const router = useRouter()
  const items: MenuItem[] = [
    getItem('메인화면', '1', <HomeOutlined />),
    getItem('내 정보', '2', <UserOutlined />),
    getItem('기록 보기', '3', <BarChartOutlined />)]
    
  const onMoveRecord = (e) => {
    if (e.keyPath[0] === '1') {
      router.push('/')
    } else if (e.keyPath[0] === '2') {
      router.push('/profile')
    } else if (e.keyPath[0] === '3') {
      router.push('/record')
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