import React from 'react'
import styled from 'styled-components'
const DeleteImageContainer = styled.div`
  background-color: black;
  opacity: 0.7;
  width: 28rem;
  height: 25rem;
  position: absolute;
  top: 0;
  left: 0;
  &.ant-popover-inner-content {
    padding: 0;
    opacity: 0.7;
  }
`

const DeleteDiv = () => {
  return (
    <DeleteImageContainer>
      <p>삭제하기</p>
    </DeleteImageContainer>
  )
}

export default DeleteDiv