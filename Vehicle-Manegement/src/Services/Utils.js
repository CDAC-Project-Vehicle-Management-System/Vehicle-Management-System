const SERVER_URL = "`https://localhost:44383/api";

export const createError = (error) => {
  return { status: "error", error };
};

export const createUrl = (path) => {
  return `${SERVER_URL}/${path}`;
};