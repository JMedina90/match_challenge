import { IUser } from '../interfaces/index';

const ROOT_URL = 'https://randomuser.me/api/';
const URL_PARAMETERS = '?results=50';

// I

export const getProfiles = async () => {
  const response = await fetch(`${ROOT_URL}${URL_PARAMETERS}`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const results = await response.json();
  const data: IUser[] = results.results;
  return data;
};
