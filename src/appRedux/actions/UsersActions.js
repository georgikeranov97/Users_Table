import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_ERROR,
} from '../../constants/UserConstants';

/**
 * @description Fetch users list
 * @returns {Object}
 */
export const onFetchUsersRequest = () => ({
  type: FETCH_ALL_USERS,
});

/**
 * @description Fetch users list success
 * @param {Object} data 
 * @returns {Object}
 */
export const onFetchUsersSuccess = (payload) => ({
  type: FETCH_ALL_USERS_SUCCESS,
  payload,
});

export const onUpdateUserRequest = (id, user) => ({
  type: UPDATE_USER_REQUEST,
  id,
  user
});

export const onUpdateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const onAddUserRequest = (payload) => ({
  type: ADD_USER_REQUEST,
  payload,
});

export const onAddUserSuccess = (payload) => ({
  type: ADD_USER_SUCCESS,
  payload,
});

export const onDeleteUserRequest = (payload) => ({
  type: DELETE_USER_REQUEST,
  payload,
});

export const onDeleteUserSuccess = (payload) => ({
  type: DELETE_USER_SUCCESS,
  payload,
});

export const fetchError = (error) => ({
  type: FETCH_ERROR,
  payload: error,
});
