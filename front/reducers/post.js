import shortid from 'shortid'
import produce from 'immer'

export const initialState = {
  mainPosts: [
    {
      date: 20220709,
      id: 1,
      exercises: [
        {
          kind: 'squat',
          id: 61,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
    {
      date: 20220709,
      id: 2,
      exercises: [
        {
          kind: 'ㅜㅜ',
          id: 51,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
    {
      date: 20220710,
      id: 3,
      exercises: [
        {
          kind: '스쿼트',
          id: 41,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
    {
      date: 20220710,
      id: 4,
      exercises: [
        {
          kind: 'squat',
          id: 31,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
    {
      date: 20220710,
      id: 5,
      exercises: [
        {
          kind: 'ㅎㅎ',
          id: 11,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
    {
      date: 20220711,
      id: 6,
      exercises: [
        {
          kind: '스쿼트',
          id: 21,
          reps: [
            { 15: 70 },
            { 15: 70 },
            { 10: 80 },
            { 10: 80 },
            { 8: 90 },
            { 8: 90 },
            { 5: 1 },
            { 5: 100 }
          ]
        },
      ],
    },
  ],
  modify: false,
  showReps: true,
  deleteLoading: false,
  deleteDone: false,
  deleteError: null,
};

export const dummyPosts = {
  id: 1,
  date: 20220709,
  exercises: {
    squat: {
      1: { 15: 70 },
      2: { 15: 70 },
      3: { 10: 80 },
      4: { 10: 80 },
      5: { 8: 90 },
      6: { 8: 90 },
      7: { 5: 100 },
      8: { 5: 100 }
    },
    benchPress: {
      1: { 15: 70 },
      2: { 15: 70 },
      3: { 10: 80 },
      4: { 10: 80 },
      5: { 8: 90 },
      6: { 8: 90 },
      7: { 5: 110 }
    },
    deadLift: {
      1: { 15: 70 },
      2: { 15: 70 },
      3: { 10: 20 },
      4: { 10: 80 },
      5: { 8: 90 },
    },
    런지: {
      1: { 15: 30 },
      2: { 15: 30 },
      3: { 10: 40 },
      4: { 10: 40 },
      5: { 8: 50 },
    }
  }
}

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
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const REPS_MODIFY_REQUEST = 'REPS_MODIFY_REQUEST'
export const REPS_DELETE_REQUEST = 'REPS_DELETE_REQUEST'
export const REPS_DELETE_SUCCESS = 'REPS_DELETE_SUCCESS'
export const REPS_DELETE_FAILURE = 'REPS_DELETE_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST,
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

// reducer 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
// 근데 immer를 사용하면 알아서 불변성을 지키면서 만들어준다. state는 건들면 안되고 draft를 건들어야한다.
export default (state = initialState, action) => {
  console.log(action.data)
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: [action.data, ...state.mainPosts],
          postAdded: true,
        };
      }
      case REPS_MODIFY_REQUEST: {
        return {
          ...state,
          modify: true,
        }
      }
      case REPS_DELETE_REQUEST: {
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        break;
      }
      case REPS_DELETE_SUCCESS: {
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        draft.mainPosts = draft.mainPosts.filter((y, i) => y.id !== action.data);
        break;
      }
      case REPS_DELETE_FAILURE: {
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        break;
      }
      default: {
        break;
      }
    }
  }) 
};