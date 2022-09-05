import React from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const UserInfoMiniContainer = styled.div`
  
`
const AvatarStyle = styled(Avatar)`
  width: 80%;
  height: 100%;
  border: 99%;
  margin: auto;
`

const UserInfoMini = () => {

  return (
    <UserInfoMiniContainer>
      <AvatarStyle size={100} icon={<UserOutlined />}/>
    </UserInfoMiniContainer>
  )
}

export default UserInfoMini