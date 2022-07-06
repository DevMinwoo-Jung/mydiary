import produce from 'immer'

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    };

    const dummyUser = (data) => ({
    ...data,
    nickname: 'minwoo',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '또래오래'}, { nickname: '미쳐버린파닭'}, { nickname: '착한수제통닭'}],
    Followers: [{ nickname: '위스키'}, { nickname: '전통소주'}, { nickname: '소주'}]
    })

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';


export const  loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
    });

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
    });

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS,
    };

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
        case LOG_OUT_REQUEST: 
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;
        case LOG_OUT_SUCCESS: 
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.me = null
            break;
        case LOG_OUT_FAILURE: 
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
        default:
            break;
        }
    })
};