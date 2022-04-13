import { ProfileContext } from 'components/ProfilesContextProvider';
import React, { useState, useContext } from 'react';
// Profile interface
// interface Profile = {};

const useGetProfiles = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  return {
    loading,
    profile,
    setProfile,
  };
};

export default useGetProfiles;
