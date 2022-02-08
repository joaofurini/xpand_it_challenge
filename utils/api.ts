import axios from "axios";

const api = axios.create({
    baseURL: `http://movie-challenge-api-xpand.azurewebsites.net/api/`,
});

export default api;
