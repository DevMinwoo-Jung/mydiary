import { WHITE } from 'libs/css/color'
import React from 'react'
import styled from 'styled-components'

const DeleteImageContainer = styled.div`
  background-color: black;
  opacity: 0.7;
  width: 27rem;
  height: 25rem;
  position: absolute;
  top: 0;
  left: 0;
  &.ant-popover-inner-content {
    padding: 0;
    opacity: 0.7;
  }
`

const Prastyle = styled.p`
  color: ${WHITE};
  z-index: 10;
  line-height: 25rem;
  font-size: 1.5rem;
`

const DeleteDiv = () => (
  <DeleteImageContainer>
    <Prastyle>삭제하기</Prastyle>
  </DeleteImageContainer>
)

export default DeleteDiv
