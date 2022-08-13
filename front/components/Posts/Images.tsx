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
  width: 50%;
  margin: 3rem 1rem 1rem 1rem;
  & img {
    object-fit: fill;
    max-height: 100%;
    min-width: 90%;
  }
`

const _Images:FC<ImagesProps>  = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { image } = props

  const onShowPrevImg = (e) => {
    console.log(e)
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
          <CaretLeftOutlined onClick={onShowPrevImg}/>
            <img src={`${image[currentSlide].src}`} alt="" />
          <CaretRightOutlined onClick={onShowNextImg}/>
        </>
      }
    </ImageContainer>
  )
}

const Images = memo(_Images)

export default Images