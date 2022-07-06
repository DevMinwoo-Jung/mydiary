import shortid from 'shortid'
import produce from 'immer'

export const initialState = {
  mainPosts: [],
};

const dummy = {
  id: 1,
  User: {
    id: 1,
    nickname: '제로초',
  },
  content: '첫 번째 게시글 #되니',
  Images: [{
    id: shortid.generate(),
    src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }, {
    id: shortid.generate(),
    src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
  }, {
    id: shortid.generate(),
    src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
  }],
  Comments: [{
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: 'nero',
    },
    content: '우와 개정판이 나왔군요~',
  }, {
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: 'hero',
    },
    content: '얼른 사고싶어요~',
  }]
}

// export const generateDummyPost = (number) => Array(number).fill().map(() => ({
//   id: shortid.generate(),
//   User: {
//     id: shortid.generate(),
//     nickname: faker.name.findName(),
//   },
//   content: faker.lorem.paragraph(),
//   Images: [{
//     src: faker.image.image(),
//   }],
//   Comments: [{
//     User: {
//       id: shortid.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.sentence(),
//   }],
// }));

// initialState.mainPosts = initialState.mainPosts.concat(
//   Array(20).fill().map(() => ({
//     id: shortid.generate(),
//     User: {
//       id: shortid.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{
//       src: faker.image.image(),
//     }],
//     Comments: [{
//       User: {
//         id: shortid.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.sentence(),
//     }],
//   }))  
// )

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data: data
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
})
// reducer 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
// 근데 immer를 사용하면 알아서 불변성을 지키면서 만들어준다. state는 건들면 안되고 draft를 건들어야한다.
export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_IMAGE: 
        draft.imagePaths = draft.imagePaths.filter((y, i) => i !== action.data)
        break;
      default: {
        break;
      }
    }
  }) 
};