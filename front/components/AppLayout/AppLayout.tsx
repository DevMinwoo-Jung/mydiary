import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Slider from './Slider'
import { DEVICE_LAYOUT } from 'libs/css/layout'

export type LayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #000133;
`

const PageContainer = styled.div`
  padding: 20px;
  margin: auto;
  border: 1px solid pink;
  @media ${DEVICE_LAYOUT.mobileL} { 
    max-width: 300px;
  }

  @media ${DEVICE_LAYOUT.laptop} { 
    max-width: 800px;
  }

  @media ${DEVICE_LAYOUT.desktop} {
    max-width: 1400px;
  }
`

const ContentContainer = styled.div`
  display: flex;
`



export default function Layout({ children }: LayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer}/>
        <ContentContainer>
          <Slider isOpened={isOpened} />
          <PageContainer>{children}</PageContainer>
        </ContentContainer>
    </Container>
  );
}