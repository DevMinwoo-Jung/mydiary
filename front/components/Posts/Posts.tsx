import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'
import { LOAD_POSTS_REQUEST, POST_REQUEST_FASLE } from 'reducers/post'
import { BACKGROUND_COLOR } from 'libs/css/color'
import { END } from "redux-saga";
import axios from "axios";
import wrapper from 'store/configureStore'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import { PostsState, UserState } from 'libs/type'

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
  const postRequest = useSelector((state:PostsState) => state.post?.postRequest)
  const dispatch = useDispatch() 

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

  return (
    <PostsContainer key={shortid()}>
      {
        me !== null ?
          <>
            {
              mainPosts
              .map(post =>{
                return <Post post={post} key={shortid()} />
              }
              )
            }
          </>
        : null
      }
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
