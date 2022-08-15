import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLOR_DBE2EF } from 'libs/css/color'
import shortid from 'shortid'
import Images from './Images'
import { POST_DELETE_REQUEST, POST_DELETE_SUCCESS } from 'reducers/post'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { message, Popconfirm } from 'antd'
import PostTags from './PostTags'

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

const TagAndDelete = styled.div`
  width: 100%;
  position: absolute;
`

const TagDiv = styled.div`
  width: 65%;
`

const DeleteDiv = styled.div`
  width: 35%;
`

const RemoveBtn = styled(DeleteOutlined)`
  right: 1rem;
  top: 0.5rem;
  font-size: 1.5rem;
`



const _Posts = () => {
  const { mainPosts } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  
  const onRemovePost = (targetId:string) => {
    console.log(targetId)
    dispatch({
      type: POST_DELETE_REQUEST,
      data: targetId
    })
  }

  const confirm = (e: React.MouseEvent<HTMLElement> | string) => {
    console.log(e);
    onRemovePost(e)
    message.success('Click on Yes');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  
  
  return (
    <PostsContainer key={shortid()}>
      {
        mainPosts.map(
          (element) => 
        <PostsInnerContainer key={shortid()}>
          <TagAndDelete>
            <TagDiv>
              <PostTags postData={element.content} />
            </TagDiv>
            <DeleteDiv>
              <Popconfirm
                    title="메모 삭제하기"
                    onCancel={cancel}
                    onConfirm={() => confirm(element.id)}
                    okText="삭제"
                    cancelText="취소"
                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                    placement="rightTop"
                  >
                    <a href="#"><RemoveBtn/></a>
                </Popconfirm>
            </DeleteDiv>
          </TagAndDelete>
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
