import { Button, Input, Typography } from 'antd'
import { size } from 'libs/css/layout'
import { Divider } from 'antd'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { HIDE_MODIFY_FORM, LOAD_MY_INFO_REQUEST, USER_INFO_MODIFY_REQUEST, USER_REMOVE_REQUEST } from 'reducers/user'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import router from 'next/router'
import RemoveUser from './RemoveUser'
import { useLengthCheck } from 'libs/hook/useLengthCheck'

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
  border-color: none;
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    font-weight: bolder;
  }
`

const ModalContainer = styled.div`
  position: absolute;
  margin: auto;
`
const AlertMessageStyle = styled.div`

  color: #ff4d4f;
  font-size: 0.8rem;
  text-align: center;
`


const _UserInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
  }, [])

  const { showModifyForm, userInfomodifyDone } = useSelector((state) => state.user)
  const nickname = useSelector((state) => state.user?.me?.nickname)
  const userId = useSelector((state) => state.user?.me?.userId)
  const createdAt = useSelector((state) => state.user?.me?.createdAt)

  const [userNickname, onChangeUserNickname ] = useInput('')
  const [userPassword, onChangeUserPassword] = useInput('')
  const [checkPassword, onChangeCheckPssword] = useInput('')

  const [checkNickNameLength, alertNickNameMessage] = useLengthCheck(10, userNickname, '닉네임')
  const [checkPwLength, alertPwMessage] = useLengthCheck(20, userPassword, '비밀번호')

  const [passwordAlert, setPasswordAlert] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonDisabled , setButtonDisabled] = useState(true)

  const onModify = useCallback(() => {
    router.push('/')
    dispatch({
      type: USER_INFO_MODIFY_REQUEST,
      data: {userNickname, userPassword},
    })
    dispatch({
      type: HIDE_MODIFY_FORM
    })
  },[userNickname, userPassword]) 

  const onCancel = () => {
    dispatch({
      type: HIDE_MODIFY_FORM
    })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [isModalOpen])

  useEffect(() => {
    if(userInfomodifyDone === true) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST
      })
    }
  }, [userInfomodifyDone])

  useEffect(() => {
    if (checkNickNameLength 
        || checkPwLength 
        || passwordAlert) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [checkNickNameLength, checkPwLength, passwordAlert])

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
          <>
            <InputStyle value={userNickname} onChange={onChangeUserNickname} placeholder={nickname}/>
            {
              checkNickNameLength === true ?
              <AlertMessageStyle>{alertNickNameMessage}</AlertMessageStyle>
              : null
            }
          </>
        }
      </UserInfoInnerDiv>
    </UserInfoDiv>
    <DividerStyle/>
    <UserInfoDiv>
      <UserInfoInnerDiv>
        <Title level={3}>회원가입 날짜</Title>
        <ParagraphStyle>{createdAt && createdAt.split('').slice(0,10)}</ParagraphStyle> 
      </UserInfoInnerDiv>
      <UserInfoInnerDiv>
        <Title level={3}>비밀번호</Title>
        {
          showModifyForm &&
          <PasswordDiv>
            <InputStyle type={'password'} value={userPassword} onChange={onChangeUserPassword} placeholder={null}/>
            {
              checkPwLength === true ?
              <AlertMessageStyle>{alertPwMessage}</AlertMessageStyle>
              : null
            }
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
            <ButtonStyle disabled={buttonDisabled} onClick={onModify}>수정하기</ButtonStyle>
            <ButtonStyle onClick={onCancel}>취소</ButtonStyle>
          </>
          :
          <>
            <ButtonStyle onClick={showModal}>탈퇴하기</ButtonStyle>
          </>
        }
      </ButtonDiv>
      {
        isModalOpen === true ?
          <ModalContainer>
            <RemoveUser closeModal={closeModal} isModalOpen={isModalOpen}/>
          </ModalContainer>
          : null
      }
  </UserInfoContainer>
  </>
  )
}

const UserInfo = memo(_UserInfo)

export default UserInfo