import { INDEX_LAYOUT_DESKTOP, INDEX_LAYOUT_MOBILE, INDEX_LAYOUT_TABLET, size } from 'libs/css/layout'
import React, { memo } from 'react'
import { dummyPosts } from 'reducers/post'
import styled from 'styled-components'

const PostsContainer = styled.div`
  margin-top: 1rem;
  margin: auto;
  border: 1px solid black;
  height: 70vh;
  overflow-y: auto;
  @media screen and (min-width: ${size.mobileS}) { 
    width: ${INDEX_LAYOUT_MOBILE}px;
    margin-top: 150px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: ${INDEX_LAYOUT_TABLET}px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: ${INDEX_LAYOUT_DESKTOP}px;
  }
`

const _Posts = () => {

  const dummy = dummyPosts.exercises;
  //console.log(Object.values(dummy.benchPress))
  // console.log(Object.values(dummy.benchPress).map((element, index) => (element[index])))
  console.log(Object.values(Object.values(dummy)).map((element) => (Object.values(element))))
  console.log(Object.values(dummy.benchPress).map((element) => (Object.keys(element))))
  return (
    <PostsContainer>
      {
        Object.values(dummy.benchPress).map((element, index) => <p>{element[index]}</p>)
      }
    </PostsContainer>
  )
}

const Posts = memo(_Posts)

export default Posts