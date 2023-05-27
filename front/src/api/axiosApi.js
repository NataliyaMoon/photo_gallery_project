import axios from "axios";
import {apiUrl} from "../constants/config";

const instance = axios.create({
    baseURL: apiUrl + "/api/v1"
});

export default instance;
