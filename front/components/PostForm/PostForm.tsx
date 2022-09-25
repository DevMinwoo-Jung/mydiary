import { Button, DatePicker, DatePickerProps, Form, Input, Tooltip } from 'antd'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react' 
import styled from 'styled-components'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../reducers/post'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ko'
import { size } from 'libs/css/layout'
import { BORDER_COLOR, BUTTON_COLOR, COLOR_DBE2EF, FONT_COLOR, WHITE } from 'libs/css/color'
import useInput from 'libs/hook/useInput'
import Images from 'components/Posts/Images'
import { BiMessageAltAdd, BiHide, BiShow } from 'react-icons/bi'
import { BsImage } from 'react-icons/bs'

moment.locale('ko');

const PostFormContainer = styled(Form)`
  display: block;
  margin: 4rem 1rem 1rem 1rem;
  max-height: 60rem;
  min-height: 20rem;
  border: 1px solid ${COLOR_DBE2EF};
  border-radius: 0.5rem;
  position: relative;
  background-color: ${WHITE};
`
const InnerPostFormDiv = styled.div`
  border-radius: 1rem;
  width: 100%;
  margin-top: 3rem;
`

const HideFormContainer = styled(Form)`
  width: 100%;
  margin-bottom: 2rem;
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

const DateDiv = styled.div`
  text-align: left;
  margin-left: 1.5rem;
`

const DatePickerStyle = styled(DatePicker)`
  margin-top: 0.5rem;
  border-radius: 0.6rem;
  font-style: normal;
`

const AddButtonStyle = styled(BiMessageAltAdd)`
  position: right;
  font-size: 2rem;
  margin: 5px;
  border-radius: 9px;
  color: ${FONT_COLOR};
  border-color: none;
  cursor: pointer;
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: ${WHITE};
    border-color: ${BORDER_COLOR};
    color: ${FONT_COLOR};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
    background-color: ${WHITE};
    border-color: ${BORDER_COLOR};
    color: ${FONT_COLOR};
    font-weight: bolder;
  }
`
const AddImageButtonStyle = styled(BsImage)`
  position: right;
  font-size: 1.8rem;
  margin: 5px;
  border-radius: 9px;
  color: ${FONT_COLOR};
  border-color: none;
  cursor: pointer;

`


const PostFormHeader = styled.div`
  margin-top: 1rem;
  display: flex;
  text-align: left;
  margin-left: 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  position: relative;
  vertical-align: middle;
  & Input {
    width: 120px;
    text-align: center;
    font-style: italic;
    border: none;
    margin-right: 1rem;
  }
  & h1 {
    margin: 0 1rem 0 0;
  }
`
const HideButton = styled(Button)`
  cursor: pointer;
  position: absolute;
  top: 4rem;
  right: 32rem;
  width: 100px;
  font-size: 12px;
  border-radius: 9px;
  background-color: ${WHITE};
  border-color: ${BORDER_COLOR};
  color: ${FONT_COLOR};
  border-color: none;
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

const ButtonsDiv = styled.div`
  position: relative;
  text-align:  end;
`

const DateStyle = styled.span`
  text-align: left;
  font-size: 1rem;
  margin-left: 1rem;
`

const ImgsDiv = styled.div`
  width: 100%;
  z-index: 100;
`

const BiHideStyle = styled(BiHide)`
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 4rem;
  right: 32rem;
`

const BiShowStyle = styled(BiShow)`
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 4rem;
  right: 32rem;
`

export const _PostForm = () => {
  const dispatch = useDispatch()
  const imageInput = useRef<any>()
  const [date, setDate] = useState<string>(undefined)
  const [userId, setUserId] = useState<string>(undefined)
  const [text, onChangeText, setText] = useInput('')
  const [showForm, setShowForm] = useState(false)
  const { imagePaths, addPostDone } = useSelector((state) => state.post, shallowEqual);
  const { me } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    setUserId(me.userId)
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };
  
  useEffect(() => {
    if (addPostDone) {
        setText('');
    }
  }, [addPostDone]);

  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  
  const onChangeImages = useCallback((e) => {
    const fileType = e.target.files[0].type.replace(/(.*)\//g, '')
    if(e.target.files.length > 10) {
      return alert('파일은 한 게시물당 10개까지만 올릴 수 있습니다.')
    }
    if(fileType != 'png' && fileType != 'jpg' && fileType != 'jpeg') {
      return alert('파일 확장자는 png, jpg, jpeg만 지원합니다');
    }
    if((e.target.files[0].size/1024/1024).toFixed(4) >= '5') {
      return alert(`${e.target.files[0].name} 이미지 크기는 5MB를 초과할 수 없습니다.`);
    }
    const imageFormData = new FormData(); // mutilpart 형식으로 서버에 보낼 수 있다
    // bytes -> kilobytes (KB) -> megabytes (MB)
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f)
    })
    dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData
    })
  },[])



  const hideForm = () => {
    setShowForm((prev) => !prev)
  }

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
        formData.append('image', p);
    });
    formData.append('date', date);
    formData.append('content', text);
    formData.append('userId', userId);
    dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
    });
  },[imagePaths, text, date, userId])

  return (
    <>
      {
        showForm === true
        ? 
          <>
          <Tooltip title="작성하기">
            <BiShowStyle onClick={hideForm}/>
          </Tooltip>
          </>
        :
        <>
          <Tooltip title="숨기기">
            <BiHideStyle onClick={hideForm}></BiHideStyle>
          </Tooltip>
          <PostFormContainer name="image" encType="multipart/form-data" onFinish={onSubmit}>
          <ImgsDiv>
              {
                imagePaths.length > 0 && <Images image={imagePaths} type={'postForm'}/>
              }
            </ImgsDiv>
          <InnerPostFormDiv>
            <DateDiv>
              <DatePickerStyle onChange={onChange}/>
                {
                  date === undefined || date === '' || date === null 
                  ? ''
                  : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
                }
            </DateDiv>
            <TextContainer
                rows={5}
                value={text}
                onChange={onChangeText}
                maxLength={400}
                placeholder="무엇이든 기록해봐요"/>
            <ButtonsDiv>
              <input type='file' name='image'multiple hidden ref={imageInput} onChange={onChangeImages}/>
              <Tooltip title="이미지 추가">
                <AddImageButtonStyle onClick={onClickImageUploads}/>
              </Tooltip>
              <Tooltip title="게시물 업로드">
                <AddButtonStyle onClick={onSubmit}></AddButtonStyle>
              </Tooltip>
            </ButtonsDiv>
          </InnerPostFormDiv>
          </PostFormContainer>
          </>
      }
    </>
  )
}

const PostForm = memo(_PostForm)

export default PostForm