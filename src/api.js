import axios from "axios";

//개발용
//배포용
const baseUrl = import.meta.env.DEV 
  ? "http://localhost:8080"
  : "http://javis-LB-205407576.us-east-1.elb.amazonaws.com";
export const client = axios.create({
  baseURL: "https://javis.shop",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});