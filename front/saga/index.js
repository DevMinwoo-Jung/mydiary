import { all, fork } from 'redux-saga/effects'

import postSaga from './post'
import userSaga from './user'
import axios from 'axios';
import { backUrl } from '../libs/config'

axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}