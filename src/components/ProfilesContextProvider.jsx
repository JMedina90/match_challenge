import React from 'react';

export const ProfileContext = React.createContext({
  profiles: [],
  cachedProfiles: [],
  totalProfiles: 0,
  currentPage: 0,
  totalPages: 0,
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
      let limit = 15;
      let firstPage = profilesBatch.splice(0, limit);
      let totalPages = Math.ceil(profilesBatch.length / limit);

      return {
        ...state,
        profiles: firstPage,
        cachedProfiles: profilesBatch,
        totalProfiles: profilesBatch.length,
        totalPages: totalPages,
      };

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
    cachedProfiles: [],
    totalProfiles: 0,
    currentPage: 0,
    totalPages: 0,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
