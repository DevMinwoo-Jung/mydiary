import React, { FC, useCallback } from 'react'
import Rep from './Rep'
import shortid from 'shortid'
import styled from 'styled-components'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { REPS_DELETE_REQUEST } from 'reducers/post'


type RepsProps = {
  exercise: object;
  id: number;
}

export type exerciseType = {
  kind: string;
  reps: [Object];
}

const DeleteOutlinedStyle = styled(DeleteOutlined)`
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
`


const RepsContainer = styled.div`
  display: block;
  border-radius: 16px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  margin: 1rem 0;
  height: 100px;
`

const RepsHeader = styled.span`
  margin: 1rem;
  margin-top: 2rem;
  font-weight: bolder;
  font-size: 1.2rem;
`

const RepsContents = styled.div`
  display: flex;
  margin: 1rem;
`

const Reps:FC<RepsProps> = (props) => {
  const exercise:exerciseType = props.exercise;
  const id = props.id
  console.log(props)

  const dispatch = useDispatch()

  const onRepsDelete = useCallback(() => {
    console.log(id),
    dispatch({
      type: REPS_DELETE_REQUEST,
      data: id
    })
  }, [])

  return (
    <RepsContainer>
      <RepsHeader>{exercise.kind} <DeleteOutlinedStyle onClick={onRepsDelete}/></RepsHeader>
      <RepsContents>
        {
          exercise.reps.map((element) => {
            return (
                    <Rep key={shortid.generate()} rep={element} />
                    )
              })
        }
      </RepsContents>
    </RepsContainer>
  )
}

export default Reps