import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo, useEffect } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { BACKGROUND_COLOR, WHITE } from 'libs/css/color'
import shortid from 'shortid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import { LOAD_POSTS_REQUEST, POST_REQUEST_FASLE } from 'reducers/post'
import { useInView } from 'react-intersection-observer'

const ContentsContainer = styled.div`
  margin: auto;
  display: block;
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
`
const _index: NextPage = () => {
  const me = useSelector((state) => state.user?.me?.id)
  const postRequest = useSelector((state) => state.post?.postRequest)
  const { hasMorePosts, loadPostsLoading, mainPosts } = useSelector((state) => state.post, shallowEqual)
  const dispatch = useDispatch()   
  const [ref, inView] = useInView()

    useEffect(() => {
    if(postRequest) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      })
      dispatch({
        type: POST_REQUEST_FASLE
      })
    }
  }, [postRequest])

  useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
    },[inView, hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
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
        <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
      </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;