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

type SidebarProps = {
  isOpened: boolean;
};

const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: #2e6299;
  width: ${(props) => (props.isOpened ? "10rem" : "0")};
  transition: width 0.5s;
  overflow: hidden;
  position: absolute;
  height: calc(100% - 50px);
  z-index: 10;
`;

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
        <Menu onClick={onMoveRecord} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </SidebarContainer>
  )
}

const Slider = memo(_Slider)

export default Slider