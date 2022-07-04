import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Slider from './Slider';

export type LayoutProps = {
  children: React.ReactNode,
};

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #000133;
`;

const PageContainer = styled.div`
  padding: 20px;
  width: 80vw;
`;

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