import UserInfo from 'components/Profile/UserInfo'
import UserPhoto from 'components/Profile/UserPhoto'
import { WHITE } from 'libs/css/color'
import Head from 'next/head'
import React, { memo, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import { REMOVE_POSTS } from 'reducers/post'
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

const _profile = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
    dispatch({
      type: REMOVE_POSTS,
    })
  }, [])

  return (
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
}

const profile = memo(_profile)

export default profile
