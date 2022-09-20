import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post"
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user"
import shortid from 'shortid'
import Post from 'components/Posts/Post'

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const tag = router.query.tag;
    const { mainPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector((state) => state.post);
    const id = useSelector((state) => state.user?.me?.id);

    useEffect(() => {
        if(!tag) {
            return
        }
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    }, [tag])

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        })
    }, [])

    // useEffect(() => {
    //     const onScroll = () => {
    //         if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
    //             if (hasMorePosts && !loadHashtagPostsLoading) {
    //                 dispatch({
    //                     type: LOAD_HASHTAG_POSTS_REQUEST,
    //                     lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
    //                     data: tag,
    //                 });
    //             }
    //         }
    //     };
    //     window.addEventListener('scroll', onScroll);
    //     return () => {
    //         window.removeEventListener('scroll', onScroll);
    //     };
    // }, [mainPosts.length, hasMorePosts, tag]);
        
            return (
                <>
                    {
                    mainPosts.filter((post) => post.User.id === id).map(post =>
                        <Post post={post} key={shortid()} />
                        )
                    }
                </>
    );
};

export default Hashtag;