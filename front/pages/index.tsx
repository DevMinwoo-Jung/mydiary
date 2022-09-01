import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo, useEffect } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { WHITE } from 'libs/css/color'
import shortid from 'shortid'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'

const ContentsContainer = styled.div`
  margin: auto;
  display: block;
  background-color: ${WHITE};
  width: 100%;
`
const _index: NextPage = () => {

  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()   

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
  }, [])

  return (
    <>
      <Head>
        <title>My Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        {
          me && <PostForm key={shortid.generate()}/>
        }
        <Posts/>
      </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;