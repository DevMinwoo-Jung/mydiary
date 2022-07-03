import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Menu } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

const AppLayout = () => {
  const Global = createGlobalStyle`
    .ant-row {
      margin-right: 0 !important;
      marglin-left: 0 !important;
    }

    .ant-col:first-child {
      padding-left: 0 !important;
    }

    .ant-col:last-child {
      padding-right: 0 !important;
    }
  `

  return (
    <>
      <Global/>
      <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Health Dairy
        </Menu.Item>
        <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
          <Menu.Item key="two" icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <Menu.Item key="three" icon={<AppstoreOutlined />}>
            Navigation Three
          </Menu.Item>
          <Menu.ItemGroup title="Item Group">
            <Menu.Item key="four" icon={<AppstoreOutlined />}>
              Navigation Four
            </Menu.Item>
            <Menu.Item key="five" icon={<AppstoreOutlined />}>
              Navigation Five
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </>
  )
}


export default AppLayout