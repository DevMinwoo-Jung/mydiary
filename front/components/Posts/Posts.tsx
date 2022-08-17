import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'


const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
`

const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)
  
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
