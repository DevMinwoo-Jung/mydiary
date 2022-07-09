import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { size } from 'libs/css/layout'
import CustomFooter from './Footer'
import Slider from './Slider'

export type AppLayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  color: #000133;

`

const PageContainer = styled.div`
  margin: 0 auto;
  border: 1px solid pink;
  width: 100%;
  @media screen and (min-width: ${size.mobileS}) { 
    width: 375px;
  }

  @media screen and (min-width: ${size.tablet}) {
    width: 1000px;
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 1400px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  margin: auto;
  @media screen and (min-width: ${size.mobileS}) { 
    width: 375px;
  }

  @media screen and (min-width: ${size.tablet}) {
    width: 1000px;
    height: calc(100vh - 100px);
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 1400px;
    height: calc(100vh - 100px);
  }
`



export default function AppLayout({ children }: AppLayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <Slider isOpened={isOpened}/>
            <ContentContainer>
              <PageContainer>{children}</PageContainer>
            </ContentContainer>
            <CustomFooter/>
    </Container>
  );
}