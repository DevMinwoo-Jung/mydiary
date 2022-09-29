/* eslint-disable react/button-has-type */
import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { USER_REMOVE_REQUEST } from 'reducers/user';
import { useRouter } from 'next/router'

type RemoveUserPorps = {
  isModalOpen: boolean;
  closeModal: () => void;
}

const RemoveUser:FC<RemoveUserPorps> = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { closeModal } = props

  const handleCancel = () => {
    closeModal();
  };

  const onRemoveUser = useCallback(() => {
    dispatch({
      type: USER_REMOVE_REQUEST,
    })
    router.push('/')
  }, [])

  return (
    <>
      <div>
        <p>탈퇴할 경우 작성하신 게시글은 복구할 수 없습니다.</p>
        <button onClick={onRemoveUser}>탈퇴하기</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </>
  );
}

export default RemoveUser
