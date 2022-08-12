import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { size } from 'libs/css/layout'
import CustomFooter from './Footer'
import Slider from './Slider'
import { COLOR_BACKGROUND_DEFAULT, WHITE } from 'libs/css/color'

export type AppLayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${COLOR_BACKGROUND_DEFAULT};

`

const PageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: ${WHITE};
`

const ContentContainer = styled.div`
  display: flex;
  margin: auto;
  @media screen and (min-width: ${size.mobileM}) { 
    width: 375px;
  }
  @media screen and (min-width: ${size.tablet}) { 
    width: 650px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: 1000px;
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 1400px;
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
      {/* <CustomFooter/>         */}
    </Container>
  );
}