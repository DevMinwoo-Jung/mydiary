import { Input } from 'antd'
import React, { FC } from 'react'
import styled from 'styled-components'

type RepProps = {
  rep: {}
}

const RepContainer = styled.div`
  width: 100%;
  display: flex;
`

const InputStyle = styled(Input)`
  border-radius: 2px;
  width: 20px;
`

const Rep:FC<RepProps> = (props) => {
  const { rep } = props


  return (
    <RepContainer>
      {
        <span>{Object.keys(rep)} / {Object.values(rep)}</span>
      }
    </RepContainer>
  )
}

export default Rep