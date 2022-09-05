import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_POST_REQUEST,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST,
    POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAILURE, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost, dummy
} from '../reducers/post'

function addPostAPI(data) {
    return axios.post('/post', data) // 이렇게 해 주는게 req.body에 content에 접근 하려고 없으면 접근이 안될껄..?
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
        type: ADD_POST_SUCCESS,
        data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: ADD_POST_FAILURE,
        error: err.response.data,
        });
    }
}

function* deletePost(action) {
    console.log(action)
    try {
        const result = yield call(removePostAPI, action.data)
        yield put({
            type: POST_DELETE_SUCCESS,
            data: result.data,
        });
        // yield put({
        //     type: REMOVE_POST_OF_ME,
        //     data: action.data,
        // });
        } catch (err) {
            console.log(err)
            yield put({
                type: POST_DELETE_FAILURE,
                dataerror: err.response.data
            })
        }
}

function loadPostsAPI(data) {
    return axios.get('/posts', data)
}

function* loadPosts(action) {
    console.log(action)
    try {
        const result = yield call(loadPostsAPI, action.data)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
        } catch (err) {
            console.log(err)
            yield put({
                type: LOAD_POSTS_FAILURE,
                dataerror: err.response.data
            })
        }
}

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data)
}

function* uploadImage(action) {
    console.log('upload Image')
    console.log(action.data)
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: UPLOAD_IMAGES_FAILURE,
        error: err.response.data,
        });
    }
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchUploadImagesPost() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage)
}

function* watchDeletePost() {
    yield takeLatest(POST_DELETE_REQUEST, deletePost)
}


export default function* rootSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchUploadImagesPost),
        fork(watchDeletePost),
        fork(watchLoadPost),
    ])
}