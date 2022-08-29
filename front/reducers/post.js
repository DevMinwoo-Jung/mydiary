import shortid from 'shortid'
import produce from 'immer'
import faker from 'faker';

const dummy = [
  {
    id: 1,
    User: {
      id: 1,
      nickname: 'minwoo',
    },
    date: '2022-08-11',
    content: '연봉 3천 이상!',
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
  },
  {
    id: 11,
    User: {
      id: 12,
      nickname: 'minwoo2',
    },
    date: '2022-08-12',
    content: '두 번째 게시글 #되니 #됩니까',
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
  },
  {
    id: 14,
    User: {
      id: 15,
      nickname: 'minwoo',
    },
    date: '2022-08-14',
    content: '세 번째 게시글 #되니',
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
  },
  {
    id: 122,
    User: {
      id: 144,
      nickname: 'minwoo',
    },
    date: '2022-08-15',
    content: '네 번째 게시글 #되니',
    Images: [],
  },
]

export const initialState = {
  mainPosts: [],
  hasMorePosts: false,
  imagePaths: [],
  modify: false,
  showReps: true,
  deleteLoading: false,
  deleteDone: false,
  deleteError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};



export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
}));

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

export const POST_MODIFY_REQUEST = 'POST_MODIFY_REQUEST'
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST'
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS'
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

// reducer 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
// 근데 immer를 사용하면 알아서 불변성을 지키면서 만들어준다. state는 건들면 안되고 draft를 건들어야한다.
export default (state = initialState, action) => {
  // console.log(action.data)
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST: 
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS: 
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE: 
        draft.addPostLoading = false;
        draft.addPostError = action.error
        break;
      case POST_DELETE_REQUEST:
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        break;
      case POST_DELETE_SUCCESS: 
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        draft.mainPosts = draft.mainPosts.filter((y, i) => y.id !== action.data);
        break;
      case POST_DELETE_FAILURE: 
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: 
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case LOAD_POSTS_REQUEST: 
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS: 
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.imagePaths = [];
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE: 
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data)
        break;
      default: {
        break;
      }
    }
  }) 
};