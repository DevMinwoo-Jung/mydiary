import React, { useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import wrapper from 'store/configureStore'
import { END } from 'redux-saga'
import { LOAD_POSTS_REQUEST, POST_REQUEST_FASLE } from 'reducers/post'
import { PostsState, UserState } from 'libs/type'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import Post from '../components/Posts/Post'
import styled from 'styled-components'
import { BACKGROUND_COLOR } from 'libs/css/color'
import shortid from 'shortid'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'

const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
  overflow: hidden;
  background-color: ${BACKGROUND_COLOR};
`

const posts = () => {
  const { hasMorePosts,
    loadPostsLoading,
    mainPosts   
  } = useSelector((state:PostsState) => state.post, shallowEqual)
  const me = useSelector((state:UserState) => state.user.me)
  const dispatch = useDispatch()
  const [ref, inView] = useInView()

  useLayoutEffect(() => {
    if (me === null) {
      dispatch({
        type: POST_REQUEST_FASLE,
      })
    }
  }, [me])

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <>
    <PostsContainer key={shortid()}>
      {
        me != null
          ? (
            <>
              {
              mainPosts
                .map((post) => <Post post={post} key={shortid()} />)
            }
            </>
          )
          : null
      }
    </PostsContainer>
      <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = null; // 쿠키 공유 방지
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie; /// 서버에 쿠키 전달!
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default posts