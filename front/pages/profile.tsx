import UserInfo from 'components/Profile/UserInfo'
import UserPhoto from 'components/Profile/UserPhoto'
import { WHITE } from 'libs/css/color'
import Head from 'next/head'
import React, { memo } from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 4rem;
  position: relative;
  display: block;
  border-radius: 1rem;
  background-color: ${WHITE};
`

const _profile = () => (
  <>
    <Head>
      <title>내 정보</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ProfileContainer>
      <UserPhoto />
      <UserInfo />
    </ProfileContainer>
  </>
)

const profile = memo(_profile)

export default profile
