import { Button, Input, Typography } from 'antd'
import { size } from 'libs/css/layout'
import { Divider } from 'antd'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { HIDE_MODIFY_FORM, USER_INFO_MODIFY_REQUEST, USER_REMOVE_REQUEST } from 'reducers/user'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'

const { Title, Paragraph } = Typography

const UserInfoContainer = styled.div`
  display: block;
  height: 100px;
  width: 100%;
`

const UserInfoDiv = styled.div`
  width: 100%;
  display: flex;
  & div {
  display: block;
    @media screen and (max-width: ${size.tablet}) { 
    display: block;
    width: 175px;
  }
  /* @media screen and (min-width: ${size.tablet}) {
    width: 45%;
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 300px;
  } */
}
`
const UserInfoInnerDiv = styled.div`
  margin: auto;
`

const ParagraphStyle = styled(Paragraph)`
  font-size: 1rem;
  font-weight: bolder;
`

const DividerStyle = styled(Divider)`
  &.ant-divider-horizontal {
    width: 80%;
    min-width: 80%;
    margin: 2rem auto;
  }
`

const InputStyle = styled(Input)`
  border-radius: 12px;
  @media screen and (min-width: ${size.mobileS}) { 
    width: 100px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: 150px;
  }
`

const PasswordDiv = styled.div`
  display: block;
`

const ButtonDiv = styled.div`
  position: inherit;
  margin-left: 40%;
  margin-top: 4rem;
  
`

const ButtonStyle = styled(Button)`
  width: 100px;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`


const _UserInfo = () => {
  const { showModifyForm } = useSelector((state) => state.user)
  const { nickname, userId, createdAt } = useSelector((state) => state.user.me)
  const { password } = useSelector((state) => state.user.user)
  const disaptch = useDispatch()

  const [userNickname, onChangeUserNickname ] = useInput('')
  const [userPassword, onChangeUserPassword] = useInput('')
  const [checkPassword, onChangeCheckPssword] = useInput('')
  const [passwordAlert, setPasswordAlert ] = useState(false)

  const onModify = useCallback(() => {
    disaptch({
      type: USER_INFO_MODIFY_REQUEST,
      data: {userNickname, userPassword},
    })
  },[userNickname, userPassword]) 

  const onCancel = () => {
    disaptch({
      type: HIDE_MODIFY_FORM
    })
  }

  const onRemoveUser = () => {
    disaptch({
      type: USER_REMOVE_REQUEST
    })
  }

  useEffect(() => {
    if(checkPassword !== userPassword) {
      setPasswordAlert(true)
    } else {
      setPasswordAlert(false)
    }
  }, [checkPassword, userPassword])


  return (
  <>
    <UserInfoContainer>
    <UserInfoDiv>
      <UserInfoInnerDiv>
        <Title level={3}>아이디</Title>
        <ParagraphStyle>{userId}</ParagraphStyle> 
      </UserInfoInnerDiv>
      <UserInfoInnerDiv>
        <Title level={3}>닉네임</Title>
        {
          showModifyForm === false 
          ?
          <ParagraphStyle>{nickname}</ParagraphStyle> 
          :
          <InputStyle value={userNickname} onChange={onChangeUserNickname} placeholder={nickname}/>
        }
      </UserInfoInnerDiv>
    </UserInfoDiv>
    <DividerStyle/>
    <UserInfoDiv>
      <UserInfoInnerDiv>
        <Title level={3}>회원가입 날짜</Title>
        <ParagraphStyle>{createdAt.split('').slice(0,10)}</ParagraphStyle> 
      </UserInfoInnerDiv>
      <UserInfoInnerDiv>
        <Title level={3}>비밀번호</Title>
        {
          showModifyForm === false
          ?
          <ParagraphStyle>{password}</ParagraphStyle> 
          :
          <PasswordDiv>
            <InputStyle type={'password'} value={userPassword} onChange={onChangeUserPassword} placeholder={password}/>
            <br/>
            <br/>
            <InputStyle type={'password'} value={checkPassword} onChange={onChangeCheckPssword} placeholder={'변경할 비밀번호를 다시 입력하세요'}/>
            {
              showModifyForm === false 
              ? null
              : 
              <>
                {
                  passwordAlert === false ? null
                  : <Paragraph style={{color: '#dd7474'}}>비밀번호가 일치하지 않습니다.</Paragraph>
                }
              </>
            }
          </PasswordDiv>
        }
      </UserInfoInnerDiv>
    </UserInfoDiv>
    <DividerStyle/>
    <ButtonDiv>
        {
          showModifyForm === true
          ?
          <>
            {/* <ButtonStyle disabled={passwordAlert} onClick={onModify}>수정하기</ButtonStyle> */}
            <ButtonStyle onClick={onModify}>수정하기</ButtonStyle>
            <ButtonStyle onClick={onCancel}>취소</ButtonStyle>
          </>
          :
          <>
            <ButtonStyle onClick={onRemoveUser}>탈퇴하기</ButtonStyle>
          </>
        }
      </ButtonDiv>
  </UserInfoContainer>
  </>
  )
}

const UserInfo = memo(_UserInfo)

export default UserInfo