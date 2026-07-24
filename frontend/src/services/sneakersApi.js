import apiClient from "./apiClient";

export const getSneakers = async () => {
  const response = await apiClient.get("/sneakers");
  return response.data;
};

export const getSneakerById = async (id) => {
  const response = await apiClient.get(`/sneakers/${id}`);
  return response.data;
};

export const createSneaker = async (sneakerData) => {
  const response = await apiClient.post("/sneakers", sneakerData);
  return response.data;
};

export const updateSneaker = async (id, sneakerData) => {
  const response = await apiClient.put(`/sneakers/${id}`, sneakerData);
  return response.data;
};

export const deleteSneaker = async (id) => {
  const response = await apiClient.delete(`/sneakers/${id}`);
  return response.data;
};
