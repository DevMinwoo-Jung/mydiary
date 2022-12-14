import { Input, message, Popconfirm, Tooltip, Divider } from 'antd'
import { size } from 'libs/css/layout'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { HIDE_MODIFY_FORM, LOAD_MY_INFO_REQUEST, USER_INFO_MODIFY_REQUEST, USER_REMOVE_REQUEST } from 'reducers/user'
import { GRAY } from 'libs/css/color'
import router from 'next/router'
import useLengthCheck from 'libs/hook/useLengthCheck'
import { TiCancel } from 'react-icons/ti'
import { FiEdit } from 'react-icons/fi'
import { IoPersonRemove } from 'react-icons/io5'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { UserState } from 'libs/type'

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

const TiCancelStyle = styled.div`
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  text-align: center;
  position: absolute;
  bottom: 0.5rem;
  right: 2rem;
`

const ModifyIconStyle = styled.div`
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  text-align: center;
  position: absolute;
  bottom: 0.5rem;
  right: 0;
`

const ModifyIconDisabledStyle = styled.div`
  font-size: 2rem;
  cursor: none;
  pointer-events: none;
  color: ${GRAY};
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  text-align: center;
  position: absolute;
  bottom: 0.5rem;
  right: 0;
`

const AlertMessageStyle = styled.div`
  color: #ff4d4f;
  font-size: 0.7rem;
  text-align: center;
  margin: auto;
  width: 150px;
  text-align: left;
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

  const { showModifyForm } = useSelector((state:UserState) => state.user)
  const nickname = useSelector((state:UserState) => state.user?.me?.nickname)
  const userId = useSelector((state:UserState) => state.user?.me?.userId)

  const [userNickname, onChangeUserNickname] = useInput('')
  const [userPassword, onChangeUserPassword] = useInput('')
  const [checkPassword, onChangeCheckPssword] = useInput('')

  const [checkNickNameLength, alertNickNameMessage] = useLengthCheck(10, userNickname, '?????????')
  const [checkPwLength, alertPwMessage] = useLengthCheck(20, userPassword, '????????????')

  const [passwordAlert, setPasswordAlert] = useState(false)
  const [, setIsModalOpen] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const onModify = useCallback(() => {
    dispatch({
      type: USER_INFO_MODIFY_REQUEST,
      data: { userNickname, userPassword },
    })
    dispatch({
      type: HIDE_MODIFY_FORM,
    })
    router.reload();
  }, [userNickname, userPassword])

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, [])

  const onCancel = () => {
    dispatch({
      type: HIDE_MODIFY_FORM,
    })
  }

  const showModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
    if (checkPassword !== userPassword) {
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
    message.error('????????? ?????????????????????.');
  };

  return (
    <>
      <UserInfoContainer>
        <UserInfoDiv>
          <UserInfoInnerDiv>
            <TitleDiv>
              <ParagraphStyle>?????????</ParagraphStyle>
            </TitleDiv>
            <InfoDiv>
              <ParagraphStyle>{userId}</ParagraphStyle>
            </InfoDiv>
          </UserInfoInnerDiv>
        </UserInfoDiv>
        <DividerStyle />
        <UserInfoContainer>
          <UserInfoDiv>
            <UserInfoInnerDiv>
              <TitleDiv>
                <ParagraphStyle>?????????</ParagraphStyle>
              </TitleDiv>
              <InfoDiv>
                <ParagraphStyle>{nickname}</ParagraphStyle>
              </InfoDiv>
              {
            showModifyForm
            && (
            <ModifyDiv>
              <InputStyle onChange={onChangeUserNickname} placeholder={nickname} />
              {
                checkNickNameLength === true
                  ? <AlertMessageStyle>{alertNickNameMessage}</AlertMessageStyle>
                  : null
              }
            </ModifyDiv>
            )
          }
            </UserInfoInnerDiv>
          </UserInfoDiv>
        </UserInfoContainer>
        <DividerStyle />
        <UserInfoDiv>
          <UserInfoInnerDiv>
            <TitleDiv>
              <ParagraphStyle>????????????</ParagraphStyle>
            </TitleDiv>
            <>
              <ModifyDiv>
                {
          showModifyForm
            && (
            <>
              <InputStyle type="password" onChange={onChangeUserPassword} placeholder="" />
              {
              checkPwLength === false ? null
                : <AlertMessageStyle>{alertPwMessage}</AlertMessageStyle>
            }
            </>
            )
          }
              </ModifyDiv>
              <ModifyDiv>
                {
                showModifyForm === false
                  ? null
                  : (
                    <>
                      <InputStyle type="password" onChange={onChangeCheckPssword} placeholder="????????? ??????????????? ?????? ???????????????" />
                      {
                    passwordAlert === false ? null
                      : <AlertMessageStyle>??????????????? ???????????? ????????????.</AlertMessageStyle>
                  }
                    </>
                  )
              }
              </ModifyDiv>
            </>
          </UserInfoInnerDiv>
        </UserInfoDiv>
        <ButtonDiv>
          {
          showModifyForm === true
            ? (
              <ModifyButtonDiv>
                {
              buttonDisabled
                ? (
                  <>
                    <ModifyIconDisabledStyle>
                      <FiEdit />
                    </ModifyIconDisabledStyle>
                  </>
                )
                : (
                  <>
                    <Tooltip title="????????????">
                      <ModifyIconStyle onClick={onModify}>
                        <FiEdit />
                      </ModifyIconStyle>
                    </Tooltip>
                  </>
                )
            }

                <Tooltip title="??????">
                  <TiCancelStyle onClick={onCancel}>
                    <TiCancel />
                  </TiCancelStyle>
                </Tooltip>
              </ModifyButtonDiv>
            )
            : <ModifyButtonDiv />
        }
        </ButtonDiv>
        {
          showModifyForm === true
            ? (
              <RemoveUserDiv>
                <Popconfirm
                  title="????????? ?????? ???????????? ????????? ??? ????????????."
                  onCancel={cancel}
                  onConfirm={() => confirm()}
                  okText="??????"
                  cancelText="??????"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Tooltip title="????????????">
                    <IoPersonRemoveStyle onClick={showModal} />
                  </Tooltip>
                </Popconfirm>
              </RemoveUserDiv>
            )
            : null
        }
      </UserInfoContainer>
    </>
  )
}

const UserInfo = memo(_UserInfo)

export default UserInfo
