import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'
import { LOAD_POSTS_REQUEST } from 'reducers/post'

const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
`

const _Posts = () => {
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post)

  const dispatch = useDispatch()   
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])


  useEffect(() => {
    function onScroll() {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
            if (hasMorePosts && !loadPostsLoading) {
                const lastId = mainPosts[mainPosts.length - 1]?.id;
                dispatch({
                  type: LOAD_POSTS_REQUEST,
                });
            }
        }
    }
    window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts, hasMorePosts, loadPostsLoading]);
  
  return (
    <PostsContainer key={shortid()}>
      {
        mainPosts.map(
          (element) => 
          <Post post={element} key={shortid()}/>
        )
      }
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
