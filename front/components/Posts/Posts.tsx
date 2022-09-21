import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'
import { dummy, LOAD_POSTS_REQUEST } from 'reducers/post'
import Arrow from 'lottie/Arrow'

const PostsContainer = styled.div`
  margin: auto;
  overflow-y: auto;
  width: 100%;
  overflow-x: hidden;
`

const IntroContainer = styled.div`
  width: 100%;
`

const IntroPostContainer = styled.div`
  opacity: 0;
  width: 100%;

`

const IntroParaContainer = styled.div`
  width: 100%;
  margin: 5rem 1rem;
`

const IntroPara = styled.p`
  text-align: left;
  font-size: 5.5rem;
  font-weight: bolder;
`

const _Posts = () => {
  const mainPosts = useSelector((state) => state.post.mainPosts, shallowEqual)
  const me = useSelector((state) => state.user.me)
  const UserId = useSelector((state) => state.user?.me?.id)
  const postRef: any = useRef()
  const arrowRef: any = useRef()  

    useEffect(() => {
      if (me === null) {
        const onScroll = () => { 
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 2200) {
            postRef.current.style.opacity = '1'
            postRef.current.style.transition = '1.5s'
            arrowRef.current.style.opacity = '0'
            arrowRef.current.style.transition = '1.5s'
          } else {
            postRef.current.style.opacity = '0'
            arrowRef.current.style.opacity = '1'
          }
        }
        window.addEventListener('scroll', onScroll);
            return () => {
                window.removeEventListener('scroll', onScroll);
            };
        }
      }, [me]);

  return (
    <PostsContainer key={shortid()}>
      {
        me !== null ?
          <>
            {
              mainPosts.filter((post) => post.UserId == UserId)
              .map(post =>{
                return <Post post={post} key={shortid()} />
              }
              )
            }
          </>
        : 
        <IntroContainer>
          <IntroParaContainer>
            <IntroPara>당신의 <br/> 소중한 <br/>순간들을 <br/>기록하세요.</IntroPara>
            <div ref={arrowRef}>
              <Arrow/>
            </div>
          </IntroParaContainer>
          <IntroPostContainer ref={postRef}>
          {
            dummy.map(
              (element) => 
              <Post post={element} key={shortid()}/>
              )
          } 
          </IntroPostContainer>
        </IntroContainer>
      }
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
