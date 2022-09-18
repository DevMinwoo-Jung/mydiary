import { Button, DatePicker, DatePickerProps, Form, Input } from 'antd'
import { BUTTON_COLOR, COLOR_DBE2EF, WHITE } from 'libs/css/color'
import { size } from 'libs/css/layout'
import useInput from 'libs/hook/useInput'
import { PostProps } from 'libs/type'
import moment from 'moment'
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MODIFY_POST_IMAGE_REQUEST, MODIFY_POST_REQUEST, UPLOAD_EDIT_IMAGES_REQUEST } from 'reducers/post'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'

const PostFormHeader = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
  font-size: 1rem;
  position: relative;
  vertical-align: middle;
  justify-content: space-between;
  & Input {
    width: 120px;
    text-align: center;
    font-style: italic;
    border: none;
  }
`

const DatePickerStyle = styled(DatePicker)`
  border-radius: 0.6rem;
  font-style: normal;
  height: 32px;
  width: 140px;
`

const DateStyle = styled.span`
  text-align: left;
  margin-left: 1rem;
  font-size: 0.8rem;
  width: 40px;
  height: 32px;
  line-height: 32px;
`
const ButtonStyle = styled(Button)`
  width: 140px;
  height: 32px;
  position: right;
  font-size: 12px;
  margin-left: 1rem;
  border-radius: 0.6rem;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const TextContainer = styled(Input.TextArea)`
  justify-content: center;
  width: 100%;
  margin: auto;
  border: 1px solid ${COLOR_DBE2EF};
  border-radius: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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

const CheckOutlinedStyle = styled(CheckOutlined)`
  right: 0rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  margin-right: 4.4rem;
  bottom: 1.7rem;
  position: absolute;
  cursor: pointer;
`

const _PostEdit:FC<PostProps> = (props) => {

  const { post } = props
  const dispatch = useDispatch()

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };

  
  useEffect(() => {
    console.log(post.Images) 
  }, [])

  const { modifyImagePaths } = useSelector((state) => state.post)
  const { me } = useSelector((state) => state.user);

  const [userId, setUserId] = useState<string>(undefined)
  const [date, setDate] = useState<string>(post.date)
  const imageInput = useRef<any>()
  const [text, onChangeText] = useInput(post.content)
  const [postId, setPostId] = useState(null);
  useEffect(() => {
    setUserId(me.userId)
    setPostId(post.id)
    console.log
  }, [])


  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onChangeImages = useCallback((e) => {
    // console.log('images', e.target.files)
    const modifyImagePaths = new FormData(); // mutilpart 형식으로 서버에 보낼 수 있다
    [].forEach.call(e.target.files, (f) => {
      modifyImagePaths.append('image', f)
    })
    dispatch({
        type: UPLOAD_EDIT_IMAGES_REQUEST,
        data: modifyImagePaths
      })
  },[])

  const onModify = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    modifyImagePaths.forEach((p) => {
        formData.append('image', p);
    });
    formData.append('date', date);
    formData.append('content', text);
    formData.append('PostId', post.id);
    formData.append('postId', post.id);
    formData.append('userId', userId);
    dispatch({
      type: MODIFY_POST_REQUEST,
      data: formData, postId: post.id
    })
  }, [modifyImagePaths, date, text, userId, post.id])

  return (
    <Form name="image" encType="multipart/form-data" onFinish={onModify}>
      <PostFormHeader>
        <DatePickerStyle onChange={onChange}/>
        {
          date === 'undefined' || date === '' || date === null 
          ? ''
          : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
        }
        <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages}/>
        <ButtonStyle onClick={onClickImageUploads}>이미지 업로드</ButtonStyle>
        <CheckOutlinedStyle onClick={onModify}/>
      </PostFormHeader>
        <TextContainer
          rows={5}
          value={text}
          onChange={onChangeText}
          maxLength={400}
          />
    </Form>
  ) 
}

const PostEdit = memo(_PostEdit)

export default PostEdit