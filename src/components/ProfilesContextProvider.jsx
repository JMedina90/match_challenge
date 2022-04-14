import { pagination } from 'helpers';
import React from 'react';

export const ProfileContext = React.createContext({
  profiles: [],
  cachedProfiles: [],
  totalProfiles: 0,
  currentPage: 0,
  totalPages: 0,
  limit: 10,
  offset: 0,
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
      let _limit = state.limit;
      let profilesBatch = action.payload;

      // cache profile database to search for user profiles from the list and not the current page
      let cachedProfiles = [...action.payload];
      let totalPages = Math.ceil(cachedProfiles.length / _limit);
      let firstPage = profilesBatch.splice(0, _limit);

      return {
        ...state,
        profiles: firstPage,
        cachedProfiles: cachedProfiles,
        totalProfiles: profilesBatch.length,
        totalPages: totalPages,
      };

    case 'search':
      let search_term = action.payload;
      let filteredProfiles;
      if (search_term !== '') {
        filteredProfiles = state.cachedProfiles.filter(
          (p) => p.name.first.toLowerCase() === search_term.toLowerCase()
        );
      } else {
        filteredProfiles = pagination(state.cachedProfiles, state.offset, state.limit);
      }

      return { ...state, profiles: filteredProfiles };

    case 'paginate':
      const { offset, page } = action.payload;
      const paginatedProfiles = pagination(state.cachedProfiles, offset, state.limit);

      return { ...state, profiles: paginatedProfiles, currentPage: page, offset };

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
    limit: 10,
    offset: 0,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
