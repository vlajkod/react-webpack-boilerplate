import { all } from 'redux-saga/effects';

import publicApi from 'sagas/public-api';

export default function* rootSaga() {
    yield all([
        ...publicApi
    ]);
}