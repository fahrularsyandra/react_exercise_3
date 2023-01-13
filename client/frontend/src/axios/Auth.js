import axios from 'axios';

const URL = "http://localhost:3000/api/auth"

const getUser = async (cb) => {
    try {
        const newDebt = await axios.get(URL)
        console.log(newDebt.data);
        cb(newDebt.data)  
    } catch (error) {
        cb({error : error.message})
    }
}

const login = async (data) => {
    try {
        const user = await axios.post(`${URL}/login`, data)
    } catch (error) {
        console.log(error);
    }
}

const register = async (cb) => {
    try {
        const newDebt = await axios.get(URL)
        console.log(newDebt.data);
        cb(newDebt.data)
    } catch (error) {
        cb({error : error.message})
    }
}

const remove = async (id) => {
    try {
        await axios.get(`${URL}/${id}`)
    } catch (error) {
        return error
    }
}
export {
    getUser,
    remove,
    login
}