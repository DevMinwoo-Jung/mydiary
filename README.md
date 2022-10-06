# 프로젝트명 mydiary
Front - React(Hooks).js, Typescript<br/>
Back - Node.js, express.js, sequelize<br/>
Server - aws<br/>

테스트아이디: test
비밀번호: 123123123

##### 사진과 함께 글을 올려 그 기억을 생생하게 기록하고자 만들게 되었습니다.

###### 1. 메인화면 

- 스크롤이 일정 정도를 넘어가게 되면 예시 게시물이 나타나도록 하였습니다.
intersection-observer을 사용했습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193571036-37bd3b88-e4d4-409a-825d-7f4aa2344cef.gif"/>

###### 2. 로그인화면
- 다른 사람이 올린 게시물을 보는 것이 아닌 유저 개인의 게시물만 보게 하기 위해서 로그인 성공 시에 포스트 화면으로 전환 하게 하였습니다. redux를 사용하여 상태값에 따라서 메인 화면과 포스트로 구분하였습니다.
<img width="100%"  src="https://user-images.githubusercontent.com/54659435/193571100-5459bd29-7e7c-480d-959e-a06b55d4bfb8.gif"/>

###### 3. 회원가입
- 회원가입 양식은 custom hooks를 사용하여 코드량을 줄였습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193569659-e1a4a5b0-2ec0-4bf5-8875-76c818a211d4.gif"/>

###### 4. 게시물 업로드
- 게시물 업로드의 경우 jpg, png, jpeg가 아니거나 20mb가 넘을 경우 사진을 업로드하지 못하게 하였스며, #를 쓸 경우 해쉬태그 등록을 하게 하였습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193571177-ad74d737-350b-4c60-9360-39236b0593d6.gif"/>

###### 5. 유저정보 변경
- 유저 정보변경은 유저의 프로필 사진, 활동명, 비밀번호 변경, 회원 탈퇴를 구현했습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193570939-63b30b46-30bd-4356-895f-4cf69e35b833.gif"/>

###### 6. 인피니트 스크롤
- 스크롤이 일정 부분에 도달할 경우 redux-saga를 이용하여 데이터베이스 요청을 하여 게시물이 있는 경우 한 번 더 요청을 해서 무한 스크롤링이 가능하게 만들었습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193570874-12c31696-73b9-4c45-888e-f0bb0170116d.gif"/>

###### 7. 해쉬태그
- 게시물의 해쉬태그를 클릭하면 해당 해쉬태그가 있는 게시물들만 데이터베이스에 요청하여 보여주게 하였습니다. Next.js의 dynamic routing기능을 이용하였습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193570786-152c5a07-7b4f-48b6-ab5b-c0f324d5dc7c.gif"/>

###### 8. 검색
- 서치 폼에 해쉬태그를 검색할 경우 해쉬태그가 있는 게시물들만 데이터베이스에 요청하여 보여주게 하였습니다. Next.js의 router.query를 이용하였습니다.
<img width="100%" src="https://user-images.githubusercontent.com/54659435/193571273-fb892071-86bd-4d57-a6ed-6b81234f0cb2.gif"/>

###### 9. SSR
- 서버사이드 렌더링은 게시물, 해쉬태그, 유저에 한해 getServerSideProps를 적용시켰습니다.

###### 10. 그 외 프로젝트를 하며 느낀 점
- redux를 사용하며 수정을 할 때 이미지를 업로드하면 리렌더링이 되는 현상을 겪어 어려움을 겪었습니다. 문제를 해결하고자 stack overflow, redux 공식 페이지를 찾던 중 객체의 가장 바깥 부분은 비교하는 shallow equal를 활용하여 해결했습니다.
- 프로젝트에 Typescript를 처음 적용해 보았습니다. 정확한 type을 사용하고 컴포넌트의 props에 요구하는 형식에 맞춰 코딩을 해야 했기 떄문에 잔실수를 줄일 수 있게 되었고 이를 통해 생산성을 높일 수 있었습니다.
- Next.js를 이용한 첫 프로젝트였습니다. CSR과 SSR의 장점을 활용하고자 노력했으며 이를 위해 getServerSideProps를 이용한 SSR과 리액트의 CSR을 적절히 활용한 경험을 갖게 되었습니다. 이외에도 router를 react-router가 아닌 next.js의 router를 사용하였고 dynamic router를 적용해 봤습니다.
- 쿠키를 사용하여 로그인을 했을 경우 로그인이 유지되도록 하였습니다.
- 프론트서버와 백엔드 서버를 구분하여 프로젝트를 진행하여 CORS 문제를 해결해 봤습니다.
- 프론트와 백엔드 둘 다를 다루며 데이터의 흐름에 대해 이해하게 되었고 나아가 백엔드 엔지니어와 일을 하게 될 때 좋은 경험을 쌓았습니다.
- aws를 이용하여 배포를 하여 aws를 이용할 경우 어떤 식으로 배포를 하는지 배우게 되었습니다. ec2, ec3, s3, pm2 등을 사용하여 aws의 생태계를 배우는 좋은 경험이었습니다.