import React from 'react';

export const ProfileContext = React.createContext({
  profiles: [],
  cachedProfiles: [],
  dispatch: (any) => {},
});

function ProfilesReducer(state, action) {
  let profiles = [];

  switch (action.type) {
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { profiles };

    case 'descending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { profiles };

    case 'get_profiles':
      let profilesBatch = action.profiles;
      return { ...state, profiles: profilesBatch, cachedProfiles: profilesBatch };

    case 'search':
      let search_term = action.name;
      let filteredProfiles;
      if (search_term !== '') {
        filteredProfiles = state.profiles.filter((p) => p.handle === search_term);
      } else {
        filteredProfiles = state.cachedProfiles;
      }

      return { ...state, profiles: filteredProfiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: [],
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
