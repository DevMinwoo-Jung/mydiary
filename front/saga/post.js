import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS,
    ADD_POST_REQUEST,

    REPS_DELETE_REQUEST, REPS_DELETE_SUCCESS, REPS_DELETE_FAILURE
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';
import shortid from 'shortid';

// function addPostAPI(data) {
//     return axios.post('/post', { content: data }) // 이렇게 해 주는게 req.body에 content에 접근 하려고 없으면 접근이 안될껄..?
// }                                                    formData는 이렇게 json으로 하면 안됨

function addPostAPI(data) {
    return axios.post('/post', data) // 이렇게 해 주는게 req.body에 content에 접근 하려고 없으면 접근이 안될껄..?
}

function* addPost(action) {
    try {
        // console.log(action)
        const result = yield call(addPostAPI, action.data);
        yield put({
        type: ADD_POST_SUCCESS,
        data: result.data,
        });
        yield put({
        type: ADD_POST_TO_ME,
        data: result.data.id,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: ADD_POST_FAILURE,
        error: err.response.data,
        });
    }
}

function* removeReps(action) {
        try {
            //const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
            // yield delay(1000);
            yield put({
                type: REPS_DELETE_SUCCESS,
                data: action.data,
            });
        } catch (err) {
            console.error(err);
            yield put({
                type: REPS_DELETE_FAILURE,
                data: err.response.data,
        });
    }
}
    
function* watchRemoveRep() {
    yield takeLatest(REPS_DELETE_REQUEST, removeReps)
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* rootSaga() {
    yield all([
        fork(watchRemoveRep),

    ])
}