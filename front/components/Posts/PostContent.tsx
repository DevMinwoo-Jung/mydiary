import React, { FC } from "react";
import styled from "styled-components";
import { Col, Collapse, Row, Tag } from "antd";
import Reps from "./Reps";
import shortid from 'shortid'

type PostContentProps = {
  post: Object;
  index: number;
};

const DivStyle = styled.div`
  display: block;
`;

const InnerDiv = styled.div`
  display: flex;
`;
const RepsTitle = styled.h3`
  font-weight: bold;
  text-align: left;
  margin-left: 1rem;
`;

const RepsInfo = styled.div`
  display: flex;
  & span {
    height: 25px;
    width: 55px;
    margin: 0;
    padding: 0;
    border: 2px solid #108ee9;
    border-radius: 0%;
  }
`;

const DivStyle2 = styled.div`
  margin-left: 1rem;
  display: flex;
`;

const HeaderStyle = styled.div`
  font-size: 1rem;
  & h1 {
    font-weight: bolder;
  }
`;

export type postType = {
  date: number;
  exercises: [];
  id: number
};


const PostContent: FC<PostContentProps> = (props) => {
  const { index } = props;
  const post:postType = props.post
  // post.exercises.map((element) => console.log(element))

  console.log(post);
  // console.log(post.exercises, post.date, post.id);
  return (
      <div key={index + 1}>
        <p>{post.date}</p>
          {
            post.exercises.map((element) => {
              return (
                <Reps key={shortid.generate()} exercise={element}/>
              )
            })
          }
      </div>
  );
};

export default PostContent;
