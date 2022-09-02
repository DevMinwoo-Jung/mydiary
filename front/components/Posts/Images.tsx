import React, { FC, memo, useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'


type image = {
  src: string
  id: string
}

export type ImagesProps = {
  image: image[]
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

const _Images:FC<ImagesProps>  = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { image } = props
  console.log(image)

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

  return (
    <ImageContainer>
      {
        image.length < 1 
        ? ''
        : 
        <>
        {
          image.length >= 1
          ? null
          : <CaretLeftOutlinedStyle onClick={onShowPrevImg}/> 
        }
            <ImgStyle src={`http://localhost:3065/${image[currentSlide].src}`} alt="" />
        {
          image.length >= 1
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