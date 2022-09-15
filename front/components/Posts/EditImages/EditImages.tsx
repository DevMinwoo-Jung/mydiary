import React, { FC, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { REMOVE_EDIT_IMAGE } from 'reducers/post'


type image = {
  src: string
  id: string
}

export type EditImagesProps = {
  image: image[];
}

const ImageContainer = styled.div`
  width: 100%;
  height: 25rem;
  position: relative;
  & img {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
`

const CaretLeftOutlinedStyle = styled(CaretLeftOutlined)`
  font-size: 1.2rem;
  position: absolute;
  top: 12rem;
  color: #f1eded;;
  left: 0.5rem;
  border-radius: 99%;
  background-color: grey;
  opacity: 0.8;
  height: 1.5rem;
  line-height: 1.8rem;
  width: 1.5rem;
  font-weight: 100;
`

const CaretRightOutlinedStyle = styled(CaretRightOutlined)`
  font-size: 1.2rem;
  position: absolute;
  top: 12rem;
  color: #f1eded;
  right: 0.5rem;
  border-radius: 99%;
  background-color: grey;
  opacity: 0.8;
  height: 1.5rem;
  line-height: 1.8rem;
  width: 1.5rem;
  font-weight: 100;
`
const ImgStyle = styled.img`
  border-radius: 1rem 1rem 0 0;
`

const RemoveButtonStyle = styled(Button)`
  width: 20%;
  margin: auto;
  cursor: pointer;
  font-size: 12px;
  border-radius: 9px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  border-color: none;
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
        background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const _EditImages:FC<EditImagesProps>  = (props) => {
  const dispatch = useDispatch()
  const { modifyImagePaths } = useSelector((state) => state.post)
  console.log(modifyImagePaths)

  const [currentSlide, setCurrentSlide] = useState(0);
  const onShowPrevImg = (e) => {
    if (currentSlide === 0) {
      setCurrentSlide(modifyImagePaths.length - 1)
    } else {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const onShowNextImg = () => {
    if (currentSlide === modifyImagePaths.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const onRemoveImage = useCallback((index: any) => () => {
    dispatch({
        type: REMOVE_EDIT_IMAGE,
        data: index
    })
  }, [])

  return (
    <ImageContainer>
        <>
        {
          modifyImagePaths.length === 1
          ? null
          : <CaretLeftOutlinedStyle onClick={onShowPrevImg}/> 
        }
          <ImgStyle src={`http://localhost:3065/${modifyImagePaths[currentSlide]}`}/>
          <RemoveButtonStyle onClick={onRemoveImage(currentSlide)}>제거</RemoveButtonStyle>
        {
          modifyImagePaths.length === 1
          ? null
          : <CaretRightOutlinedStyle onClick={onShowNextImg}/>
        }
        </>
    </ImageContainer>
  )
}

const EditImages = memo(_EditImages)

export default EditImages
