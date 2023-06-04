import axios from "axios"

const baseURL = axios.create({
    baseURL:"http://localhost:5000/api"
    // https://instabookcl.herokuapp.com/api
    // http://localhost:5000/api
})

export { baseURL }