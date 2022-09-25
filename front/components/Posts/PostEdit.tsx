import { DatePicker, DatePickerProps, Form, Input, Tooltip } from 'antd'
import { BORDER_COLOR, COLOR_DBE2EF, FONT_COLOR } from 'libs/css/color'
import { size } from 'libs/css/layout'
import useInput from 'libs/hook/useInput'
import { PostProps } from 'libs/type'
import moment from 'moment'
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MODIFY_POST_REQUEST, REMOVE_EXIST_IMAGE_ID_REQUEST, UPLOAD_EDIT_IMAGES_REQUEST } from 'reducers/post'
import styled from 'styled-components'
import { BsImage } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'


const PostFormHeader = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 7rem;
  & Input {
    width: 120px;
    text-align: center;
    font-style: italic;
    border: none;
  }
`

const DatePickerStyle = styled(DatePicker)`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  border-radius: 0.6rem;
  font-style: normal;
  height: 32px;
  width: 140px;

`

const DateStyle = styled.span`
  position: absolute;
  left: 9rem;
  top: 0.5rem;
  text-align: left;
  margin-left: 1rem;
  font-size: 0.8rem;
  width: 40px;
  height: 32px;
  line-height: 32px;
`
const AddImageButtonStyle = styled(BsImage)`
  position: right;
  font-size: 1.6rem;
  margin: 5px;
  color: ${FONT_COLOR};
  cursor: pointer;
`


const TextContainer = styled(Input.TextArea)`
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  & h1 {
    text-align: center;
    font-weight: bolder;
  }
  &.ant-input {
    height: 280px;
  }
  @media screen and (max-width: ${size.tablet}) { 
    width: 100%;
    margin-bottom: 2rem;
  }
`

const ModifyIconStyle = styled(FiEdit)`
  right: 5rem;
  top: 0.5rem;
  font-size: 1.5rem;
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

  const [userId, setUserId] = useState<string>(undefined)
  const [date, setDate] = useState<string>(post.date)
  const imageInput = useRef<any>()
  const [text, onChangeText] = useInput(post.content)

  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onChangeImages = useCallback((e) => {
    const fileType = e.target.files[0].type.replace(/(.*)\//g, '')
    if(e.target.files.length > 10 || (post.Images.length + e.target.files.length) > 10) {
      return alert('파일은 한 게시물당 10개까지만 올릴 수 있습니다.')
    }
    if(fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
      return alert('파일 확장자는 png, jpg, jpeg만 지원합니다');
    }
    if((e.target.files[0].size/1024/1024).toFixed(4) >= '5') {
      return alert(`${e.target.files[0].name} 이미지 크기는 5MB를 초과할 수 없습니다.`);
    }
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
    dispatch({
      type: REMOVE_EXIST_IMAGE_ID_REQUEST,
      data: {
        PostId: post.id
      }
    })

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
      <DatePickerStyle onChange={onChange}/>
        {
          date === 'undefined' || date === '' || date === null 
          ? ''
          : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
        }
      <Tooltip title="게시물 수정">
        <ModifyIconStyle onClick={onModify}/>
      </Tooltip>
        <TextContainer
          rows={5}
          value={text}
          onChange={onChangeText}
          maxLength={400}
          />
        <PostFormHeader>
          <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages}/>
          <Tooltip title="이미지 추가">
            <AddImageButtonStyle onClick={onClickImageUploads}/>
          </Tooltip>  
      </PostFormHeader>
    </Form>
  ) 
}

const PostEdit = memo(_PostEdit)

export default PostEdit