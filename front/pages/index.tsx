/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo, useEffect, useLayoutEffect, useRef } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { BACKGROUND_COLOR } from 'libs/css/color'
import shortid from 'shortid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { dummy, LOAD_POSTS_REQUEST } from 'reducers/post'
import { useInView } from 'react-intersection-observer'
import Arrow from 'lottie/Arrow'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import axios from 'axios'
import wrapper from 'store/configureStore'
import { END } from 'redux-saga';
import { PostsState, UserState } from 'libs/type'
import { size } from 'libs/css/layout'
import Post from '../components/Posts/Post'

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
  margin: 5rem 1rem 1rem 1rem;
  @media screen and (max-width: ${size.mobileL}) { 
    margin: 5rem 0 0 0;
  }
`

const IntroPara = styled.p`
  text-align: left;
  font-size: 5.5rem;
  font-weight: bolder;
  @media screen and (max-width: ${size.mobileL}) { 
    font-size: 4rem;
  }
`

const _index: NextPage = () => {
  const me = useSelector((state:UserState) => state.user?.me?.id)
  const { hasMorePosts,
    loadPostsLoading,
    //mainPosts 
  } = useSelector((state:PostsState) => state.post, shallowEqual)
  // const dispatch = useDispatch()
  // const [ref, inView] = useInView()
  const [ref] = useInView()

  const postRef: any = useRef()
  const arrowRef: any = useRef()

  // useLayoutEffect(() => {
  //   if (me !== null) {
  //     dispatch({
  //       type: LOAD_MY_INFO_REQUEST,
  //     })
  //   }
  // }, [me])

  // useEffect(() => {
  //   if (inView && hasMorePosts && !loadPostsLoading) {
  //     const lastId = mainPosts[mainPosts.length - 1]?.id;
  //     dispatch({
  //       type: LOAD_POSTS_REQUEST,
  //       lastId,
  //     });
  //   }
  // }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  // eslint-disable-next-line consistent-return
  // useEffect(() => {
  //   if (me == null) {
  //     const onScroll = () => {
  //       if (window.scrollY + document.documentElement.clientHeight
  //         > document.documentElement.scrollHeight - 2500) {
  //         postRef.current.style.opacity = '1'
  //         postRef.current.style.transition = '1.5s'
  //         arrowRef.current.style.opacity = '0'
  //         arrowRef.current.style.transition = '1.5s'
  //       } else {
  //         postRef.current.style.opacity = '0'
  //         arrowRef.current.style.opacity = '1'
  //       }
  //     }
  //     window.addEventListener('scroll', onScroll);
  //     return () => {
  //       window.removeEventListener('scroll', onScroll);
  //     };
  //   }
  // }, [me]);

  return (
    <>
      <Head>
        <title>My Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        {
          me == null ? null : <PostForm key={shortid.generate()} />
        }
        {
          me == null
            ? (
              <>
                <IntroContainer>
                  <IntroParaContainer>
                    <IntroPara>당신의 <br /> 소중한 <br />순간들을 <br />기록하세요.</IntroPara>
                    <div ref={arrowRef}>
                      <Arrow />
                    </div>
                  </IntroParaContainer>
                  <IntroPostContainer ref={postRef}>
                    {
            dummy.map(
              (element) => <Post post={element} key={shortid()} />,
            )
          }
                  </IntroPostContainer>
                </IntroContainer>
              </>
            )
            : (
              <>
                <Posts />
                <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
              </>
            )
        }
      </ContentsContainer>
    </>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = null; // 쿠키 공유 방지
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie; /// 서버에 쿠키 전달!
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

const index = memo(_index)

export default index;
