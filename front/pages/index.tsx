import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm'

const ContentsContainer = styled.div`
  margin: auto;
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
    </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;