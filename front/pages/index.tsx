import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { size } from 'libs/css/layout'
import { WHITE } from 'libs/css/color'
import shortid from 'shortid'

const ContentsContainer = styled.div`
  margin: auto;
  display: flex;
  background-color: ${WHITE};
  width: 100%;
  /* height: 90vh; */
  @media screen and (max-width: ${size.tablet}) { 
    display: block;
  }
  @media screen and (min-width: ${size.tablet}) {
    display: block;
  }
  @media screen and (min-width: ${size.laptop}) {
    display: flex;
  }
`
const _index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomodoro Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        <PostForm key={shortid.generate()}/>
      </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;