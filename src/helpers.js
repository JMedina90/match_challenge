export const debounce = (callback, delay = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const pagination = (profiles, offset, limit) => {
  const pageLimit = offset + limit;

  return profiles.slice(offset, pageLimit);
};
