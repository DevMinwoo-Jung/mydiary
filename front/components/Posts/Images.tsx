import React, { FC, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { REMOVE_IMAGE } from 'reducers/post'
import useToggle from 'libs/hook/useToggle'
import DeleteDiv from './DeleteDiv'


type image = {
  src: string
  id: string
}

export type ImagesProps = {
  image: image[];
  type?: string;
}

const ImageContainer = styled.div`
  width: 100%;
  height: 35rem;
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
  top: 17.5rem;
  color: #f1eded;
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
  top: 17.5rem;
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
  border-radius: 0.5rem 0.5rem 0 0;
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


const RemoveButtonStyle = styled(Button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
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

const _Images:FC<ImagesProps>  = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { image, type } = props
  const dispatch = useDispatch()
  const [hideDelete, toggle] = useToggle()

  console.log(image)

  const { me } = useSelector((state) => state.user)

  const onShowPrevImg = (e) => {
    if (currentSlide === 0) {
      setCurrentSlide(image.length - 1)
    } else {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const onShowNextImg = () => {
    if (currentSlide === image.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const onRemoveImage = useCallback((index: any) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    })
  }, [])

  return (
    <ImageContainer>
      {
        <>
        {
          image.length === 1
          ? null
          : <CaretLeftOutlinedStyle onClick={onShowPrevImg}/> 
        }
        {
          me !== null
          ? 
          <>
            {
              type === 'postForm' ? <ImgStyle src={`http://localhost:3065/${image[currentSlide]}`} alt="" />
              : <ImgStyle src={`http://localhost:3065/${image[currentSlide].src}`} alt="" />
            }
          </>
          : <ImgStyle src={`${image[currentSlide].src}`} alt="" /> 
        }
          {
            hideDelete === false ? <DeleteDiv/> : null
          }
          <Slide>
            <p>{currentSlide+1} / {image.length}</p>
          </Slide>
          {
            type === 'postForm' ?
            <RemoveButtonStyle  onMouseEnter={toggle} onMouseLeave={toggle}  onClick={onRemoveImage(currentSlide)}>제거</RemoveButtonStyle>
            : null
          }
        {
          image.length === 1
          ? null
          : <CaretRightOutlinedStyle onClick={onShowNextImg}/>
        }
        </>
      }
    </ImageContainer>
  )
}

const Images = memo(_Images)

export default Images