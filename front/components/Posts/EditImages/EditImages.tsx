import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUND_COLOR, BUTTON_COLOR } from 'libs/css/color'
import { LOAD_EDIT_IMAGE, REMOVE_EDIT_IMAGE } from 'reducers/post'
import DeleteDiv from '../DeleteDiv'
import useToggle from 'libs/hook/useToggle'
import { IoTrashBinOutline } from 'react-icons/io5'


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
  margin-top: 3rem;
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
  top: 12.5rem;
  color: #f1eded;;
  left: 0.5rem;
  background-color: grey;
  border-radius: 99%;
  opacity: 0.8;
  height: 1.5rem;
  line-height: 1.8rem;
  width: 1.5rem;
  font-weight: 100;
`

const CaretRightOutlinedStyle = styled(CaretRightOutlined)`
  font-size: 1.2rem;
  position: absolute;
  top: 12.5rem;
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
`

const RemoveButtonStyle = styled(IoTrashBinOutline)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: auto;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 9px;
  color: ${BACKGROUND_COLOR};
  border-color: none;
  font-weight: bolder;
  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${BACKGROUND_COLOR};
    font-weight: bolder;
  }
  &.ant-btn:hover, .ant-btn:focus, .ant-btn:active{
    background-color: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
    color: ${BACKGROUND_COLOR};
    font-weight: bolder;
  }
`

const Slide = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  bottom: 5%;
  font-size: 12px;
  border-radius: 6px;
  background-color: #464545;
  width: 15%;
  height: 1.5rem;
  line-height: 1.5rem;
  opacity: 0.6;
  color: white;
`


const _EditImages:FC<EditImagesProps>  = (props) => {
  const dispatch = useDispatch()
  const { modifyImagePaths } = useSelector((state) => state.post)
  const { image } = props
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hideDelete, toggle] = useToggle()

  const onShowPrevImg = (e) => {
    if (currentSlide === 0) {
      setCurrentSlide(modifyImagePaths.length - 1)
    } else {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  useEffect(() => {
    dispatch({
      type: LOAD_EDIT_IMAGE,
      data: image
    })
  }, [])


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
    <>
      {
        modifyImagePaths.length === 0 
        ? null
        : 
        <ImageContainer>
          {
            modifyImagePaths.length === 1
            ? null
            : <CaretLeftOutlinedStyle onClick={onShowPrevImg}/> 
          }
          <ImgStyle src={`http://localhost:3065/${modifyImagePaths[currentSlide]}`}/>
            {
              hideDelete === false ? <DeleteDiv/> : null
            }
          <Slide>
            <p>{currentSlide+1} / {modifyImagePaths.length}</p>
          </Slide>
            <RemoveButtonStyle onMouseEnter={toggle} onMouseLeave={toggle} onClick={onRemoveImage(currentSlide)}>제거</RemoveButtonStyle>
          {
            modifyImagePaths.length === 1
            ? null
            : <CaretRightOutlinedStyle onClick={onShowNextImg}/> 
          }
        </ImageContainer>
      }
    </>  
  )
}

const EditImages = memo(_EditImages)

export default EditImages
