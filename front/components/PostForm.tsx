import { Button, Col, Input, Row } from 'antd'
import useInput from 'libs/hook/useInput'
import React, { memo, useCallback, useEffect, useState } from 'react' 
import styled from 'styled-components'
import DetailForm from './DetailForm'
import { GiConfirmed } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { LOG_IN_SUCCESS } from 'reducers/user'
import moment from 'moment'
import 'moment/locale/ko'
import { size, INDEX_LAYOUT_MOBILE, INDEX_LAYOUT_TABLET, INDEX_LAYOUT_DESKTOP } from 'libs/css/layout'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { ADD_POST_SUCCESS } from 'reducers/post'

moment.locale('ko');

const PostFormContainer = styled.div`
  display: block;
  & h1 {
    text-align: center;
    font-weight: bolder;
  }
  width: 80%;
  margin: auto;
  @media screen and (max-width: ${size.tablet}) { 
    width: 100%;
    margin: auto;
    margin-bottom: 2rem;
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
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const ButtonStyle = styled(Button)`
  width: 100px;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const CancelButtonStyle = styled(Button)`
  width: 60px;
  font-size: 12px;
  margin: 5px;
  border-radius: 9px;
  -webkit-box-shadow: 0px 3px 10px 2px #ABABAB; 
  box-shadow: 0px 3px 10px 2px #ABABAB;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & ::hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
  &.ant-btn:before, .ant-btn {
    background-color: black;
    background: black;
    border-color: ${BUTTON_COLOR};
    width: 1000px;
  }
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
  position: inherit;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const RowStyle = styled(Row)`
  justify-content: center;
`

const DetailFormOuter = styled.div`
  width: 100%;
  margin: auto;
  overflow-y: auto;
  height: 70vh;
`

export const _PostForm = () => {
  const dispatch = useDispatch()
  const [hideRemoveButton, setHideRemoveButton] = useState(false)
  const [hideEdit, setHideEdit] = useState(true);
  const [formLength, setFormLength] = useState([0,1,2,3,4]) 
  const [removeItems, setRemoveItems] = useState([])
  const [exerciseName, onChangeExerciseName] = useInput('스쿼트')
  const [exercise, setExercise] = useState([])
  const [date, onChangeDate] = useInput(moment().format("dddd, MMMM Do YYYY"))

  const onAddReps = useCallback(() => {
    if (formLength.length >= 20) {
      alert('20세트 초과를 할 수 없습니다.')
    } else {
      setFormLength((prev) => [...prev, prev.push()])
    }
  }, [formLength])
  
  const onRemoveReps = useCallback(() => {
    setFormLength(formLength.filter((v) => !removeItems.includes(v)))
  }, [removeItems])

  const onShowRemoveButton = useCallback(() => {
    setHideRemoveButton((prev) => !prev)
  }, [])

  const onAddExercise = useCallback(() => {
    setExercise((prev) => [exercise])
  }, [exercise])

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

  useEffect(() => {
    // console.log(exercise)
  }, [exercise])

  const data = {
    [date]: {
      [exerciseName]: {}
    }
  }

  const onAdd = () => {
    dispatch({
      type: ADD_POST_SUCCESS,
      data: data
    }),
    console.log(data)
  }
  
  return (
    <PostFormContainer>
      <PostFormHeader>
        {
          hideEdit 
          ?
          <span onClick={onEditable}>{date}</span>
          :
          <Input value={date} onChange={onChangeDate} placeholder={date}/>
        }
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
        <RowStyle>
          {
            formLength.map((element, i) => {
              return (
                <Col key={i} xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                  <DetailForm key={i} index={i} onAddExercise={onAddExercise} onAddRemoveItems={onAddRemoveItems} hideRemoveButton={hideRemoveButton}/>
                </Col>
              )
            })
          }
        </RowStyle>
      </DetailFormOuter>
      <ButtonsDiv>
        <ButtonStyle onClick={onAddReps}>추가</ButtonStyle>
        {
          hideRemoveButton 
          ?
          <ButtonStyle onClick={onRemoveReps}>제거하기</ButtonStyle>
          :
          <ButtonStyle onClick={onShowRemoveButton}>제거</ButtonStyle>
        }
        {
          hideRemoveButton 
          ?
          <CancelButtonStyle onClick={onRemoveCancel}>취소</CancelButtonStyle>
          :
          null
        }
        <div>
          <AddButtonStyle onClick={onAdd}>운동일지에 추가</AddButtonStyle>
        </div>
      </ButtonsDiv>
    </PostFormContainer>
  )
}

const PostForm = memo(_PostForm)

export default PostForm