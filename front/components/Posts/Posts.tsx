import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostContent from './PostContent'
import shortid from 'shortid'
import { INDEX_LAYOUT_DESKTOP, INDEX_LAYOUT_MOBILE, INDEX_LAYOUT_TABLET, size } from 'libs/css/layout'
import { BUTTON_COLOR } from 'libs/css/color'

const PostsContainer = styled.div`
  margin-top: 1rem;
  margin: auto;
  height: 88vh;
  overflow-y: auto;
  @media screen and (min-width: ${size.mobileS}) { 
    width: ${INDEX_LAYOUT_MOBILE}px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: ${INDEX_LAYOUT_TABLET}px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: ${INDEX_LAYOUT_DESKTOP}px;
  }
`

const HeaderStyle = styled.div`
  font-size: 1rem;
  & h1 {
    font-weight: bolder;
  }
`

const PostsInnerContainer = styled.div`
  display: block;
  margin: auto;
  @media screen and (min-width: ${size.mobileS}) { 
    width: ${INDEX_LAYOUT_MOBILE - 50}px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: ${INDEX_LAYOUT_TABLET - 100}px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: ${INDEX_LAYOUT_DESKTOP - 150}px;
  }
`

const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)

  return (
    <PostsContainer>
      <HeaderStyle>
        <h1>운동일지</h1>
      </HeaderStyle>
      <PostsInnerContainer>
      {
        mainPosts.map((element: object, index: number) => {
          return (
            <PostContent key={shortid.generate()} post={element} index={index}/>
          )
        })
      }
      </PostsInnerContainer>
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
