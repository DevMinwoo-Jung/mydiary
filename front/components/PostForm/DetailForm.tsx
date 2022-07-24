import { Form, Input, Checkbox } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { FC, memo, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

const DetailFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  & Input {
    height: 50px;
    border-radius: 12px;
  }
`

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  & h2 {
    margin: 0 1rem 0 0;
    font-size: 2rem;
    color: #c4bebe;
    font-weight: bolder;
    font-style: italic;
  }

  & Input {
    width: 80px;
    text-align: center;
    font-size: 1rem;
    font-weight: bolder;
  }

  & span {
    margin: 0 1rem 0 1rem;
    font-size: 1rem;
    font-weight: bold;
  }
`



type DetailFormProps = {
  index: number
  onAddRemoveItems: (target:string) => void
  hideRemoveButton: boolean
  onAddExercise: ({}) => void
  id: string
  repsform: {}
}

const _DetailForm: FC<DetailFormProps> = (props) => {
  const { repsform, id, index, onAddRemoveItems, hideRemoveButton, onAddExercise } = props 
  const reps = useRef<HTMLInputElement>()
  const weight = useRef<HTMLInputElement>()
  
  const goRemoveItems = () => {
    onAddRemoveItems(id)
  }

  // useEffect(() => {
  //   // console.log('???')
  //   goAddExercise()
  // }, [reps, weight])

  // const goAddExercise = useCallback(() => {
  //   // console.log({[reps]:weight})
  //   onAddExercise({[reps]:weight})
  // },[reps, weight])


  return (
    <DetailFormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item>
            <FormContainer>
              {
                hideRemoveButton &&
                <Checkbox onChange={goRemoveItems}></Checkbox>
              }
              <h2>{index + 1}.</h2>
              <input ref={reps} placeholder=''/>
              <span>X</span>
              <input ref={weight} placeholder=''/>
              <span>kg</span>
            </FormContainer>
          </Form.Item>
        </Form>
    </DetailFormContainer>
  )
}

const DetailForm = memo(_DetailForm)

export default DetailForm