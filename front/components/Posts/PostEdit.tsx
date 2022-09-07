import { Button, DatePicker, DatePickerProps, Input } from 'antd'
import { BUTTON_COLOR, COLOR_DBE2EF, WHITE } from 'libs/css/color'
import { size } from 'libs/css/layout'
import useInput from 'libs/hook/useInput'
import { PostProps } from 'libs/type'
import moment from 'moment'
import React, { FC, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UPLOAD_IMAGES_REQUEST } from 'reducers/post'
import styled from 'styled-components'

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
  & :hover {
    background-color: ${BUTTON_COLOR};
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

const PostEdit:FC<PostProps> = (props) => {

  const { post } = props
  const dispatch = useDispatch()

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };

  const [date, setDate] = useState<string>('')
  const imageInput = useRef<any>()
  const [text, onChangeText, setText] = useInput(post.content)

  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files)
    const imageFormData = new FormData(); // mutilpart 형식으로 서버에 보낼 수 있다
    [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f)
    })
    dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData
    })
  },[])

  return (
    <>
      <PostFormHeader>
        <DatePickerStyle onChange={onChange} />
        {
          date === 'undefined' || date === '' || date === null 
          ? ''
          : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
        }
        <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages}/>
        <ButtonStyle onClick={onClickImageUploads}>이미지 업로드</ButtonStyle>
      </PostFormHeader>
        <TextContainer
          rows={5}
          value={text}
          onChange={onChangeText}
          maxLength={400}
          />
    </>
  )
}

export default PostEdit