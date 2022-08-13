import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLOR_DBE2EF } from 'libs/css/color'
import shortid from 'shortid'
import Images from './Images'

const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
`

const PostsInnerContainer = styled.div`
  display: flex;
  margin: auto;
  height: 30rem;
  border: 1px solid ${COLOR_DBE2EF};
  border-radius: 1rem;
  margin: 1rem;
  position: relative;
`

const ContentContainer = styled.div`
  display: block;
  width: 50%;
  margin: 3rem 3rem;
`

const DatePara = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: left;
`

const ContentPara = styled.p`
  font-size: 1rem;
  text-align: left;
`

const ImagesDiv = styled.div`
  position: relative;
`

const RemoveBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
`



const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)

  
  return (
    <PostsContainer key={shortid()}>
      {
        mainPosts.map(
          (element) => 
        <PostsInnerContainer key={shortid()}>
          <RemoveBtn>x</RemoveBtn>
          <ContentContainer>
            <DatePara>{element.date}</DatePara>
            <ContentPara>{element.content}</ContentPara>
          </ContentContainer>
            <Images image={element.Images}/>
        </PostsInnerContainer>
        )
      }
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
