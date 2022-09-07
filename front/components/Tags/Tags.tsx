import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import Tag from './Tag'

const _Tags = (props) => {
  const { mainPosts } = useSelector((state) => state.post)
  // console.log(Object.keys(mainPosts).map((key) => (mainPosts[key])))
  return (
    <>
      {
        Object.keys(mainPosts).map(
          (key) =>
          <Tag postData={mainPosts[key]}/>
        )
      }
    </> 
  )
}

const Tags = memo(_Tags)

export default Tags