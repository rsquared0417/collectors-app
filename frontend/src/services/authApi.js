import apiClient from "./apiClient";

export const registerUser = async (name, email, password) => {
  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const updateOnboarding = async (
  collects_sneakers,
  collects_perfumes,
) => {
  const response = await apiClient.put("/auth/onboarding", {
    collects_sneakers,
    collects_perfumes,
  });
  return response.data;
};
