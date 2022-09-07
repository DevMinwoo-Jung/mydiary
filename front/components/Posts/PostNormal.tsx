import { PostProps } from 'libs/type'
import moment from 'moment'
import React, { FC } from 'react'
import styled from 'styled-components'

const DateDiv = styled.div`
  display: flex;
  font-size: 0.8rem;
`

const DatePara = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  text-align: left;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`

const ContentPara = styled.p`
  font-size: 1rem;
  text-align: left;
`

const PostNormal:FC<PostProps> = (props) => {

  const { post } = props 

  return (
    <>
      <DateDiv>
        <DatePara>{post.date}</DatePara>
          {
          post.date === undefined || post.date === '' || post.date === null 
          ? null
          : 
          <>
          <DatePara>{moment(`${post.date}`).format('dddd')}</DatePara>
          </>  
          }
        </DateDiv>
        <ContentPara>{post.content}</ContentPara>
    </>
  )
}

export default PostNormal