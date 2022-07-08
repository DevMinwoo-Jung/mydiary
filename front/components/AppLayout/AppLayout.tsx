import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { size } from 'libs/css/layout'
import CustomFooter from './Footer'

export type AppLayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  color: #000133;
  height: 100vh;
`

const PageContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  border: 1px solid pink;
  width: 100%;
  @media screen and (min-width: ${size.mobileS}) { 
    width: 375px;
  }

  @media screen and (min-width: ${size.tablet}) {
    width: 500px;
  }

  @media screen and (min-width: ${size.laptop}) {
    width: 800px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  overflow: auto;
  margin: auto;
`



export default function AppLayout({ children }: AppLayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <ContentContainer>
              <PageContainer>{children}</PageContainer>
            </ContentContainer>
            <CustomFooter/>
    </Container>
  );
}