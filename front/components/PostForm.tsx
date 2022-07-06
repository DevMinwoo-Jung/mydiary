import { Button } from 'antd'
import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import DetailForm from './DetailForm'

const PostFormContainer = styled.div`
  
  & h1 {
    text-align: left;
    font-weight: bolder;
  }
`
const ButtonStyle = styled(Button)`
  font-size: 12px;
  margin: 5px;
`

export const _PostForm = () => {
  const [hideRemoveButton, setHideRemoveButton] = useState(false)
  const [formLength, setFormLength] = useState([0,1,2,3,4]) 
  const [removeItems, setRemoveItems] = useState([])

  const onAddReps = useCallback(() => {
    setFormLength((prev) => [...prev, prev.push()])
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

  console.log(formLength)

  console.log(removeItems)
  return (
    <PostFormContainer>
      <h1>기록하기</h1>
      <>
      {
        formLength.map((element, i) => {
          return (
            <DetailForm key={i} index={i} onAddRemoveItems={onAddRemoveItems} hideRemoveButton={hideRemoveButton}/>
          )
        })
      }
      <ButtonStyle type="primary" onClick={onAddReps}>추가</ButtonStyle>
      {
        hideRemoveButton 
        ?
        <ButtonStyle type="primary" onClick={onRemoveReps}>제거하기</ButtonStyle>
        :
        <ButtonStyle type="primary" onClick={onShowRemoveButton}>제거</ButtonStyle>
      }
      </>
    </PostFormContainer>
  )
}

const PostForm = memo(_PostForm)

export default PostForm