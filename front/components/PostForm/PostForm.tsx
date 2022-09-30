/* eslint-disable no-alert */
// eslint-disable-next-line no-unused-vars
import { DatePicker, DatePickerProps, Form, Input, Tooltip } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import { size } from 'libs/css/layout';
import { COLOR_DBE2EF, WHITE } from 'libs/css/color';
import useInput from 'libs/hook/useInput';
import Images from 'components/Posts/Images';
import { BiMessageAltAdd, BiHide, BiShow } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import { PostsState } from 'libs/type';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';

moment.locale('ko');

const PostFormContainer = styled(Form)`
  display: block;
  margin: 6rem 1rem 0 1rem;
  max-height: 60rem;
  min-height: 15rem;
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

const AddButtonDivStyle = styled(BiMessageAltAdd)`
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  right: 2rem;
  bottom: 12rem;
  @media screen and (max-width: ${size.tablet}) { 
    margin-bottom: 1rem;
    width: 1.5rem;  
    height: 1.5rem;
  }
`
const AddImageButtonDivStyle = styled(BsImage)`
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  right: 4rem;
  bottom: 12rem;
  @media screen and (max-width: ${size.tablet}) { 
    margin-bottom: 1rem;
    width: 1.5rem;  
    height: 1.5rem;
  }
`

const ButtonsDiv = styled.div`
  position: relative;
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

const HideStyle = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 3rem;
  text-align: center;
`

const BiShowStyle = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 3rem;
  text-align: center;
`

export const _PostForm = () => {
  const dispatch = useDispatch()
  const imageInput = useRef<any>()
  const [date, setDate] = useState<string>(undefined)
  const [text, onChangeText, setText] = useInput('')
  const [showForm, setShowForm] = useState(false)
  const imagePaths = useSelector((state:PostsState) => state.post.imagePaths, shallowEqual);
  const addPostDone = useSelector((state:PostsState) => state.post.addPostDone, shallowEqual);

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
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

  // eslint-disable-next-line consistent-return
  const onChangeImages = useCallback((e) => {
    const fileType = e.target.files[0].type.slice(e.target.files[0].type.lastIndexOf('/') + 1)
    if (e.target.files.length > 10) {
      return alert('파일은 한 게시물당 10개까지만 올릴 수 있습니다.')
    }
    if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
      return alert('파일 확장자는 png, jpg, jpeg만 지원합니다');
    }
    if ((e.target.files[0].size / 1024 / 1024).toFixed(4) >= '20') {
      return alert(`${e.target.files[0].name} 이미지 크기는 5MB를 초과할 수 없습니다.`);
    }
    const imageFormData = new FormData(); // mutilpart 형식으로 서버에 보낼 수 있다
    // bytes -> kilobytes (KB) -> megabytes (MB)
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f)
    })
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  }, [])

  const hideForm = () => {
    setShowForm((prev) => !prev)
  }

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(() => {
    const postImgId = moment().format('YYYY-MM-DD-h:mm:ss')

    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    if (imagePaths.length < 1) {
      return alert('사진은 필수입니다.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('date', date);
    formData.append('content', text);
    formData.append('postImgId', postImgId);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [imagePaths, text, date])

  return (
    <>
      {
        showForm === true
          ? (
            <>
              <Tooltip title="게시글 작성하기">
                <BiShowStyle onClick={hideForm}>
                  <BiShow />
                </BiShowStyle>
              </Tooltip>
            </>
          )
          : (
            <>
              <Tooltip title="숨기기">
                <HideStyle onClick={hideForm}>
                  <BiHide />
                </HideStyle>
              </Tooltip>
              <PostFormContainer name="image" encType="multipart/form-data" onFinish={onSubmit}>
                <ImgsDiv>
                  {
                imagePaths.length > 0 && <Images image={imagePaths} type="postForm" />
              }
                </ImgsDiv>
                <InnerPostFormDiv>
                  <DateDiv>
                    <DatePickerStyle onChange={onChange} />
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
                    maxLength={200}
                    placeholder="무엇이든 기록해봐요"
                  />
                  <ButtonsDiv>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Tooltip title="이미지 추가">
                      <AddImageButtonDivStyle onClick={onClickImageUploads}>
                        <BsImage />
                      </AddImageButtonDivStyle>
                    </Tooltip>
                    <Tooltip title="게시물 업로드">
                      <AddButtonDivStyle onClick={onSubmit}>
                        <BiMessageAltAdd />
                      </AddButtonDivStyle>
                    </Tooltip>
                  </ButtonsDiv>
                </InnerPostFormDiv>
              </PostFormContainer>
            </>
          )
      }
    </>
  )
}

const PostForm = memo(_PostForm)

export default PostForm
