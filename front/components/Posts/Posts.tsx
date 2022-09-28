import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'
import { LOAD_POSTS_REQUEST, POST_REQUEST_FASLE } from 'reducers/post'
import { BACKGROUND_COLOR } from 'libs/css/color'
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
        me != null ?
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

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log(context);
//   const cookie = context.req ? context.req.headers.cookie : null;
//   axios.defaults.headers.common.Cookies = null; // 쿠키 공유 방지
//   if (context.req && cookie) {
//     axios.defaults.headers.common.Cookies = cookie; /// 서버에 쿠키 전달! 
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST
//   })
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

const Posts = memo(_Posts);

export default Posts;
