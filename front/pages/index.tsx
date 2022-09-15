import styled from 'styled-components'
import type { NextPage } from 'next'
import { memo, useEffect, useRef } from 'react'
import Head from 'next/head'
import PostForm from 'components/PostForm/PostForm'
import Posts from 'components/Posts/Posts'
import { WHITE } from 'libs/css/color'
import shortid from 'shortid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import Tags from 'components/Tags/Tags'
import { LOAD_POSTS_REQUEST } from 'reducers/post'

const ContentsContainer = styled.div`
  margin: auto;
  display: block;
  background-color: ${WHITE};
  width: 100%;
`
const _index: NextPage = () => {
  const { me } = useSelector((state) => state.user)
  const { imagePaths, modifyImagePaths } = useSelector((state) => state.post)
  const dispatch = useDispatch()   
  const modifyPostDone = useSelector((state) => state.post.mainPosts, shallowEqual)

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
  }, [])

  useEffect(() => {
    if(me !== null) {
      console.log('rerender!!!!!!')
      dispatch({
        type: LOAD_POSTS_REQUEST,
      })
    }
  }, [me])
  
  // useEffect(() => {
  //   if (me !== null) {
  //     const onScroll = () => {
  //         if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
  //             if (hasMorePosts && !loadPostsLoading) {
  //                 const lastId = mainPosts[mainPosts.length - 1]?.id;
  //                 dispatch({
  //                   type: LOAD_POSTS_REQUEST,
  //                 });
  //             }
  //         }
  //     }
  //     window.addEventListener('scroll', onScroll);
  //         return () => {
  //             window.removeEventListener('scroll', onScroll);
  //         };
  //   }
  //   }, [mainPosts, hasMorePosts, loadPostsLoading, me]);


  return (
    <>
      <Head>
        <title>My Dairy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentsContainer>
        {
          me && <PostForm key={shortid.generate()}/>
        }
        <Posts/>
        {/* <Tags/> */}
      </ContentsContainer>
    </>
  )
};

const index = memo(_index)

export default index;