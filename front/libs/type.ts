export type PostObject = {
  content: string;
  id: any;
  date: string;
  Images?: any;
  postImgId?: string,
}

export type PostProps = {
  post: PostObject;
  modify?: boolean;
}

export type ToggleProps = {
  isOpened: boolean,
  toggleDrawer: (closed:boolean) => void,
}

type imageType = {
  src: string;
  id: string
}

export type ImagesProps = {
  image: imageType[];
  type?: string;
  modify?: boolean;
}

// type ImagePathRype = {
//   filename: string | null,
//   src: string | null,
//   location: string
// }

type HashTagPostsType = {
  id: string,
  date: string,
  content: string,
  createAt: string,
  updatedAt: string,
  UserId: string,

}

type UserType = {
  userId: string,
  nickname: string
}

type MainPostsType = {
  id: string,
  date: string,
  content: string,
  createAt: string,
  updatedAt: string,
  Images?: any,
  User: UserType
}

type PostStateType = {
  mainPosts: MainPostsType[],
  hashTagPosts: HashTagPostsType[],
  hasMorePosts: boolean,
  hashTagStatus: boolean,
  postRequest: boolean,
  imagePaths: [],
  modifyImagePaths: [],
  imagePath: any,
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
  postImgId: string,
}

export type PostsState = {
  post: PostStateType,
};

export type Me = {
  id: string;
  userId: string;
  nickname: string;
  createAt: string;
  updatedAt: string;
}

type UserStateType = {
  logInLoading: boolean, // ????????? ?????????
  logInDone: boolean,
  logInError: null,
  logOutLoading: boolean, // ???????????? ?????????
  logOutDone: boolean,
  logOutError: null,
  user: {},
  userInfomodifyLoading: boolean, // ?????? ?????? ?????? ?????????
  userInfomodifyDone: boolean,
  userInfomodifyError: null,
  signUpLoading: boolean, // ???????????? ?????????
  signUpDone: boolean,
  signUpError: null,
  loadMyInfoLoading: boolean,
  loadMyInfoDone: boolean,
  loadMyInfoError: null,
  userRemoveLoading: boolean, // ?????? ?????? ?????????
  userRemoveDone: boolean,
  userRemoveError: null,
  me: Me,
  showModifyForm: boolean,
  isPosted: boolean,
  postRequest: boolean,
}

export type UserState = {
  user:UserStateType;
};
