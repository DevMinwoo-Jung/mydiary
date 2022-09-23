import UserInfo from 'components/Profile/UserInfo'
import UserPhoto from 'components/Profile/UserPhoto'
import { COLOR_BACKGROUND_DEFAULT } from 'libs/css/color'
import Head from 'next/head'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 2rem;
  position: relative;
  display: block;
  border-radius: 1rem;
  border: 5px solid ${COLOR_BACKGROUND_DEFAULT};
`

const _profile = () => {
  const dispatch = useDispatch()   

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, [])

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