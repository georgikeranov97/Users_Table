import { all } from 'redux-saga/effects';
import UsersSaga from './UsersSaga';

export default function* rootSaga() {
  yield all([
    UsersSaga(),
  ]);
}
