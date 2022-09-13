import { useLottie } from 'lottie-react'
import React, { useRef, memo } from 'react'
import styled from 'styled-components'
import arrow from '../lottieJSON/arrow.json'

const LottieStyle = styled.div`
  width: 100px;
  height: 100px;
  margin: auto;
  color: black  
`

const _Arrow = () => {
    const lottie = useRef()

    const options = {
        animationData: arrow,
        loop: true,
        autoplay: true,
        name: 'arrow',
        container: lottie.current
      };

    const { View } = useLottie(options);

      return (
        <LottieStyle ref={lottie}>
            {View}
        </LottieStyle>
      )
}

const Arrow = memo(_Arrow)

export default Arrow