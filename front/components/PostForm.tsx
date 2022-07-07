import { Button, Col, Input, Row } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { memo, useCallback, useState } from 'react' 
import styled from 'styled-components'
import DetailForm from './DetailForm'
import { GiConfirmed } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { LOG_IN_SUCCESS } from 'reducers/user'

const PostFormContainer = styled.div`
  & h1 {
    text-align: center;
    font-weight: bolder;
  }
  `
const AddButtonStyle = styled(Button)`
  border-radius: 12px;
  width: 300px;
  margin-top: 0.5rem;
  font-size: 1rem;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
`

const ButtonStyle = styled(Button)`
  width: 100px;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
`

const CancelButtonStyle = styled(Button)`
  width: 60px;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
`

const PostFormHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  & Input {
    width: 120px;
    text-align: center;
    font-size: 1.5em;
    font-style: italic;
    border-radius: 12px;
    height: 50px;
    margin-right: 1rem;
  }
  & h1 {
    margin: 0 1rem 0 0;
    cursor: pointer;
  }
`
const EditIconDiv = styled.div`
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
`


export const _PostForm = () => {
  const dispatch = useDispatch()
  const [hideRemoveButton, setHideRemoveButton] = useState(false)
  const [hideEdit, setHideEdit] = useState(false);
  const [formLength, setFormLength] = useState([0,1,2,3,4]) 
  const [removeItems, setRemoveItems] = useState([])
  const [exerciseName, onChangeExerciseName] = useInput('스쿼트')

  const onAddReps = useCallback(() => {
    if (formLength.length > 20) {
      alert('20세트 초과를 할 수 없습니다.')
    } else {
      setFormLength((prev) => [...prev, prev.push()])
    }
  }, [])
  
  const onRemoveReps = useCallback(() => {
    setFormLength(formLength.filter((v) => !removeItems.includes(v)))
  }, [removeItems])

  const onShowRemoveButton = useCallback(() => {
    setHideRemoveButton((prev) => !prev)
  }, [])

  const onAddRemoveItems = useCallback((e) => {
    setRemoveItems((prev) => [...prev, e])
  }, [])

  const onRemoveCancel = useCallback(() => {
    setHideRemoveButton((prev) => !prev)
  }, [])

  const onEditable = () => {
    setHideEdit((prev) => !prev)
  }

  const onConfirmExerciseName = () => {
    setHideEdit((prev) => !prev)
  }

  const onAdd = () => {
    alert('야호')
    dispatch({
      type: LOG_IN_SUCCESS
    })
  }
  
  return (
    <PostFormContainer>
      <PostFormHeader>
        {
          hideEdit 
          ?
          <h1 onClick={onEditable}>{exerciseName}</h1>
          :
          <Input value={exerciseName} onChange={onChangeExerciseName} placeholder={exerciseName}/>
        }
        {
          hideEdit
          ?
          null
          :
          <EditIconDiv>
            <GiConfirmed onClick={onConfirmExerciseName}/>
          </EditIconDiv>
        }
      </PostFormHeader>
      <Row>
      {
        formLength.map((element, i) => {
          return (
            <Col xs={24} sm={24} md={24} lg={12}>
              <DetailForm key={i} index={i} onAddRemoveItems={onAddRemoveItems} hideRemoveButton={hideRemoveButton}/>
            </Col>
          )
        })
      }
      </Row>
      <ButtonStyle type="primary" onClick={onAddReps}>추가</ButtonStyle>
      {
        hideRemoveButton 
        ?
        <ButtonStyle type="primary" onClick={onRemoveReps}>제거하기</ButtonStyle>
        :
        <ButtonStyle type="primary" onClick={onShowRemoveButton}>제거</ButtonStyle>
      }
      {
        hideRemoveButton 
        ?
        <CancelButtonStyle type="primary" onClick={onRemoveCancel}>취소</CancelButtonStyle>
        :
        null
      }
      <div>
        <AddButtonStyle type="primary" onClick={onAdd}>운동일지에 추가</AddButtonStyle>
      </div>
    </PostFormContainer>
  )
}

const PostForm = memo(_PostForm)

export default PostForm