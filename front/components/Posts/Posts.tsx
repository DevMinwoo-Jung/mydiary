import { Col, Collapse, Row, Tag } from "antd";
import {
  INDEX_LAYOUT_DESKTOP,
  INDEX_LAYOUT_MOBILE,
  INDEX_LAYOUT_TABLET,
  size,
} from "libs/css/layout";
import React, { memo } from "react";
import { dummyPosts } from "reducers/post";
import styled from "styled-components";

const PostsContainer = styled.div`
  margin-top: 1rem;
  margin: auto;
  border: 1px solid black;
  height: 70vh;
  overflow-y: auto;
  @media screen and (min-width: ${size.mobileS}) {
    width: ${INDEX_LAYOUT_MOBILE}px;
    margin-top: 150px;
  }
  @media screen and (min-width: ${size.tablet}) {
    width: ${INDEX_LAYOUT_TABLET}px;
    margin-top: 100px;
  }
  @media screen and (min-width: ${size.laptop}) {
    width: ${INDEX_LAYOUT_DESKTOP}px;
    margin-top: 100px;
  }
`;
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
    border: none;
  }

  `;

const DivStyle2 = styled.div`
  margin-left: 1rem;
  display: flex;
`

const _Posts = () => {
  const { Panel } = Collapse;
  const dummy = dummyPosts.exercises;
  const title = Object.keys(dummy);
  console.log(
    title.map((element, index) =>
      Object.values(dummy[element]).map((element) => element)
    )
  );
  console.log(title.map((element, index) => element));
  console.log(title.map((element, index) => Object.values(dummy[element])));

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const text = '취업하고싶다..'

  return (
    <PostsContainer>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="This is panel header 1" key="1">
          <DivStyle>
            {title.map((element, index) => (
              <>
                <RepsTitle>{element}</RepsTitle>
                <InnerDiv>
                  <Row>
                  <DivStyle2>
                    {Object.values(dummy[element]).map((element, index) => (
                      <RepsInfo>
                          <Col xs={24} sm={24} md={24} lg={12}>
                          <Tag color="#108ee9">
                            {Object.keys(element)} / {Object.values(element)}
                          </Tag>
                          </Col>
                      </RepsInfo>
                      ))}
                  </DivStyle2>
                  </Row>
                </InnerDiv>
              </>
            ))}
          </DivStyle>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </PostsContainer>
  );
};

const Posts = memo(_Posts);

export default Posts;
