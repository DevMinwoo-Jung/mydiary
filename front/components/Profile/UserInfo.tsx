import { Button, Input, Typography } from 'antd'
import { size } from 'libs/css/layout'
import { Divider } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { MODIFY_CANCEL, MODIFY_REQUEST, USER_REMOVE_REQUEST } from 'reducers/user'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'

const { Title, Paragraph } = Typography

const UserInfoContainer = styled.div`
  display: block;
  height: 100px;
  width: 100%;
  padding-top: 10vh;
`

const UserInfoDiv = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  & div {
  display: block;
    @media screen and (max-width: ${size.tablet}) { 
    display: block;
    width: 175px;
  }

  @media screen and (min-width: ${size.tablet}) {
    width: 300px;
  }

  @media screen and (min-width: ${size.laptopL}) {
    width: 350px;
  }
}
`

const ParagraphStyle = styled(Paragraph)`
  font-size: 1.5rem;
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
    width: 150px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: 200px;
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
  const { nickname, id, createdAt, password, weight, height } = useSelector((state) => state.user.user)
  const { modifyLoading } = useSelector((state) => state.user)

const disaptch = useDispatch()

  const [ userNickname, onChangeUserNickname] = useInput('')
  const [ userPassword, onChangeUserPassword] = useInput('')
  const [ checkPassword, onChangeCheckPssword] = useInput('')
  const [ userHeight, onChangeUserHeight] = useInput('')
  const [ userWeight, onChangeUserWeight] = useInput('')
  const [ passwordAlert, setPasswordAlert ] = useState(false)

  const onModify = (data) => {
    // console.log(data)
    disaptch({
      type: MODIFY_REQUEST,
      data,
    })
  }

  const onCancel = () => {
    disaptch({
      type: MODIFY_CANCEL
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
  }, [checkPassword])


  return (
  <>
    <UserInfoContainer>
    <Title level={1}>내 정보</Title>
    <DividerStyle/>
    <UserInfoDiv>
      <div>
        <Title level={2}>아이디</Title>
        <ParagraphStyle>{id}</ParagraphStyle> 
      </div>
      <div>
        <Title level={2}>활동명</Title>
        {
          modifyLoading === false 
          ?
          <ParagraphStyle>{nickname}</ParagraphStyle> 
          :
          <InputStyle value={userNickname} onChange={onChangeUserNickname} placeholder={nickname}/>
        }
      </div>
    </UserInfoDiv>
    <DividerStyle/>
    <UserInfoDiv>
      <div>
        <Title level={2}>회원가입 날짜</Title>
        <ParagraphStyle>{createdAt}</ParagraphStyle> 
      </div>
      <div>
        <Title level={2}>비밀번호</Title>
        {
          modifyLoading === false
          ?
          <ParagraphStyle>{password}</ParagraphStyle> 
          :
          <PasswordDiv>
            <InputStyle type={'password'} value={userPassword} onChange={onChangeUserPassword} placeholder={password}/>
            <br/>
            <br/>
            <InputStyle type={'password'} value={checkPassword} onChange={onChangeCheckPssword} placeholder={'변경할 비밀번호를 다시 입력하세요'}/>
            {
              passwordAlert &&
              <Paragraph style={{color: '#dd7474'}}>비밀번호가 일치하지 않습니다.</Paragraph>
            }
          </PasswordDiv>
        }
      </div>
    </UserInfoDiv>
    <DividerStyle/>
    <UserInfoDiv>
    <div>
        <Title level={2}>키</Title>
        {
          modifyLoading === false 
          ?
          <ParagraphStyle>{height}cm</ParagraphStyle> 
          :
          <InputStyle value={userHeight} onChange={onChangeUserHeight} placeholder={`${height}cm`}/>
        }
      </div>
      <div>
        <Title level={2}>몸무게</Title>
        {
          modifyLoading === false 
          ?
          <ParagraphStyle>{weight}kg</ParagraphStyle> 
          :
          <InputStyle value={userWeight} onChange={onChangeUserWeight} placeholder={`${weight}kg`}/>
        }
      </div>
    </UserInfoDiv>
    <ButtonDiv>
        {
          modifyLoading 
          ?
          <>
            <ButtonStyle onClick={onModify}>수정하기</ButtonStyle>
            <ButtonStyle onClick={onCancel}>취소</ButtonStyle>
          </>
          :
            <ButtonStyle onClick={onRemoveUser}>탈퇴하기</ButtonStyle>
        }
      </ButtonDiv>
  </UserInfoContainer>
  </>
  )
}

const UserInfo = memo(_UserInfo)

export default UserInfo