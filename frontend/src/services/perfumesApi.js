import apiClient from "./apiClient";

export const getPerfumes = async () => {
  const response = await apiClient.get("/perfumes");
  return response.data;
};

export const getPerfumeById = async (id) => {
  const response = await apiClient.get(`/perfumes/${id}`);
  return response.data;
};

export const createPerfume = async (perfumeData) => {
  const response = await apiClient.post("/perfumes", perfumeData);
  return response.data;
};

export const updatePerfume = async (id, perfumeData) => {
  const response = await apiClient.put(`/perfumes/${id}`, perfumeData);
  return response.data;
};

export const deletePerfume = async (id) => {
  const response = await apiClient.delete(`/perfumes/${id}`);
  return response.data;
};
