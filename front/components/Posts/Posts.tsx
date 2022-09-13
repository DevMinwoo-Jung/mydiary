import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Post from './Post'
import { dummy, LOAD_POSTS_REQUEST } from 'reducers/post'

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
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post)
  const { me } = useSelector((state) => state.user)
  

  const postRef: any = useRef()

  const dispatch = useDispatch()   
  
  useEffect(() => {
    if(me !== null) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      })
    }
  }, [me])
  
  useEffect(() => {
    if (me !== null) {
      const onScroll = () => {
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
              if (hasMorePosts && !loadPostsLoading) {
                  const lastId = mainPosts[mainPosts.length - 1]?.id;
                  dispatch({
                    type: LOAD_POSTS_REQUEST,
                  });
              }
          }
      }
      window.addEventListener('scroll', onScroll);
          return () => {
              window.removeEventListener('scroll', onScroll);
          };
    }
    }, [mainPosts, hasMorePosts, loadPostsLoading, me]);

    useEffect(() => {
      if (me === null) {
        const onScroll = () => { 
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 2200) {
            postRef.current.style.opacity = '1'
            postRef.current.style.transition = '1.5s'
          } else {
            postRef.current.style.opacity = '0'
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
          mainPosts.map(
            (element) => 
            <Post post={element} key={shortid()}/>
          )
        :
        <IntroContainer>
          <IntroParaContainer>
            <IntroPara>당신의 <br/> 소중한 <br/>순간들을 <br/>기록하세요.</IntroPara>
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
