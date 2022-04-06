// import axios from "axios"
// import { PATH_API } from "../constants/index"


// const API = axios.create({
//   baseURL: PATH_API,
// })

// export default API

import axios from 'axios';
import { PATH_API } from '../constants';
const instance = axios.create({
    baseURL: PATH_API,
    headers: {
        headerType: 'example header type'
    }
});
export default instance;