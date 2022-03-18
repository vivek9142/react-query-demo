import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getUsers = () => api.get('/users').then(res => res.data);

export const getUser = (id) => api.get(`/users/${id}`).then(res => res.data);

export const updateUser = ({id, ...updateUser}) => 
    api.put(`/users/${id}`,updateUser).then(res => res.data);