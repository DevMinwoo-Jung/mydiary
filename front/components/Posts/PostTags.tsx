/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react'
import Link from 'next/link'
import shortid from 'shortid'
import { useRouter } from 'next/router'

type PostTagsProps = {
    postData: string
}

const PostTags:FC<PostTagsProps> = (props) => {
  const { postData } = props
  const router = useRouter();
  const linkTag = router.query.tag
  const Tags = postData.split(/(#[^\s#]+)/g).filter((v:string) => v.match(/(#[^\s]+)/))

  return (
    <>
      {
        Tags && Tags.map((v:string) => (
          <>
            {
                    v.slice(1) === linkTag
                      ? <span style={{ color: '#1890ff' }}>{v}&nbsp;</span>
                      : (
                        <Link
                          href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
                          as={`/hashtag/${v.slice(1)}`}
                          key={shortid()}
                        >
                          <a>{v}&nbsp;</a>
                        </Link>
                      )
                }
          </>
        ))
        }
    </>
  )
};

export default PostTags
