import { Form, Input, Checkbox } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { FC, memo, useCallback, useEffect } from 'react'
import styled from 'styled-components'

const DetailFormContainer = styled.div`
  display: flex;
  justify-content: center;
  & Input {
    height: 45px;
    border-radius: 12px;
  }
`

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  
  & h2 {
    margin: 0 1rem 0 0;
    font-size: 2rem;
    color: #c4bebe;
    font-weight: bolder;
    font-style: italic;
  }

  & Input {
    width: 70px;
    text-align: center;
  }

  & span {
    margin: 0 1rem 0 1rem;
    font-size: 1rem;
    font-weight: bold;
  }
`



type DetailFormProps = {
  index: number
  onAddRemoveItems: (target:number) => void
  hideRemoveButton: boolean
  onAddExercise: ({}) => void
}

const _DetailForm: FC<DetailFormProps> = (props) => {
  const { index, onAddRemoveItems, hideRemoveButton, onAddExercise } = props 
  const [reps, onChangeReps] = useInput('')
  const [weight, onChangeWeight] = useInput('')

  const onSubmit = useCallback(() => {
    alert('눌렸다능')
  }, [reps])

  const goRemoveItems = useCallback((e) => {
    onAddRemoveItems(index)
  }, [])

  useEffect(() => {
    // console.log('???')
    goAddExercise()
  }, [reps, weight])

  const goAddExercise = () => {
    // console.log(index, reps, weight)
    onAddExercise({index: {[reps]:[weight]}})
  }


  return (
    <DetailFormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item>
            <FormContainer>
              {
                hideRemoveButton &&
                <Checkbox onChange={goRemoveItems}></Checkbox>
              }
              <h2>{index + 1}.</h2>
              <Input value={reps} onChange={onChangeReps} placeholder='10'/>
              <span>X</span>
              <Input value={weight} onChange={onChangeWeight} placeholder=''/>
              <span>kg</span>
            </FormContainer>
          </Form.Item>
        </Form>
    </DetailFormContainer>
  )
}

const DetailForm = memo(_DetailForm)

export default DetailForm