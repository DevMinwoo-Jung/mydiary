import React, { memo } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components';
const { Footer } = Layout;

const FooterContainer = styled(Footer)`
  width: 100%;
  padding: 12px;
  position: absolute;
`

const _Footer = () => {
  return (
    <FooterContainer>
      all rigth reserved 2022 @Minwoo
    </FooterContainer>
  )
}

const CustomFooter = memo(_Footer);

export default CustomFooter