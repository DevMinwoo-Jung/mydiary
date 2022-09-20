import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_POST_REQUEST,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST,
    POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAILURE, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost, dummy
    ,UPLOAD_PROFILE_IMAGES_REQUEST, UPLOAD_PROFILE_IMAGES_FAILURE, UPLOAD_PROFILE_IMAGES_SUCCESS,
    MODIFY_PROFILE_IMAGE_FAILURE, MODIFY_PROFILE_IMAGE_REQUEST, MODIFY_PROFILE_IMAGE_SUCCESS,
    LOAD_PROFILE_FAILURE, LOAD_PROFILE_REQUEST, LOAD_PROFILE_SUCCESS,
    MODIFY_POST_FAILURE, MODIFY_POST_REQUEST, MODIFY_POST_SUCCESS,
    UPLOAD_EDIT_IMAGES_FAILURE, UPLOAD_EDIT_IMAGES_REQUEST, UPLOAD_EDIT_IMAGES_SUCCESS,
    MODIFY_POST_IMAGE_FAILURE, MODIFY_POST_IMAGE_REQUEST, MODIFY_POST_IMAGE_SUCCESS, 
    REMOVE_EXIST_IMAGE_ID_REQUEST, REMOVE_EXIST_IMAGE_ID_SUCCESS, REMOVE_EXIST_IMAGE_ID_FAILURE,
    LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_REQUEST,
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

function removePostAPI(data) {
    return axios.delete(`/post/${data}`, data) // 이렇게 해 주는게 req.body에 content에 접근 하려고 없으면 접근이 안될껄..?
}

function* deletePost(action) {
    try {
        const result = yield call(removePostAPI, action.data)
        yield put({
            type: POST_DELETE_SUCCESS,
            data: result.data,
        });
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

function loadProfileAPI(data) {
    return axios.get('/post/profilephoto', data)
}

function* loadProfile(action) {
    console.log(action)
    try {
        const result = yield call(loadProfileAPI, action.data)
        yield put({
            type: LOAD_PROFILE_SUCCESS,
            data: result.data,
        });
        } catch (err) {
            console.log(err)
            yield put({
                type: LOAD_PROFILE_FAILURE,
                dataerror: err.response.data
            })
        }
}

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data)
}

function* uploadImage(action) {
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

function uploadEditImagesAPI(data) {
    return axios.post(`/post/images`, data)
}

function* uploadEditImage(action) {
    try {
        const result = yield call(uploadEditImagesAPI, action.data);
        yield put({
        type: UPLOAD_EDIT_IMAGES_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: UPLOAD_EDIT_IMAGES_FAILURE,
        error: err.response.data,
        });
    }
}

function uploadProfileImagesAPI(data) {
    return axios.post(`/post/image`, data)
}

function* uploadProfileImage(action) {
    try {
        const result = yield call(uploadProfileImagesAPI, action.data);
        yield put({
        type: UPLOAD_PROFILE_IMAGES_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: UPLOAD_PROFILE_IMAGES_FAILURE,
        error: err.response.data,
        });
    }
}

function profilePhotoModifyAPI(data) {
    return axios.post(`/post/profilephoto`, data)
}

function* profilePhotoModify(action) {
    try {
        const result = yield call(profilePhotoModifyAPI, action.data);
        yield put({
        type: MODIFY_PROFILE_IMAGE_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: MODIFY_PROFILE_IMAGE_FAILURE,
        error: err.response.data,
        });
    }
}

function postModifyAPI(data) {
    return axios.patch(`/post`, data)
}

function* postModify(action) {
    try {
        const result = yield call(postModifyAPI, action.data);
        yield put({
        type: MODIFY_POST_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: MODIFY_POST_FAILURE,
        error: err.response.data,
        });
    }
}

function postModifyImageAPI(data) {
    return axios.post(`/post/images/${data.PostId}`, data)
}

function* postImageModify(action) {
    try {
        const result = yield call(postModifyImageAPI, action.data);
        yield put({
        type: MODIFY_POST_IMAGE_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: MODIFY_POST_IMAGE_FAILURE,
        error: err.response.data,
        });
    }
}

function removeExistIdAPI(data) {
    return axios.patch(`/post/images/${data.PostId}`, data)
}

function* removeExistId(action) {
    try {
        const result = yield call(removeExistIdAPI, action.data);
        yield put({
        type: REMOVE_EXIST_IMAGE_ID_SUCCESS,
        data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
        type: REMOVE_EXIST_IMAGE_ID_FAILURE,
        error: err.response.data,
        });
    }
}

function loadHashtagPostsAPI(data, lastId) {
    console.log('why ra no')
    console.log(data)
    console.log(encodeURIComponent(data))
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashTagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            data: err.response.data,
    });
}
}

function* watchLoadHashTagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashTagPosts)
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchLoadProfile() {
    yield takeLatest(LOAD_PROFILE_REQUEST, loadProfile)
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchUploadImagesPost() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage)
}

function* watchUploadEditImagesPost() {
    yield takeLatest(UPLOAD_EDIT_IMAGES_REQUEST, uploadEditImage)
}

function* watchDeletePost() {
    yield takeLatest(POST_DELETE_REQUEST, deletePost)
}

function* watchUploadProfileImagesPost() {
    yield takeLatest(UPLOAD_PROFILE_IMAGES_REQUEST, uploadProfileImage)
}

function* watchModifyProfileImagesPost() {
    yield takeLatest(MODIFY_PROFILE_IMAGE_REQUEST, profilePhotoModify)
}

function* watchModifyPost() {
    yield takeLatest(MODIFY_POST_REQUEST, postModify)
}

function* watchModifyPostImage() {
    yield takeLatest(MODIFY_POST_IMAGE_REQUEST, postImageModify)
}

function* watchRemoveExistId() {
    yield takeLatest(REMOVE_EXIST_IMAGE_ID_REQUEST, removeExistId)
}

export default function* rootSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchUploadImagesPost),
        fork(watchDeletePost),
        fork(watchLoadPost),
        fork(watchUploadProfileImagesPost),
        fork(watchModifyProfileImagesPost),
        fork(watchLoadProfile),
        fork(watchModifyPost),
        fork(watchUploadEditImagesPost),
        fork(watchModifyPostImage),
        fork(watchRemoveExistId),
        fork(watchLoadHashTagPosts),
    ])
}