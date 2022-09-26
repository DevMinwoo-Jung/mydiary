import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { LOAD_HASHTAG_POSTS_REQUEST, POST_REQUEST_TRUE } from '../../reducers/post'
import shortid from 'shortid'
import Post from 'components/Posts/Post'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import { END } from 'redux-saga'
import axios from 'axios'
import wrapper from 'store/configureStore'

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tag } = router.query;
    const { hashTagPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadHashtagPostsLoading) {
                    const lastId = hashTagPosts[hashTagPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_HASHTAG_POSTS_REQUEST,
                        lastId,
                        data: tag,
                    });
                    dispatch({
                        type: POST_REQUEST_TRUE,
                    })
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hashTagPosts.length, hasMorePosts, tag]);
        
            return (
                <>
                    {
                    hashTagPosts.map(post => {
                        return <Post post={post} key={shortid()} />
                            }
                        )
                    }
                </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: context.params.tag,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Hashtag;