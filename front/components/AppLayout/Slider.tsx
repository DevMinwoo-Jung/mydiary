import React, { memo } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  BarChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

type SidebarProps = {
  isOpened: boolean;
};

const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: #2e6299;
  width: ${(props) => (props.isOpened ? "10rem" : "0")};
  transition: width 0.5s;
  overflow: hidden;
  position: absolute;

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

const items: MenuItem[] = [
  getItem('내 정보', '1', <UserOutlined />),
  getItem('기록 보기', '2', <BarChartOutlined />),
  getItem('이번달 운동은?', '3', <CalendarOutlined />)
]

const _Slider = (props: SidebarProps) => {
  const { isOpened } = props

  return (
    <SidebarContainer isOpened={isOpened}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </SidebarContainer>
  )
}

const Slider = memo(_Slider)

export default Slider