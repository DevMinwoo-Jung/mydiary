import { Button, DatePicker, DatePickerProps, Form, Input } from 'antd'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react' 
import styled from 'styled-components'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ko'
import { size } from 'libs/css/layout'
import { BUTTON_COLOR, COLOR_DBE2EF, WHITE } from 'libs/css/color'
import useInput from 'libs/hook/useInput'
import SearchForm from 'components/SearchForm/SearchForm'

moment.locale('ko');

const PostFormContainer = styled(Form)`
  display: block;
  width: 100%;
  border-radius: 1rem;
  height: 25vh;
`

const HideFormContainer = styled(Form)`
  width: 100%;
  margin-bottom: 1rem;
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

const DatePickerStyle = styled(DatePicker)`
  border-radius: 0.6rem;
  font-style: normal;
`

const ButtonStyle = styled(Button)`
  width: 100px;
  position: right;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
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
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
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

export const _PostForm = () => {
  const dispatch = useDispatch()
  const imageInput = useRef<any>()
  const [date, setDate] = useState<string>(undefined)
  const [text, onChangeText, setText] = useInput('')
  const [showForm, setShowForm] = useState(false)
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };

  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  
  useEffect(() => {
    if (addPostDone) {
        setText('');
    }
  }, [addPostDone]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files)
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f: string | Blob) => {
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
    console.log(text, date, imageInput.current.value)
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p: string | Blob) => {
        formData.append('image', p);
    });
    formData.append('content', text);
    formData.append('date', date)
    dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
    });
  },[imagePaths, text, date])

  const onRemoveImage = useCallback((index: any) => () => {
    // dispatch({
    //     type: REMOVE_IMAGE,
    //     data: index
    // })
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
            <DatePickerStyle onChange={onChange}/>
            {
              date === undefined || date === '' || date === null 
              ? ''
              : <DateStyle>{moment(`${date}`).format('dddd')}</DateStyle>
            }
              <SearchFormDiv>
                <SearchForm/>
              </SearchFormDiv>
            <HideButton onClick={hideForm}>숨기기</HideButton>
          </PostFormHeader>
          <TextContainer
              rows={5}
              value={text}
              onChange={onChangeText}
              maxLength={400}
              placeholder="무엇이든 기록해봐요"/>
          <ButtonsDiv>
            <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages}/>
            <ButtonStyle onClick={onClickImageUploads}>이미지 업로드</ButtonStyle>
            <ButtonStyle htmlType='submit'>추가</ButtonStyle>
          </ButtonsDiv>
          <div>
            {
            imagePaths && imagePaths.map((v: React.Key, i: string) => (
            <div key={v} style={{display: 'inline-block'}}>
                <img src={`http://localhost:3065/${v}`} style={{width: '200px'}} alt={String(v)}/>
                <button onClick={onRemoveImage(i)}>제거</button>
            </div>
            ))}
          </div>
        </PostFormContainer>
      }
    </>
  )
}

const PostForm = memo(_PostForm)

export default PostForm