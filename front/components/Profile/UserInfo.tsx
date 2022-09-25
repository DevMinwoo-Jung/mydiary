import { Button, Input, message, Popconfirm, Tooltip } from 'antd'
import { size } from 'libs/css/layout'
import { Divider } from 'antd'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { HIDE_MODIFY_FORM, USER_INFO_MODIFY_REQUEST, USER_REMOVE_REQUEST } from 'reducers/user'
import { BORDER_COLOR, FONT_COLOR, GRAY, WHITE } from 'libs/css/color'
import router from 'next/router'
import RemoveUser from './RemoveUser'
import { useLengthCheck } from 'libs/hook/useLengthCheck'
import { TiCancel } from 'react-icons/ti'
import { FiEdit } from 'react-icons/fi'
import { IoPersonRemove } from 'react-icons/io5'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const UserInfoContainer = styled.div`
  display: block;
  height: 100px;
  width: 100%;
  margin-top: 3rem;
  font-size: 1.1rem;
  @media screen and (max-width: ${size.mobileL}) {
    font-size: 1rem;
  }
`

const ParagraphStyle = styled.p`
  margin: 0 1rem 0 1rem;
`

const UserInfoDiv = styled.div`
  width: 100%;
`

const UserInfoInnerDiv = styled.div`
  display: flex;
  left: 1rem;
  width: 100%;
`

const TitleDiv = styled.div`
  width: 20%;
  @media screen and (max-width: ${size.mobileL}) {
    width: 30%;
  }
`

const InfoDiv = styled.div`
  width: 40%;
`

const ModifyDiv = styled.div`
  display: block;
  width: 40%;
`

const DividerStyle = styled(Divider)`
  &.ant-divider-horizontal {
    width: 80%;
    min-width: 80%;
    margin: 1rem auto;
  }
`

const InputStyle = styled(Input)`
  font-size: 1rem;
  border-radius: 6px;
  height: 30px;
  @media screen and (min-width: ${size.mobileS}) { 
    width: 100px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: 150px;
  }
`

const ButtonDiv = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`

const TiCancelStyle = styled(TiCancel)`
  font-size: 2rem;
  cursor: pointer;
`

const ModifyIconStyle = styled(FiEdit)`
  font-size: 2rem;
  cursor: pointer;
`

const ModifyIconDisabledStyle = styled(FiEdit)`
  font-size: 2rem;
  cursor: none;
  pointer-events: none;
  color: ${GRAY};
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

const ModifyButtonDiv = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
`

const RemoveUserDiv = styled.div`
  position: absolute;
  right: 6.2rem;
  bottom: 2rem;
  display: flex;
`

const IoPersonRemoveStyle = styled(IoPersonRemove)`
  font-size: 2rem;
  cursor: pointer;
`




const _UserInfo = () => {
  const dispatch = useDispatch()

  const { showModifyForm } = useSelector((state) => state.user)
  const nickname = useSelector((state) => state.user?.me?.nickname)
  const userId = useSelector((state) => state.user?.me?.userId)

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

  const confirm = () => {
    dispatch({
      type: USER_REMOVE_REQUEST,
    })
    router.push('/')
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('탈퇴가 취소되었습니다.');
  };


  return (
  <>
    <UserInfoContainer>
    <UserInfoDiv>
      <UserInfoInnerDiv>
        <TitleDiv>
          <ParagraphStyle>아이디</ParagraphStyle>
        </TitleDiv>
        <InfoDiv>
          <ParagraphStyle>{userId}</ParagraphStyle> 
        </InfoDiv>
      </UserInfoInnerDiv>
    </UserInfoDiv>
    <DividerStyle/>
    <UserInfoContainer>
      <UserInfoDiv>
        <UserInfoInnerDiv>
          <TitleDiv>
            <ParagraphStyle>활동명</ParagraphStyle>
          </TitleDiv>
          <InfoDiv>
            <ParagraphStyle>{nickname}</ParagraphStyle> 
          </InfoDiv>
          {
            showModifyForm &&
            <ModifyDiv>
              <InputStyle onChange={onChangeUserNickname} placeholder={nickname}/>
              {
                checkNickNameLength === true ?
                <AlertMessageStyle>{alertNickNameMessage}</AlertMessageStyle>
                : null
              }
            </ModifyDiv>
          }
        </UserInfoInnerDiv>
      </UserInfoDiv>
    </UserInfoContainer>
    <DividerStyle/>
    <UserInfoDiv>
      <UserInfoInnerDiv>
        <TitleDiv>
          <ParagraphStyle>비밀번호</ParagraphStyle>
        </TitleDiv>
        <>
          <ModifyDiv>
          {
          showModifyForm &&
            <>
            <InputStyle type={'password'} onChange={onChangeUserPassword} placeholder={''}/>
            {
              checkPwLength === false ? null
              : <AlertMessageStyle>{alertPwMessage}</AlertMessageStyle>
            }
            </>
          }
          </ModifyDiv>
          <ModifyDiv>
              {
                showModifyForm === false 
                ? null
                : 
                <>
                <InputStyle type={'password'} onChange={onChangeCheckPssword} placeholder={'변경할 비밀번호를 다시 입력하세요'}/>
                  {
                    passwordAlert === false ? null
                    : <AlertMessageStyle>비밀번호가 일치하지 않습니다.</AlertMessageStyle>
                  }
                </>
              }
            </ModifyDiv>   
        </>
      </UserInfoInnerDiv>
    </UserInfoDiv>
    <ButtonDiv>
        {
          showModifyForm === true
          ?
          <ModifyButtonDiv>
            {
              buttonDisabled 
              ?
                  <ModifyIconDisabledStyle/>
              :
              <>
                <Tooltip title="수정하기">
                  <ModifyIconStyle onClick={onModify}/>
                </Tooltip>
              </>
            }

            <Tooltip title="취소">
              <TiCancelStyle onClick={onCancel}/>
            </Tooltip>
          </ModifyButtonDiv>
          :
          <ModifyButtonDiv>

          </ModifyButtonDiv>
        }
      </ButtonDiv>
      {
          showModifyForm === true
          ?
        <RemoveUserDiv>
          <Popconfirm
            title="탈퇴할 경우 게시물은 복구할 수 없습니다."
            onCancel={cancel}
            onConfirm={() => confirm()}
            okText="삭제"
            cancelText="취소"
            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
            >
              <Tooltip title="탈퇴하기">
                <IoPersonRemoveStyle onClick={showModal}/>
              </Tooltip>
          </Popconfirm>
        </RemoveUserDiv>
        : null
        }
  </UserInfoContainer>
  </>
  )
}

const UserInfo = memo(_UserInfo)

export default UserInfo