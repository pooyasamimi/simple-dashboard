import axios from "axios";

export const jpAxios = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    timeout:7000,
    timeoutErrorMessage:'wrong internet (turn on vpn)'
})