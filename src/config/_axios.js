import axios from "axios"
import { PATH_API } from "../constants/index"


const API = axios.create({
  baseURL: PATH_API,
})

export default API