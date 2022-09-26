export type PostObject = {
  content: string;
  id: string;
  date: string;
  Images: []
}

export type PostProps = {
  post: PostObject
  modify?: boolean
}

export type ToggleProps = {
  isOpened: boolean,
  toggleDrawer: (closed:boolean) => void,
}

export type PostsState = {
  post: PostsState,
  mainPosts: [],
  hashTagPosts: [],
  hasMorePosts: boolean,
  hashTagStatus: boolean,
  postRequest: boolean,
  imagePaths: [],
  modifyImagePaths: [],
  imagePath: null,
  deleteLoading: boolean,
  deleteDone: boolean,
  deleteError: null,
  uploadImagesLoading: boolean,
  uploadImagesDone: boolean,
  uploadImagesError: null,
  uploadEditImagesLoading: boolean,
  uploadEditImagesDone: boolean,
  uploadEditImagesError: null,
  uploadProfileImagesLoading: boolean,
  uploadProfileImagesDone: boolean,
  uploadProfileImagesError: null,
  modifyProfileImagesLoading: boolean,
  modifyProfileImagesDone: boolean,
  modifyProfileImagesError: null,
  addPostLoading: boolean,
  addPostDone: boolean,
  addPostError: null,
  loadPostsLoading: boolean,
  loadPostsDone: boolean,
  loadPostsError: null,
  loadProfileLoading: boolean,
  loadProfileDone: boolean,
  loadProfileError: null,
  modifyPostLoading: boolean,
  modifyPostDone: boolean,
  modifyPostError: null,
  modifyPostImageLoading: boolean,
  modifyPostImageDone: boolean,
  modifyPostImageError: null,
  removeExistIdLoading: boolean,
  removeExistIdDone: boolean,
  removeExistIdError: null,
  loadHashTagPostsLoading: boolean,
  loadHashTagPostsDone: boolean,
  loadHashTagPostsError: null,
};

export type Me = {
  id: string;
  userId: string;
  nickname: string;
  createAt: string;
  updatedAt: string;
}

export type UserState = {
  logInLoading: boolean, // 로그인 시도중
  logInDone: boolean,
  logInError: null,
  logOutLoading: boolean, // 로그아웃 시도중
  logOutDone: boolean,
  logOutError: null,
  user: UserState,
  userInfomodifyLoading: boolean, // 유저 정보 수정 시도중
  userInfomodifyDone: boolean,
  userInfomodifyError: null,
  signUpLoading: boolean, // 회원가입 시도중
  signUpDone: boolean,
  signUpError: null,
  loadMyInfoLoading: boolean,
  loadMyInfoDone: boolean,
  loadMyInfoError: null,
  userRemoveLoading: boolean, // 유저 삭제 시도중
  userRemoveDone: boolean,
  userRemoveError: null,
  me: Me,
  showModifyForm: boolean,
  isPosted: boolean,
  postRequest: boolean,
};