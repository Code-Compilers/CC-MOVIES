
import axios from "axios";

const API_KEY = "51b7370e6fac785e511f709f777abc8a";
const BASE_URL = "https://api.themoviedb.org/3";    

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export default tmdb;
