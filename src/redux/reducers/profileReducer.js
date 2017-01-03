import initialState from './initialState';
import {
  PROFILES_REQUEST,
  PROFILES_SUCCESS,
  PROFILES_FAILURE,
  CREATE_PROFILE_SUCCESS,
  LOAD_PROFILES_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from '../../constants';

export default function profileReducer(state = initialState.profiles, action) {
  switch (action.type) {
    case PROFILES_REQUEST:
      return Object.assign({}, state, {isRequesting: true});

    case PROFILES_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        data: action.data.data
      });

    case PROFILES_FAILURE:
      return Object.assign({}, state, {
        isRequesting: false,
        error: action.error
      });

    case CREATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        data: [
          ...state.data,
          action.profile
        ]
      });

    case LOAD_PROFILES_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        data: [
          ...state.data,
          ...action.profiles
        ]
      });
    case UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        data: state.data.map(profile => {
          if (profile.id === action.profile.id) {
            return Object.assign({}, profile, {firstName: action.profile.firstName});
          } else {
            return profile;
          }
        })

      });
    default:
      return state;
  }
}
