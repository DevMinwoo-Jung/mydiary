import React, { memo } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components';
const { Header, Footer, Sider, Content } = Layout;

const FooterContainer = styled(Footer)`
  bottom: 0;
  width: 100%;
`

const _Footer = () => {
  return (
    <FooterContainer>

    </FooterContainer>
  )
}

const CustomFooter = memo(_Footer);

export default CustomFooter