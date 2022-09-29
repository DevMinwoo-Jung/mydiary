import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { LOAD_PROFILE_REQUEST } from 'reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import { PostsState, UserState } from 'libs/type'
import { backUrl } from 'libs/config'

const UserInfoMiniContainer = styled.div`
  
`
const AvatarStyle = styled(Avatar)`
  width: 80%;
  height: 100%;
  border-radius: 1rem;
  margin: auto;
  object-fit: fill;
`

const ImgStyle = styled.img`
  object-fit: fill;
  width: 100%;
`

const UserInfoMini = () => {
  const dispatch = useDispatch()
  const { imagePath } = useSelector((state:PostsState) => state.post)
  const me = useSelector((state:UserState) => state.user?.me)

  useEffect(() => {
    if (me != null) {
      dispatch({
        type: LOAD_PROFILE_REQUEST,
      })
    }
  }, [me])

  return (
    <UserInfoMiniContainer>
      {
        imagePath === null
          ? <AvatarStyle size={100} icon={<UserOutlined />} />
          : <AvatarStyle size={100} icon={<ImgStyle src={`http://${backUrl}/${imagePath.src}`} alt={String(imagePath.filename)} />} />
      }
    </UserInfoMiniContainer>
  )
}

export default UserInfoMini
