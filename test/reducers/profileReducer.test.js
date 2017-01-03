import expect from 'expect';
import profileReducer from '../../src/redux/reducers/profileReducer';
import * as actions from '../../src/redux/actions/profileActions';

describe('Profile Reducer', () => {
  it('should load profiles when passed LOAD_PROFILES_SUCCESS', () => {

    const initialState = {
      data: [],
      error: {},
      isRequesting: false
    };

    // arrange
    const profiles = [
      {
        firstName: "Mushangi",
        lastName: "Derrick"
      }, {
        firstName: "Kioko",
        lastName: "Philip"
      }
    ];

    const action = actions.loadProfilesSuccess(profiles);

    // act
    const newState = profileReducer(initialState, action);

    // assert
    expect(newState.data.length).toEqual(2);
    expect(newState.data).toEqual(profiles);
    expect(newState.data[0].firstName).toEqual('Mushangi');
    expect(newState.data[1].firstName).toEqual('Kioko');
  });

  it('should add profile when passed CREATE_PROFILE_SUCCESS', () => {
    // arrange
    const initialState = {
      data: [
        {
          firstName: "Mushangi",
          lastName: "Derrick"
        }, {
          firstName: "Kioko",
          lastName: "Philip"
        }
      ],
      error: {},
      isRequesting: false
    };

    const profile = {
      firstName: "Mwas",
      lastName: "Joel"
    };
    const action = actions.createProfileSuccess(profile);

    // act
    const newState = profileReducer(initialState, action);

    // assert
    expect(newState.data.length).toEqual(3);
    expect(newState.data[0].firstName).toEqual('Mushangi');
    expect(newState.data[1].firstName).toEqual('Kioko');
    expect(newState.data[2].firstName).toEqual('Mwas');
  });

  it('should update profile when passed UPDATE_PROFILE_SUCCESS', () => {
    // arrange
    const initialState = {
      data: [
        {
          id: "mushangi-derrick",
          firstName: "Mushangi",
          lastName: "Derrick"
        }, {
          id: "kioko-philip",
          firstName: "Kioko",
          lastName: "Philip"
        }, {
          id: "mwas-joel",
          firstName: "Mwasi",
          lastName: "Joel"
        }
      ],
      error: {},
      isRequesting: false
    };

    const profile = {
      id: "mwas-joel",
      firstName: "Mwas",
      lastName: "Joel"
    };
    const action = actions.updateProfileSuccess(profile);

    // act
    const newState = profileReducer(initialState, action);
    const updatedProfile = newState.data.find(prof => prof.id === profile.id);
    const untouchedProfile = newState.data.find(prof => prof.id === 'mushangi-derrick');

    // assert
    expect(newState.data.length).toEqual(3);
    expect(updatedProfile.firstName).toEqual('Mwas');
    expect(untouchedProfile.firstName).toEqual('Mushangi');
  });
});
