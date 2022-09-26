import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLOR_DBE2EF, WHITE } from 'libs/css/color'
import shortid from 'shortid'
import Images from './Images'
import { POST_DELETE_REQUEST } from 'reducers/post'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { message, Popconfirm, Tooltip } from 'antd'
import PostTags from './PostTags'
import moment from 'moment'
import 'moment/locale/ko'
import { PostProps } from 'libs/type'
import PostNormal from './PostNormal'
import PostEdit from './PostEdit'
import EditImages from './EditImages/EditImages'
import { BsThreeDots } from 'react-icons/bs'

moment.locale('ko');

const PostsInnerContainer = styled.div`
  display: block;
  max-height: 45rem;
  min-height: 15rem;
  border: 1px solid ${COLOR_DBE2EF};
  border-radius: 0.5rem;
  position: relative;
  margin: 1.5rem;
  background-color: ${WHITE};
  & :first-child {
    margin-top: 4rem;
  }
`

const ContentContainer = styled.div`
  display: block;
  height: 20rem;
  width: 90%;
  margin: 1rem;
`

const TagAndDelete = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`

const TagDiv = styled.div`
  width: 65%;
  text-align: left;
  margin: 1rem 0;
`

const DeleteDiv = styled.div`
  color: 'black';
  text-align: right;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

const TooltipStyle = styled(Tooltip)`
  position: absolute;
  right: 2.5rem;
  font-size: 1.5rem;
  top: -0.4rem;
`


const BsThreeDotsStyle = styled(BsThreeDots)`
  right: 1rem;
  top: 0.5rem;
  position: absolute;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  `

const Atag = styled.a`
  text-decoration: none;
  color: inherit;
`
const _Post:FC<PostProps> = (props) => {

  const { post } = props 
  const dispatch = useDispatch()
  const [modify, setModify] = useState(false)
  const me = useSelector((state) => state.user.me)
  const id = useSelector((state) => state.user.me?.id);

  const onChangeModify = useCallback(() => {
    setModify((prev) => !prev)
  }, [modify])

  const onRemovePost = useCallback((targetId:string) => {
    dispatch({
      type: POST_DELETE_REQUEST,
      data: post.id
    })
    setModify(false)
  }, [id, modify])

  const confirm = (e: React.MouseEvent<HTMLElement> | string) => {
    console.log(e);
    onRemovePost(e)
    message.success('삭제되었습니다.');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('삭제가 취소되었습니다.');
  };
  return (
    <PostsInnerContainer key={shortid()}>
      {
        modify === true
        ? <EditImages post={post} image={post.Images}/>
        : post.Images[0] && <Images image={post.Images}/>
      }
        <ContentContainer>
          {
            me !== null
            ?
            <>
              <BsThreeDotsStyle onClick={onChangeModify}/>
              <DeleteDiv>
                {
                  modify === true ?
                  <>
                    <Popconfirm
                          title="메모 삭제하기"
                          onCancel={cancel}
                          onConfirm={() => confirm(post.id)}
                          okText="삭제"
                          cancelText="취소"
                          icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
              
                        >
                        <TooltipStyle title="게시물 삭제">
                          <Atag href="#"><DeleteOutlined/></Atag>
                        </TooltipStyle>
                    </Popconfirm>
                  </>
                  : null
                }
              </DeleteDiv>
              </>
            : null
            }
          <TagAndDelete>
            <TagDiv>
              <PostTags postData={post.content} />
            </TagDiv>
          </TagAndDelete>
        {
            modify === true
            ? <PostEdit post={post}/>      
            : <PostNormal post={post} />
        }
        </ContentContainer>
    </PostsInnerContainer>
  )
}

const Post = memo(_Post)

export default Post