import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form } from 'antd'
import { size } from 'libs/css/layout'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ISPOST_IMAGE_FALSE, ISPOST_IMAGE_TRUE, LOAD_MY_INFO_REQUEST, SHOW_MODIFY_FORM } from 'reducers/user'
import { BUTTON_COLOR, COLOR_MAIN, WHITE } from 'libs/css/color'
import { LOAD_PROFILE_REQUEST, MODIFY_PROFILE_IMAGE_REQUEST, UPLOAD_PROFILE_IMAGES_REQUEST } from 'reducers/post'

const { Paragraph } = Typography

const UserPhotoDiv = styled.div`
  width: 100%;
  background: ${COLOR_MAIN};
  color: ${WHITE};
  display: flex;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

const AvatarStyle = styled(Avatar)`
  width: '13rem';
  height:'13rem';
  border-radius: 1rem;
  margin: 1rem;
  @media screen and (max-width: ${size.tablet}) { 
    width: 200px;
    height: 200px;
  }
  & img {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
`

const ParagraphStyle = styled(Paragraph)`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 1.5rem;
  color: ${WHITE};
`

const ParagraphDivStyle = styled.div`
  width: 65%;
  margin: auto;
`

const EditOutlinedStyle = styled(EditOutlined)`
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
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

const UserOutlinedStyle = styled(UserOutlined)`
  object-fit: fill;
  width: 100%;
`

const ImgStyle = styled.img`
  object-fit: fill;
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

const _UserPhoto = () => {
  const dispatch = useDispatch()

  const userId = useSelector((state) => state.user?.me?.userId)
  const nickname = useSelector((state) => state.user?.me?.nickname)
  const { imagePath } = useSelector((state) => state.post)
  const me = useSelector((state) => state.user?.me)
  const { userInfomodifyLoading, showModifyForm, isPosted } = useSelector((state) => state.user)
  const imageInput = useRef<any>()

  const onClickImageUploads = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  
  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData(); // mutilpart 형식으로 서버에 보낼 수 있다
    [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f)
    })
    dispatch({
      type: UPLOAD_PROFILE_IMAGES_REQUEST,
      data: imageFormData
    })
    dispatch({
      type: ISPOST_IMAGE_TRUE,
    })
  },[])

  const onUserModify = () => {
    dispatch({
      type: SHOW_MODIFY_FORM
    })
  }

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append('image', imagePath.filename);
    formData.append('user', userId);
    dispatch({
        type: MODIFY_PROFILE_IMAGE_REQUEST,
        data: formData,
    });
  },[imagePath])

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
  }, [])

  useEffect(() => {
    if(me !== null){
      dispatch({
        type: LOAD_PROFILE_REQUEST
      })
    }
  }, [me])
 
  useEffect(() => {
    if ((isPosted === true) && (userInfomodifyLoading === true)) {
      onSubmit()
      dispatch({
        type: ISPOST_IMAGE_FALSE
      })
    }
  }, [userInfomodifyLoading, isPosted])

  return (
    <Form encType="multipart/form-data" >
      <UserPhotoDiv >
        {
          imagePath === null 
          ? <AvatarStyle size={150} icon={<UserOutlinedStyle />}/>
          : <AvatarStyle size={150} 
            icon={<ImgStyle src={`http://localhost:3065/${imagePath.filename || imagePath.src}`} alt={String(imagePath.filename)}/>}
            />
          }
        <ParagraphDivStyle>
          <ParagraphStyle>
            안녕하세요<br/>
            {nickname} 님 <EditOutlinedStyle onClick={onUserModify}/>
          </ParagraphStyle>
          {
            showModifyForm && <ButtonStyle onClick={onClickImageUploads}>프로필 이미지 추가</ButtonStyle>
          }
          <input type='file' name='image'multiple hidden ref={imageInput} onChange={onChangeImages}/>
        </ParagraphDivStyle>
      </UserPhotoDiv>
    </Form>  
  )
}

const UserPhoto = memo(_UserPhoto)

export default UserPhoto 