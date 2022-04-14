import React from 'react';

// Helpers
import { pagination } from 'helpers';

export const ProfileContext = React.createContext({
  profiles: [],
  cachedProfiles: [],
  totalProfiles: 0,
  currentPage: 0,
  totalPages: 0,
  limit: 10,
  offset: 0,
  refetch: true,
  dispatch: (any) => {},
});

function ProfilesReducer(state, action) {
  let profiles = [];
  let cached = [];

  switch (action.type) {
    case 'ascending':
      profiles = [...state.cachedProfiles];
      profiles.sort((profileA, profileB) => (profileA.name.first > profileB.name.first ? 1 : -1));
      cached = [...profiles];
      profiles = profiles.slice(0, state.limit);
      return { ...state, profiles, cachedProfiles: cached };

    case 'descending':
      profiles = [...state.cachedProfiles];
      profiles.sort((profileA, profileB) => (profileA.name.first < profileB.name.first ? 1 : -1));
      cached = [...profiles];
      profiles = profiles.slice(0, state.limit);
      return { ...state, profiles, cachedProfiles: cached };

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
        const { cachedProfiles, offset, limit } = state;
        filteredProfiles = pagination(cachedProfiles, offset, limit);
      }

      return { ...state, profiles: filteredProfiles, refetch: false };

    case 'paginate':
      const { offset, page } = action.payload;
      const paginatedProfiles = pagination(state.cachedProfiles, offset, state.limit);

      return { ...state, profiles: paginatedProfiles, currentPage: page, offset };

    case 'timer':
      const refetch = action.payload;
      return { ...state, refetch };

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
    refetch: true,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
