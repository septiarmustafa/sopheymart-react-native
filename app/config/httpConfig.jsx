import axios from "axios";
import { BASE_HOST } from "./baseUrl";
import SetupInterceptors from "./SetupInterceptor";

const http = axios.create({
  baseURL: BASE_HOST,
});

SetupInterceptors(http);

export default http;
