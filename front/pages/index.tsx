import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo, useEffect, useRef } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { BACKGROUND_COLOR } from 'libs/css/color'
import shortid from 'shortid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { dummy, LOAD_POSTS_REQUEST } from 'reducers/post'
import { useInView } from 'react-intersection-observer'
import Post from '../components/Posts/Post'
import Arrow from 'lottie/Arrow'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import axios from 'axios'
import wrapper from 'store/configureStore'
import { END } from "redux-saga";
import { PostsState, UserState } from 'libs/type'

const ContentsContainer = styled.div`
  margin: auto;
  display: block;
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
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

const _index: NextPage = () => {
  const me = useSelector((state:UserState) => state.user?.me?.id)
  const { hasMorePosts, loadPostsLoading, mainPosts } = useSelector((state:PostsState) => state.post, shallowEqual)
  const dispatch = useDispatch()   
  const [ref, inView] = useInView()

  const postRef: any = useRef()
  const arrowRef: any = useRef()  

  useEffect(() => {
        if (inView && hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
    },[inView, hasMorePosts, loadPostsLoading, mainPosts]);

    useEffect(() => {
      if (me === undefined) {
        const onScroll = () => { 
          console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight, window.screenY)
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 2500) {
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
    <>
      <Head>
        <title>My Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        {
          me === undefined ? null : <PostForm key={shortid.generate()}/>
        }
        {
          me === undefined ?
          <>
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
          </>
          : 
          <>
            <Posts/>
            <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
          </>
        }
      </ContentsContainer>
    </>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : null;
  axios.defaults.headers.common.Cookies = null; // 쿠키 공유 방지
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookies = cookie; /// 서버에 쿠키 전달! 
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  })
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

const index = memo(_index)

export default index;