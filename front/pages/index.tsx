import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm'
import Posts from 'components/Posts/Posts'
import { size } from 'libs/css/layout'
import { WHITE } from 'libs/css/color'

const ContentsContainer = styled.div`
  margin: auto;
  display: flex;
  background-color: ${WHITE};
  @media screen and (min-width: ${size.mobileS}) { 
    display: block;
  }
  @media screen and (min-width: ${size.tablet}) {
    display: flex;
  }
  @media screen and (min-width: ${size.laptop}) {
    display: flex;
  }
  
`
const _index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Health Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        <PostForm/>
        <Posts/>
      </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;