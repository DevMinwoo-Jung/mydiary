import React, { FC, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUND_COLOR, BUTTON_COLOR } from 'libs/css/color'
import { REMOVE_IMAGE } from 'reducers/post'
import useToggle from 'libs/hook/useToggle'
import { IoTrashBinOutline } from 'react-icons/io5'
import { ImagesProps, UserState } from 'libs/type'
import { size } from 'libs/css/layout'
import DeleteDiv from './DeleteDiv'

const ImageContainer = styled.div`
  width: 100%;
  height: 25rem;
  margin-top: 3rem;
  position: relative;
  & img {
    object-fit: fill;
    height: 100%;
    width: 100%;
      @media screen and (max-width: ${size.mobileL}) { 
      margin-top: 3rem;
      height: 20rem;
    }
  }
`

const CaretLeftOutlinedStyle = styled(CaretLeftOutlined)`
  font-size: 1.2rem;
  position: absolute;
  top: 12.5rem;
  color: #f1eded;
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
  @media screen and (max-width: ${size.mobileL}) { 
      bottom: 15%;
    }
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

const _Images:FC<ImagesProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { image, type } = props
  const dispatch = useDispatch()
  const [hideDelete, toggle] = useToggle()
  const { me } = useSelector((state:UserState) => state.user)

  const onShowPrevImg = () => {
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
      data: index,
    })
  }, [])

  return (
    <ImageContainer>
      <>
        {
          image.length === 1
            ? null
            : <CaretLeftOutlinedStyle onClick={onShowPrevImg} />
        }
        {
          me !== null
            ? (
              <>
                {
              type === 'postForm' ? <ImgStyle src={`${image[currentSlide]}`} alt="" />
                : <ImgStyle src={`${image[currentSlide].src}`} alt="" />
            }
              </>
            )
            : <ImgStyle src={`${image[currentSlide].src}`} alt="" />
        }
        {
            hideDelete === false ? <DeleteDiv /> : null
          }
        <Slide>
          <p>{currentSlide + 1} / {image.length}</p>
        </Slide>
        {
            type === 'postForm'
              ? (
                <>
                  <RemoveButtonStyle
                    onMouseEnter={toggle}
                    onMouseLeave={toggle}
                    onClick={onRemoveImage(currentSlide)}
                  >
                    ??????
                  </RemoveButtonStyle>
                </>
              )
              : null
          }
        {
          image.length === 1
            ? null
            : <CaretRightOutlinedStyle onClick={onShowNextImg} />
        }
      </>
    </ImageContainer>
  )
}

const Images = memo(_Images)

export default Images
