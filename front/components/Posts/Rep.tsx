import { Input } from 'antd'
import { size } from 'libs/css/layout'
import useInput from 'libs/hook/useInput'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
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
  const { modify } = useSelector((state) => state.post)
  const { rep } = props
  const [ reps, onChangeReps] = useInput('')
  const [ weigth, onChangeWeigth] = useInput('') 

  const placeholderRep =  Object.keys(rep)
  const placeholderWeight = Object.values(rep)
  console.log(placeholderRep[0])
  console.log(placeholderWeight[0])

  return (
    <RepContainer>
      {
        modify 
        ?
        <span>
        <InputStyle value={reps} onChange={onChangeReps} placeholder={placeholderRep[0]}/>  /
        <InputStyle value={weigth} onChange={onChangeWeigth} placeholder={''}/>  
        </span>
        :
        <span>{Object.keys(rep)} / {Object.values(rep)}</span>
      }
    </RepContainer>
  )
}

export default Rep