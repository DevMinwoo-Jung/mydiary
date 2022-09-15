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
  toggleDrawer: (closed:boolean) => boolean,
}

export type InitialUser = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  user: {},
  userInfomodifyLoading: false, // 유저 정보 수정 시도중
  userInfomodifyDone: false,
  userInfomodifyError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  showModifyForm: false,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  me: null,
};
