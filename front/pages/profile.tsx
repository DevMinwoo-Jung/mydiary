import UserInfo from 'components/Profile/UserInfo'
import UserPhoto from 'components/Profile/UserPhoto'
import { size } from 'libs/css/layout'
import React from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  border: 1px solid black;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  @media screen and (max-width: ${size.tablet}) { 
    display: block;
    width: 350px;
    height: 500px;
  }

  @media screen and (min-width: ${size.tablet}) {
    width: 850px;
    height: 600px;
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 1000px;
    height: 600px;
  }
`

const profile = () => {
  return (
    <ProfileContainer>
      <UserPhoto/>
      <UserInfo/>
    </ProfileContainer>
  )
}

export default profile