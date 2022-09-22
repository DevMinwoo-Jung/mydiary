import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FALSE_TO_TRUE_HASHTAG, LOAD_HASHTAG_POSTS_REQUEST, POST_REQUEST_FASLE, POST_REQUEST_TRUE } from "../../reducers/post"
import shortid from 'shortid'
import Post from 'components/Posts/Post'
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tag } = router.query;
    const { hashTagPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector((state) => state.post);
    const userId = useSelector((state) => state.user?.me?.userId)

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    }, [])

    useEffect(() => {
        if(!tag) {
            return
        }
        console.log(tag)
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    }, [tag])

    useEffect(() => {
        console.log(hashTagPosts)
        console.log(userId)
    }, [hashTagPosts, userId])



    useEffect(() => {
        const onScroll = () => {
            console.log('새로고침 시 이건 왜 되냐?')
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

export default Hashtag;