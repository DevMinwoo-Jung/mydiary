import styled from 'styled-components'
import { DEVICE_LAYOUT } from 'libs/css/layout'
import type { NextPage } from 'next'
import { memo } from 'react'
import Head from 'next/head'

const ContentsContainer = styled.div`
  margin: auto;
`
console.log(DEVICE_LAYOUT.laptop)
const _index: NextPage = () => {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <ContentsContainer>
      Content
    </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;