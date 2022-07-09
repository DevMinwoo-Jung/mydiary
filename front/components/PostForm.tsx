import { Button, Col, Input, Row } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { memo, useCallback, useState } from 'react' 
import styled from 'styled-components'
import DetailForm from './DetailForm'
import { GiConfirmed } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { LOG_IN_SUCCESS } from 'reducers/user'
import moment from 'moment'
import 'moment/locale/ko'
import { size, INDEX_LAYOUT_MOBILE, INDEX_LAYOUT_TABLET, INDEX_LAYOUT_DESKTOP } from 'libs/css/layout'

moment.locale('ko');

const PostFormContainer = styled.div`
  display: block;
  & h1 {
    text-align: center;
    font-weight: bolder;
  }
`
const DateDiv = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: left;
  line-height: 45px;
  margin-right: 1rem;
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
  margin-top: 1rem;
  display: block;
  justify-content: center;
  margin-bottom: 1rem;
  & Input {
    width: 120px;
    text-align: center;
    font-size: 2rem;
    font-style: italic;
    border: none;
    margin-right: 1rem;
  }
  & h1 {
    margin: 0 1rem 0 0;
  }
  & span {
    font-size: 2rem;
    cursor: pointer;
  }
`

const ConfirmIcon = styled(GiConfirmed)`
  font-size: 3rem;
  cursor: pointer;
  padding-top: 1.5rem;
`

const ButtonsDiv = styled.div`
  bottom: 60px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const DetailFormOuter = styled.div`
  width: 100%;
  height: 60vh;
  margin: auto;
  overflow-y: auto;
  @media screen and (min-width: ${size.mobileS}) { 
    width: ${INDEX_LAYOUT_MOBILE}px;
    height: 300px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: ${INDEX_LAYOUT_TABLET}px;
    height: 500px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: ${INDEX_LAYOUT_DESKTOP}px;
    height: 600px;
  }
`

export const _PostForm = () => {
  const dispatch = useDispatch()
  const [hideRemoveButton, setHideRemoveButton] = useState(false)
  const [hideEdit, setHideEdit] = useState(true);
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
        <h1>{moment().format("dddd, MMMM Do YYYY")}</h1>
        {
          hideEdit 
          ?
          <span onClick={onEditable}>{exerciseName}</span>
          :
          <Input value={exerciseName} onChange={onChangeExerciseName} placeholder={exerciseName}/>
        }
        {
          hideEdit
          ?
          null
          :
          <ConfirmIcon onClick={onConfirmExerciseName}/>
        }
      </PostFormHeader>
      <DetailFormOuter>
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
      </DetailFormOuter>
      <ButtonsDiv>
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
      </ButtonsDiv>
    </PostFormContainer>
  )
}

const PostForm = memo(_PostForm)

export default PostForm