import mockProfile from '../profiles.json';
export const getProfiles = async () => {
  // const response = await fetch('');
  // if (!response.ok) {
  //   const message = `An error has occured: ${response.status}`;
  //   throw new Error(message);
  // }
  // const data = response.json();
  // return data;
  return mockProfile;
};
