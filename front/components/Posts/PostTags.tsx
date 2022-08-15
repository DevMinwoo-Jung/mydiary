import React from 'react'
import Link from 'next/link'
import shortid from 'shortid'

const PostTags = ({ postData }) => {
    const Tags = postData.split(/(#[^\s#]+)/g).filter((v:string) => v.match(/(#[^\s]+)/))
    return (
        <div>
        {
        Tags && Tags.map((v:string) => {
            return (
                    <Link
                        href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
                        as={`/hashtag/${v.slice(1)}`}
                        key={shortid()}
                    >
                        <a>{v}&nbsp;</a>
                    </Link>
                )
            })
        }
    </div>
    )
};

export default PostTags