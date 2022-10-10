import React, { memo, useLayoutEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import { POST_REQUEST_FASLE } from 'reducers/post'
import { BACKGROUND_COLOR } from 'libs/css/color'
import { PostsState, UserState } from 'libs/type'
import Post from './Post'

const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
  overflow: hidden;
  background-color: ${BACKGROUND_COLOR};
`

const _Posts = () => {
  const mainPosts = useSelector((state:PostsState) => state.post.mainPosts, shallowEqual)
  const me = useSelector((state:UserState) => state.user.me)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (me === null) {
      dispatch({
        type: POST_REQUEST_FASLE,
      })
    }
  }, [me])

  // useLayoutEffect(() => {
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   })
  // }, [])

  return (
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
  );
};

const Posts = memo(_Posts);

export default Posts;
