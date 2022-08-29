import React, { FC, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { COLOR_DBE2EF } from 'libs/css/color'
import shortid from 'shortid'
import Images from './Images'
import { POST_DELETE_REQUEST } from 'reducers/post'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { message, Popconfirm, DatePicker, DatePickerProps, Input } from 'antd'
import PostTags from './PostTags'
import { BiCustomize } from 'react-icons/bi'
import moment from 'moment'
import 'moment/locale/ko'
import { size } from 'libs/css/layout'
import useInput from 'libs/hook/useInput'

moment.locale('ko');

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
  display: flex;
`

const TagDiv = styled.div`
  width: 65%;
  text-align: left;
  margin: 1rem;
`

const DeleteDiv = styled.div`
  width: 35%;
  color: 'black';
  text-align: right;
  margin: 1rem;
`

const RemoveBtn = styled(DeleteOutlined)`
  right: 1rem;
  top: 0.5rem;
  font-size: 1.5rem;
`

const BiCustomizeStyle = styled(BiCustomize)`
  right: 1rem;
  top: 0.5rem;
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
`

const Atag = styled.a`
  text-decoration: none;
  color: inherit;
`
const PostFormHeader = styled.div`
  display: flex;
  text-align: left;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  vertical-align: middle;
  & Input {
    width: 120px;
    text-align: center;
    font-style: italic;
    border: none;
    margin-right: 1rem;
  }
`

const TextContainer = styled(Input.TextArea)`
  justify-content: center;
  width: 90%;
  margin: auto;
  border: 1px solid ${COLOR_DBE2EF};
  border-radius: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  & h1 {
    text-align: center;
    font-weight: bolder;
  }
  & .textarea.ant-input {
    height: 300px;
  }
  @media screen and (max-width: ${size.tablet}) { 
    width: 100%;
    margin-bottom: 2rem;
  }
`


type PostObject = {
  content: string;
  id: string;
  date: string;
  Images: []
}

type PostProps = {
  post: PostObject
}

const DatePickerStyle = styled(DatePicker)`
  border-radius: 0.6rem;
  font-style: normal;
`

const DateStyle = styled.span`
  text-align: left;
  font-size: 1rem;
  margin-left: 1rem;
`

const _Post:FC<PostProps> = (props) => {

  const { post } = props 
  const dispatch = useDispatch()

  const [modify, setModify] = useState(false)
  const [date, setDate] = useState<string>(undefined)
  const [text, onChangeText] = useInput('')


  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };

  const onChangeModify = () => {
    setModify((prev) => !prev)
  }
  
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
    message.success('삭제되었습니다.');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('삭제가 취소되었습니다.');
  };

  return (
    <PostsInnerContainer key={shortid()}>
      <TagAndDelete>
        <TagDiv>
          <PostTags postData={post.content} />
        </TagDiv>
        <DeleteDiv>
          <BiCustomizeStyle onClick={onChangeModify}/>
          <Popconfirm
                title="메모 삭제하기"
                onCancel={cancel}
                onConfirm={() => confirm(post.id)}
                okText="삭제"
                cancelText="취소"
                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                placement="rightTop"
              >
                <Atag href="#"><RemoveBtn/></Atag>
            </Popconfirm>
        </DeleteDiv>
      </TagAndDelete>
        <ContentContainer>
        {
            modify === true
            ?
            <>
            <PostFormHeader>
              <DatePickerStyle onChange={onChange}/>
              {
                date === undefined || date === '' || date === null 
                ? ''
                : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
              }
            </PostFormHeader>
            <TextContainer
              rows={5}
              value={text}
              onChange={onChangeText}
              maxLength={400}
              />
            </>             
              : 
            <>
              <DatePara>{post.date}</DatePara>
              <ContentPara>{post.content}</ContentPara>
            </>  
          }
        </ContentContainer>
          <Images image={post.Images}/>
    </PostsInnerContainer>
  )
}

const Post = memo(_Post)

export default Post