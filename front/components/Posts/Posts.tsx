import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostContent from './PostContent'
import shortid from 'shortid'
import { size } from 'libs/css/layout'

const PostsContainer = styled.div`
  margin-top: 1rem;
  margin: auto;
  height: 100%;
  overflow-y: auto;
  width: 80%;
  @media screen and (max-width: ${size.tablet}) { 
    width: 100%;
  }
`

const HeaderStyle = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  & h1 {
    font-weight: bolder;
  }
`

const PostsInnerContainer = styled.div`
  display: block;
  margin: auto;
  width: 85%;
`

const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)

  const groups = mainPosts.reduce((groups, item) => {
    const group = (groups[item.date] || []);
    group.push(item);
    groups[item.date] = group;
    return groups;
  }, {});

  // console.log(groups)
  // console.log(Object.values(groups))

//  console.log(Object.keys(groups).map(key => groups[key]))
  
  return (
    <PostsContainer>
      <HeaderStyle>
        <h1>운동일지</h1>
      </HeaderStyle>
      <PostsInnerContainer>
      {
        Object.values(groups).map((element: object, index: number) => {
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
