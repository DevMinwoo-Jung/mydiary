import produce from 'immer'

export const initialState = {
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
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    userRemoveLoading: false, // 유저 삭제 시도중
    userRemoveDone: false,
    userRemoveError: null,
    me: null,
    showModifyForm: false,
    isPosted: false,
    postRequest: false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const USER_INFO_MODIFY_REQUEST = 'USER_INFO_MODIFY_REQUEST'
export const USER_INFO_MODIFY_SUCCESS = 'USER_INFO_MODIFY_SUCCESS'
export const USER_INFO_MODIFY_FAILURE = 'USER_INFO_MODIFY_FAILURE'

export const MODIFY_CANCEL = 'MODIFY_CANCEL'
export const SHOW_MODIFY_FORM = 'SHOW_MODIFY_FORM'
export const HIDE_MODIFY_FORM = 'HIDE_MODIFY_FORM'

export const USER_REMOVE_REQUEST = 'USER_REMOVE_REQUEST'
export const USER_REMOVE_SUCCESS = 'USER_REMOVE_SUCCESS'
export const USER_REMOVE_FAILURE = 'USER_REMOVE_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const ISPOST_IMAGE_TRUE = 'ISPOST_IMAGE_TRUE'
export const ISPOST_IMAGE_FALSE = 'ISPOST_IMAGE_FALSE'
export const LOGIN_DONE_FALSE = 'LOGIN_DONE_FALSE'




export const  loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
    })

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
    })

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS,
}

export default (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
        case USER_REMOVE_REQUEST: 
            draft.userRemoveLoading = true;
            draft.userRemoveError = null;
            draft.userRemoveDone = false;
            break;
        case USER_REMOVE_SUCCESS: 
            draft.userRemoveLoading = false;
            draft.userRemoveDone = true;
            break;
        case USER_REMOVE_FAILURE: 
            draft.userRemoveLoading = false;
            draft.userRemoveError = action.error;
            break;            
        case LOG_IN_REQUEST: 
            draft.logInLoading = true;
            draft.logInError = false;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS: 
            draft.logInLoading = false;
            draft.me = action.data;
            draft.logInDone = true;
            break;
        case LOG_IN_FAILURE: 
            draft.logInLoading = false;
            draft.logInError = true;
            break;
        case SIGN_UP_REQUEST: 
            draft.signUpLoading = true;
            draft.signUpError = null;
            draft.signUpDone = false;
            break;
        case SIGN_UP_SUCCESS: 
            draft.signUpLoading = false;
            draft.me = action.data;
            draft.signUpDone = true;
            break;
        case SIGN_UP_FAILURE: 
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case LOAD_MY_INFO_REQUEST: 
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoError = null;
            draft.loadMyInfoDone = false;
            break;
        case LOAD_MY_INFO_SUCCESS: 
            draft.loadMyInfoLoading = false;
            draft.me = action.data;
            draft.loadMyInfoDone = true;
            break;
        case LOAD_MY_INFO_FAILURE: 
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break;            
        case LOG_OUT_REQUEST: 
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;
        case LOG_OUT_SUCCESS: 
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.logInDone = false;
            draft.loadMyInfoDone = false;
            draft.me = null
            break;
        case LOG_OUT_FAILURE: 
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
        case SHOW_MODIFY_FORM:
            draft.showModifyForm = true;
            break;
        case USER_INFO_MODIFY_REQUEST: 
            return {
            ...state,
            userInfomodifyLoading: true,
            userInfomodifyDone: false,
            userInfomodifyError: false,
            }
        case HIDE_MODIFY_FORM: 
            return {
            ...state,
            showModifyForm: false ? true : false,
            }
        case ISPOST_IMAGE_TRUE:
            draft.isPosted = true;
            break;
        case ISPOST_IMAGE_FALSE:
            draft.isPosted = false;
            break;
        case USER_INFO_MODIFY_SUCCESS: 
            draft.userInfomodifyLoading = false;
            draft.userInfomodifyDone = true;
            draft.me = null
            break;
        case USER_INFO_MODIFY_FAILURE: 
            draft.userInfomodifyLoading = false;
            draft.userInfomodifyError = action.error;
            break;
        case LOGIN_DONE_FALSE:
            draft.logInDone = false;
            break;
        default:
            break;
        }
    })
};