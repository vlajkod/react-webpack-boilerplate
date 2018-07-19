import { takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_PUBLIC_API_SUCCESS,
    GET_PUBLIC_API_ERROR,
    GET_PUBLIC_API_START
} from 'actions/public-api';

import api from 'api';

// import { getCountries } from '../actions/country';
function createGetPublicApis() {
    return function* (options) {
        console.log('saga');
        try {
            const data = yield call(() => api.getPublicApi(options.id));
            const action = {
                type: GET_PUBLIC_API_SUCCESS,
                data: data.entries,
            };

            yield put(action);
        } catch(error) {
            const action = {
                type: GET_PUBLIC_API_ERROR,
                error
            }

            yield put(action)
        }
    };
}

export function* createGetPublicApisWatcher() {
    yield takeLatest(GET_PUBLIC_API_START, getPublicApi)
}

export const getPublicApi = createGetPublicApis();

export default [
    createGetPublicApisWatcher()
];