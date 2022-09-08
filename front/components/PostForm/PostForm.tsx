import { Button, DatePicker, DatePickerProps, Form, Input } from 'antd'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react' 
import styled from 'styled-components'
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ko'
import { size } from 'libs/css/layout'
import { BUTTON_COLOR, COLOR_BACKGROUND_DEFAULT, COLOR_DBE2EF, WHITE } from 'libs/css/color'
import useInput from 'libs/hook/useInput'
import SearchForm from 'components/SearchForm/SearchForm'

moment.locale('ko');

const PostFormContainer = styled(Form)`
  display: block;
  width: 100%;
  border-radius: 1rem;
  min-height: 30vh;
  position: relative;
`
const InnerPostFormDiv = styled.div`
  border: 6px solid ${COLOR_BACKGROUND_DEFAULT};
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

const ButtonStyle = styled(Button)`
  width: 100px;
  position: right;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
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
  right: 1rem;
  width: 100px;
  font-size: 12px;
  border-radius: 9px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const SearchFormDiv = styled.div`
  position: absolute;
  right: 8rem;
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

const ImgContainer = styled.div`
  width: 100%;
  display: block;
`

const ImgStyle = styled.img`
  object-fit: fill;
  height: 20vh;
  width: 100%;
`

const RemoveButtonStyle = styled(Button)`
  width: 20%;
  margin: auto;
  cursor: pointer;
  font-size: 12px;
  border-radius: 9px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

export const _PostForm = () => {
  const dispatch = useDispatch()
  const imageInput = useRef<any>()
  const [date, setDate] = useState<string>(undefined)
  const [userId, setUserId] = useState<string>(undefined)
  const [text, onChangeText, setText] = useInput('')
  const [showForm, setShowForm] = useState(false)
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

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

  const onRemoveImage = useCallback((index: any) => () => {
    dispatch({
        type: REMOVE_IMAGE,
        data: index
    })
  }, [])

  return (
    <>
      {
        showForm === true
        ? <HideFormContainer>
            <PostFormHeader>
              <SearchFormDiv>
                <SearchForm/>
              </SearchFormDiv>
              <HideButton onClick={hideForm}>글 작성하기</HideButton>
            </PostFormHeader>
          </HideFormContainer>
        :
        <PostFormContainer name="image" encType="multipart/form-data" onFinish={onSubmit}>
          <PostFormHeader>
              <SearchFormDiv>
                <SearchForm/>
              </SearchFormDiv>
            <HideButton onClick={hideForm}>숨기기</HideButton>
          </PostFormHeader>
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
              <ButtonStyle onClick={onClickImageUploads}>이미지 업로드</ButtonStyle>
              <ButtonStyle htmlType='submit'>추가</ButtonStyle>
            </ButtonsDiv>
            <ImgsDiv>
              {
              imagePaths && imagePaths.map((v: React.Key, i: string) => (
              <ImgContainer key={v} style={{display: 'inline-block'}}>
                  <ImgStyle src={`http://localhost:3065/${v}`} alt={String(v)}/>
                  <RemoveButtonStyle onClick={onRemoveImage(i)}>제거</RemoveButtonStyle>
              </ImgContainer>
              ))}
            </ImgsDiv>
          </InnerPostFormDiv>
        </PostFormContainer>
      }
    </>
  )
}

const PostForm = memo(_PostForm)

export default PostForm