import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  onFetchUsersSuccess,
  onUpdateUserSuccess,
  onAddUserSuccess,
  onDeleteUserSuccess,
  fetchError,
} from "../actions/UsersActions";
import {
  FETCH_ALL_USERS,
  UPDATE_USER_REQUEST,
  ADD_USER_REQUEST,
  DELETE_USER_REQUEST,
  REQUEST_URL,
} from "../../constants/UserConstants";

/**
 * @description Request to fetch users list
 * @returns {Object}
 */
const getUsersList = async () => {
  const data = fetch(`${REQUEST_URL}/users`, { method: 'GET' }).then((response) => {
    return response.json();
  }).then((usersList) => {
    return usersList;
  }).catch((err) => console.log(err));
  
  return data;
}

/**
 * @description Make PATCH request to update user
 * @param {Number} id
 * @param {Object} user
 * @returns {Object}
 */
const updateUserRequest = async (id, user) => {
  const data = fetch(`${REQUEST_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response;
  }).catch((error) => console.log(error));

  return data;
}

/**
 * @description Make POST request to add user in the list
 * @param {Object} user
 * @returns {Object}
 */
const addUserRequest = async (user) => {
  const data = fetch(`${REQUEST_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response;
  }).catch((error) => console.log(error));

  return data;
}

/**
 * @description Make DELETE request to remove a user from the list
 * @param {Number} id
 * @returns {Object}
 */
const deleteUserRequest = async (id) => {
  const data = fetch(`${REQUEST_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response;
  }).catch((error) => console.log(error));

  return data;
}

/**
 * @description Generator function which executes when FETCH_USERS_REQUEST action is triggered
 * @returns {void}
 */
function* fetchUsersList() {
  try {
    const users = yield call(getUsersList);

    if (users) {
      yield put(onFetchUsersSuccess(users));
    }
  } catch (error) {
    yield put(fetchError(error));
  }
}

/**
 * @description Generator function which executes when UPDATE_USER_REQUEST is triggered
 * @param {Object} data
 * @returns {void}
 */
function* updateUser(data) {
  try {
    const response = yield call(updateUserRequest, data.id, data.user);
    if (response.status >= 200 && response.status <= 204) {
      yield put(onUpdateUserSuccess(data.user));
    }
  } catch (error) {
    yield put(fetchError(error));
  }
}

/**
 * @description Generator function which executes when ADD_USER_REQUEST is triggered
 * @param {Object} data
 * @returns {void}
 */
function* addNewUser(data) {
  try {
    const response = yield call(addUserRequest, data.payload);

    if (response.status >= 200 && response.status <= 204) {
      yield put(onAddUserSuccess(data.payload));
    }
  } catch (error) {
    yield put(fetchError);
  }
}

/**
 * @description Generator function which executes when DELETE_USER_REQUEST is triggered
 * @param {Object} data
 * @returns {void}
 */
function* deleteUser(data) {
  try {
    const response = yield call(deleteUserRequest, data.payload.id);

    if (response.status >= 200 && response.status <= 204) {
      yield put(onDeleteUserSuccess(data.payload));
    }
  } catch (error) {
    yield put(fetchError);
  }
}

export function* actionsWatcher() {
  yield takeEvery(FETCH_ALL_USERS, fetchUsersList);
  yield takeEvery(UPDATE_USER_REQUEST, updateUser);
  yield takeEvery(ADD_USER_REQUEST, addNewUser);
  yield takeEvery(DELETE_USER_REQUEST, deleteUser);
}

export default function* rootSaga() {
  yield all([fork(actionsWatcher)]);
}
