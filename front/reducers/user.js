import produce from 'immer'

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    user: {
        id: 'devminwooJung',
        nickname: '짱멋진 개발자 정민우',
        password: '123123123',
        createdAt: '2022/07/08',
        weight: '83',
        height: '182',
    },
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
        case LOG_IN_REQUEST: 
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS: 
            draft.logInLoading = false;
            draft.me = action.data;
            draft.logInDone = true;
            break;
        case LOG_IN_FAILURE: 
            draft.logInLoading = false;
            draft.logInError = action.error;
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
            showModifyForm: false,
            }
        case USER_INFO_MODIFY_SUCCESS: 
            draft.userInfomodifyLoading = false;
            draft.userInfomodifyDone = true;
            draft.me = null
            break;
        case USER_INFO_MODIFY_FAILURE: 
            draft.userInfomodifyLoading = false;
            draft.userInfomodifyError = action.error;
            break;
        default:
            break;
        }
    })
};