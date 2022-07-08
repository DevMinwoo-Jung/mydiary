import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { size } from 'libs/css/layout'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { MODIFY_REQUEST } from 'reducers/user'

const { Paragraph } = Typography

const UserPhotoDiv = styled.div`
  border: 1px solid black;
  width: 350px;
`

const AvatarStyle = styled(Avatar)`
  width:'250px';
  height:'250px';
  border: 99%;
  margin: 1rem 0;
  @media screen and (max-width: ${size.tablet}) { 
    width: 200px;
    height: 200px;
  }
`

const ParagraphStyle = styled(Paragraph)`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 1.5rem;
`

const EditOutlinedStyle = styled(EditOutlined)`
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
`

const _UserPhoto = () => {
  const { id } = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  const onUserModify = () => {
    dispatch({
      type: MODIFY_REQUEST
    })
  }

  return (
    <>
      <UserPhotoDiv>
        <AvatarStyle size={200} icon={<UserOutlined />}/>
        <ParagraphStyle>
          반갑습니다.<br/>
          {id} 님
        </ParagraphStyle>
        <EditOutlinedStyle onClick={onUserModify}/> 
      </UserPhotoDiv>
    </>
  )
}

const UserPhoto = memo(_UserPhoto)

export default UserPhoto