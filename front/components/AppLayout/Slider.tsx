import React, { memo } from 'react'
import styled from 'styled-components'
import { Breadcrumb, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

type SidebarProps = {
  isOpened: boolean;
};

const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: #2e6299;
  width: ${(props) => (props.isOpened ? "20vw" : "0vw")};
  transition: width 0.5s;
  height: 100%;
  overflow: hidden;
  position: absolute;
`;

const _Slider = (props: SidebarProps) => {
  const { isOpened } = props

  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
  
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
  
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );

  return (
    <SidebarContainer isOpened={isOpened}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={items2}
      />
    </SidebarContainer>
  )
}

const Slider = memo(_Slider)

export default Slider