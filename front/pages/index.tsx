import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm'
import Posts from 'components/Posts/Posts'
import { size } from 'libs/css/layout'

const ContentsContainer = styled.div`
  margin: auto;
  display: flex;
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
        <title>My page title</title>
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