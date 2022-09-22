import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { size } from 'libs/css/layout'
import Slider from './Slider'
import { WHITE } from 'libs/css/color'

export type AppLayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const PageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: ${WHITE};
`

const ContentContainer = styled.div`
  display: flex;
  margin: auto;
  min-height: 94.5vh;
  height: 100%;
  width: ${size.mobileL};

  @media screen and (max-width: ${size.mobileL}) { 
    width: ${size.mobileS}
  }
`



export default function AppLayout({ children }: AppLayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = (closed:boolean) => {
    setOpened(closed);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <Slider isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <ContentContainer>
              <PageContainer>{children}</PageContainer>
            </ContentContainer>
    </Container>
  );
} 