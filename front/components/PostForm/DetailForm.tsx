import { Form, Input, Checkbox } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
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
  setRepsForm: ({}) => void
  onAddExercise: (data:{}) => void
  rep: {}
  getRep: ({}) => void
}

const _DetailForm: FC<DetailFormProps> = (props) => {
  const { rep ,index, setRepsForm, onAddExercise, getRep } = props 

  // const repsRef = useRef<any>(0)
  // const weightRef = useRef<any>(0)

  const [reps, onChangeReps] = useInput('')
  const [weight, onChangeWeight] = useInput('')

  useEffect(() => {
    if (sibal) {
    ç
    }
  }, [sibal])


  return (
    <DetailFormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item>
            <FormContainer>
              <h2>{index + 1}.</h2>
              <input value={reps} name="repsvalue" onChange={onChangeReps} placeholder='10' type="text"/>
              <span>X</span>
              <input value={weight} name="weightRef" onChange={onChangeWeight} placeholder='10' type="text"/>
              <span>kg</span>
            </FormContainer>
          </Form.Item>
        </Form>
    </DetailFormContainer>
  )
}

const DetailForm = memo(_DetailForm)

export default DetailForm
