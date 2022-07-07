import React, { memo } from 'react'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

const _Footer = () => {
  return (
    <Footer>

    </Footer>
  )
}

const CustomFooter = memo(_Footer);

export default CustomFooter