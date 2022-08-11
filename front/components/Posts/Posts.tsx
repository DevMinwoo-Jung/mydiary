import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'antd'
import { COLOR_DBE2EF } from 'libs/css/color'

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
`

const ContentContainer = styled.div`
  display: block;
  width: 50%;
  margin: 2rem 3rem;
`

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  margin: 1rem;
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

const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)

  const groups = mainPosts.reduce((groups, item) => {
    const group = (groups[item.date] || []);
    group.push(item);
    groups[item.date] = group;
    return groups;
  }, {});
  
  return (
    <PostsContainer>
      <>
      {
        mainPosts.map((element) => 
        <PostsInnerContainer>
          <ContentContainer>
            <DatePara>{element.date}</DatePara>
            <ContentPara>{element.content}</ContentPara>
          </ContentContainer>
          <ImageContainer>
            {
              element.Images.map((img) => 
              (
                <Image src={img.src}/>
              ))
            }
          </ImageContainer>
        </PostsInnerContainer>)
      }
      </>
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
