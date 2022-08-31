import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { size } from 'libs/css/layout'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_MODIFY_FORM } from 'reducers/user'
import { COLOR_MAIN, WHITE } from 'libs/css/color'

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
  border: 99%;
  margin: 1rem;
  @media screen and (max-width: ${size.tablet}) { 
    width: 200px;
    height: 200px;
  }
`

const ParagraphStyle = styled(Paragraph)`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 1.5rem;
  color: ${WHITE};
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
      type: SHOW_MODIFY_FORM
    })
  }

  return (
      <UserPhotoDiv>
        <AvatarStyle size={150} icon={<UserOutlined />}/>
        <div>
          <ParagraphStyle>
            안녕하세요<br/>
            {id} 님
          </ParagraphStyle>
          <EditOutlinedStyle onClick={onUserModify}/> 
        </div>
      </UserPhotoDiv>
  )
}

const UserPhoto = memo(_UserPhoto)

export default UserPhoto