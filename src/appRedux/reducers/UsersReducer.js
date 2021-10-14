import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from '../../constants/UserConstants';

const INIT_STATE = {
  loading: false,
  usersList: [],
};

/**
 * @description Users table reducer
 * @param {Object} state
 * @param {string} action
 * @returns {Object}
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  let newState;

  switch(action.type) {
    case FETCH_ALL_USERS:
      newState = { loading: true };
      return { ...state, ...newState };

    case FETCH_ALL_USERS_SUCCESS:
      newState = { loading: false, usersList: action.payload };
      return { ...state, ...newState };
    
    case UPDATE_USER_REQUEST:
      newState = { loading: true };
      return { ...state, ...newState };

    case UPDATE_USER_SUCCESS:
      const updatedUserId = action.payload.id;
      const findUpdatedUser = state.usersList.find((user) => user.id === updatedUserId);
      state.usersList.splice(findUpdatedUser, 1, action.payload);

      return {
        ...state,
        loading: false,
        usersList: state.usersList,
      };

    case ADD_USER_REQUEST:
      return { ...state, loading: true };
    
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: [...state.usersList, action.payload],
      }

    case DELETE_USER_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_SUCCESS:
      const users = state.usersList.filter((user) => user.id !== action.payload.id);
      return {
        ...state,
        loading: false,
        usersList: users,
      }

    default:
      return state;
  }
}
