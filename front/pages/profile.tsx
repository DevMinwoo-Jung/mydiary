import UserInfo from 'components/Profile/UserInfo'
import UserPhoto from 'components/Profile/UserPhoto'
import { COLOR_BACKGROUND_DEFAULT } from 'libs/css/color'
import { size } from 'libs/css/layout'
import Head from 'next/head'
import React, { memo } from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  width: 100%;
  height: 75%;
  margin: auto;
  margin-top: 2rem;
  position: relative;
  display: block;
  border-radius: 1rem;
  border: 5px solid ${COLOR_BACKGROUND_DEFAULT};
  @media screen and (max-width: ${size.tablet}) { 
    display: block;
    width: 350px;
    overflow-y: auto;
  }
`

const _profile = () => {
  return (
    <>
      <Head>
        <title>내 정보</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProfileContainer>
        <UserPhoto/>
        <UserInfo/>
      </ProfileContainer>
    </>
  )
}

const profile = memo(_profile)

export default profile