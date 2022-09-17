import shortid from 'shortid'
import produce from 'immer'
import faker from 'faker';

export const dummy = [
  {
    id: 11,
    User: {
      id: 12,
      nickname: 'minwoo2',
    },
    date: '2021-12-12',
    content: '육식맨 보고 따라함 #삼겹살 #육식맨',
    Images: [{
      id: shortid.generate(),
      src: 'images/7.jpeg',
    },
    {
      id: shortid.generate(),
      src: 'images/8.jpeg',
    }],
  },
  {
    id: 11,
    User: {
      id: 12,
      nickname: 'minwoo2',
    },
    date: '2022-03-12',
    content: '치킨에는 소맥 #치킨 #또래오래',
    Images: [{
      id: shortid.generate(),
      src: 'images/4.jpeg',
    }],
  },
  {
    id: 11,
    User: {
      id: 12,
      nickname: 'minwoo2',
    },
    date: '2022-05-12',
    content: '대구 놀라가서 본 고양이들 #대구 #고양이',
    Images: [{
      id: shortid.generate(),
      src: 'images/5.jpeg',
    },
    {
      id: shortid.generate(),
      src: 'images/6.jpeg',
    }],
  },
  {
    id: 1,
    User: {
      id: 1,
      nickname: 'minwoo',
    },
    date: '2022-08-07',
    content: '제주도 여행 #여자친구 #차맛있음 #설록원',
    Images: [{ 
      id: shortid.generate(),
      src: 'images/1.jpeg',
    }, {
      id: shortid.generate(),
      src: 'images/2.jpeg',
    }, {
      id: shortid.generate(),
      src: 'images/3.jpeg',
    }],
  },
]

export const initialState = {
  mainPosts: [],
  hasMorePosts: false,
  imagePaths: [],
  modifyImagePaths: [],
  imagePath: null,
  deleteLoading: false,
  deleteDone: false,
  deleteError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  uploadEditImagesLoading: false,
  uploadEditImagesDone: false,
  uploadEditImagesError: null,
  uploadProfileImagesLoading: false,
  uploadProfileImagesDone: false,
  uploadProfileImagesError: null,
  modifyProfileImagesLoading: false,
  modifyProfileImagesDone: false,
  modifyProfileImagesError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadProfileLoading: false,
  loadProfileDone: false,
  loadProfileError: null,
  modifyPostLoading: false,
  modifyPostDone: false,
  modifyPostError: null,
  modifyPostImageLoading: false,
  modifyPostImageDone: false,
  modifyPostImageError: null,
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
export const REMOVE_EDIT_IMAGE = 'REMOVE_EDIT_IMAGE'
export const REMOVE_POSTS = 'REMOVE_POSTS'

export const POST_MODIFY_REQUEST = 'POST_MODIFY_REQUEST'
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST'
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS'
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const UPLOAD_EDIT_IMAGES_REQUEST = 'UPLOAD_EDIT_IMAGES_REQUEST'
export const UPLOAD_EDIT_IMAGES_SUCCESS = 'UPLOAD_EDIT_IMAGES_SUCCESS'
export const UPLOAD_EDIT_IMAGES_FAILURE = 'UPLOAD_EDIT_IMAGES_FAILURE'

export const UPLOAD_PROFILE_IMAGES_REQUEST = 'UPLOAD_PROFILE_IMAGES_REQUEST'
export const UPLOAD_PROFILE_IMAGES_SUCCESS = 'UPLOAD_PROFILE_IMAGES_SUCCESS'
export const UPLOAD_PROFILE_IMAGES_FAILURE = 'UPLOAD_PROFILE_IMAGES_FAILURE'

export const MODIFY_PROFILE_IMAGE_REQUEST = 'MODIFY_PROFILE_IMAGE_REQUEST'
export const MODIFY_PROFILE_IMAGE_SUCCESS = 'MODIFY_PROFILE_IMAGE_SUCCESS'
export const MODIFY_PROFILE_IMAGE_FAILURE = 'MODIFY_PROFILE_IMAGE_FAILURE'

export const MODIFY_POST_LOADING_BACK = 'MODIFY_POST_LOADING_BACK'
export const MODIFY_POST_REQUEST = 'MODIFY_POST_REQUEST'
export const MODIFY_POST_SUCCESS = 'MODIFY_POST_SUCCESS'
export const MODIFY_POST_FAILURE = 'MODIFY_POST_FAILUR'

export const MODIFY_POST_IMAGE_REQUEST = 'MODIFY_POST_IMAGE_REQUEST'
export const MODIFY_POST_IMAGE_SUCCESS = 'MODIFY_POST_IMAGE_SUCCESS'
export const MODIFY_POST_IMAGE_FAILURE = 'MODIFY_POST_IMAGE_FAILURE'


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST'
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS'
export const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE'




export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

// reducer 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
// 근데 immer를 사용하면 알아서 불변성을 지키면서 만들어준다. state는 건들면 안되고 draft를 건들어야한다.
export default (state = initialState, action) => {
  return produce(state, (draft) => {
    console.log(action.data)
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
        draft.mainPosts = draft.mainPosts.filter((y, i) => y.id !== action.data.PostId);
        break;
      case POST_DELETE_FAILURE: 
        draft.deleteLoading = true;
        draft.deleteError = null;
        draft.deleteDone = false;
        break;
      case LOAD_PROFILE_REQUEST:
        draft.loadProfileLoading = true;
        draft.loadProfileDone = false;
        draft.loadProfileError = null;
        break;
      case LOAD_PROFILE_SUCCESS: 
        draft.imagePath = action.data;
        draft.loadProfileLoading = false;
        draft.loadProfileDone = true;
        break;
      case LOAD_PROFILE_FAILURE:
        draft.loadProfileLoading = false;
        draft.loadProfileError = action.error;
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
      case UPLOAD_EDIT_IMAGES_REQUEST:
        draft.uploadEditImagesLoading = true;
        draft.uploadEditImagesDone = false;
        draft.uploadEditImagesError = null;
        break;
      case UPLOAD_EDIT_IMAGES_SUCCESS: 
        draft.modifyImagePaths = action.data;
        draft.uploadEditImagesLoading = false;
        draft.uploadEditImagesDone = true;
        break;
      case UPLOAD_EDIT_IMAGES_FAILURE:
        draft.uploadEditImagesLoading = false;
        draft.uploadEditImagesError = action.error;
        break;
      case UPLOAD_PROFILE_IMAGES_REQUEST:
        draft.uploadProfileImagesLoading = true;
        draft.uploadProfileImagesDone = false;
        draft.uploadProfileImagesError = null;
        break;
      case UPLOAD_PROFILE_IMAGES_SUCCESS: 
        draft.imagePath = action.data;
        draft.uploadProfileImagesLoading = false;
        draft.uploadProfileImagesDone = true;
        break;
      case UPLOAD_PROFILE_IMAGES_FAILURE:
        draft.uploadProfileImagesLoading = false;
        draft.uploadProfileImagesError = action.error;
        break;      
      case MODIFY_PROFILE_IMAGE_REQUEST:
        draft.modifyProfileImagesLoading = true;
        draft.modifyProfileImagesDone = false;
        draft.modifyProfileImagesError = null;
        break;
      case MODIFY_PROFILE_IMAGE_SUCCESS: 
        draft.imagePath = action.data;
        draft.modifyProfileImagesLoading = false;
        draft.modifyProfileImagesDone = true;
        break;
      case MODIFY_PROFILE_IMAGE_FAILURE:
        draft.modifyProfileImagesLoading = false;
        draft.modifyProfileImagesImagesError = action.error;
        break;   
      case MODIFY_POST_REQUEST:
        draft.modifyPostLoading = true;
        draft.modifyPostDone = false;
        draft.modifyPostError = null;
        break;
      case MODIFY_POST_SUCCESS: 
        draft.imagePath = action.data;
        draft.modifyPostLoading = false;
        draft.modifyPostDone = true;
        draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;
        draft.mainPosts.find((v) => v.id === action.data.PostId).date = action.data.date;
        break;
      case MODIFY_POST_LOADING_BACK: 
        draft.modifyPostLoading = true;
        break;
      case MODIFY_POST_FAILURE:
        draft.modifyPostLoading = false;
        draft.modifyPostError = action.error;
        break;
      case MODIFY_POST_IMAGE_REQUEST:
          draft.modifyPostImageLoading = true;
          draft.modifyPostImageDone = false;
          draft.modifyPostImageError = null;
          break;
      case MODIFY_POST_IMAGE_SUCCESS: 
        draft.imagePath = action.data;
        draft.modifyPostImageLoading = false;
        draft.modifyPostImageDone = true;
        break;
      case MODIFY_POST_IMAGE_FAILURE:
        draft.modifyPostImageLoading = false;
        draft.modifyPostImageError = action.error;
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
      case REMOVE_POSTS:
        draft.mainPosts = [];  
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data)
        break;
      case REMOVE_EDIT_IMAGE:
        draft.modifyImagePaths = draft.modifyImagePaths.filter((v, i) => i !== action.data)
        break; 
      default: {
        break;
      }
    }
  }) 
};