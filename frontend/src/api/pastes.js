import axios from "axios";

export const api = axios.create({
  baseURL: "/", 
  headers: {
    "Content-Type": "application/json"
  }
});

export function createPaste(data) {
  return api.post("/api/pastes", data);
}

export function fetchPaste(id) {
  return api.get(`/api/pastes/${id}`);
}
