import React, { useState } from 'react';
import styled from 'styled-components';
import { size } from 'libs/css/layout';
import { BACKGROUND_COLOR } from 'libs/css/color';
import Header from './Header';
import Slider from './Slider';

export type AppLayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${BACKGROUND_COLOR};
`;

const PageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
`;

const ContentContainer = styled.div`
  display: flex;
  margin: auto;
  min-height: 100vh;
  height: 100%;
  width: 30rem;
  @media screen and (max-width: ${size.mobileL}) { 
    width: 100%;
  }
`;

export default function AppLayout({ children }: AppLayoutProps) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = (closed:boolean) => {
    setOpened(closed);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <Slider isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <ContentContainer>
        <PageContainer>{children}</PageContainer>
      </ContentContainer>
    </Container>
  );
}
