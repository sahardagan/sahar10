// src/utils/auth.ts
export const setAuthToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("authToken");
};
