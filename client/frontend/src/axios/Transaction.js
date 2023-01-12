import axios from 'axios';

const URL = "http://localhost:3000/api/transactions"

const getTransactions = async (cb) => {
    try {
        const transactions = await axios.get(URL)
        console.log(transactions.data);
        cb(transactions.data)  
    } catch (error) {
        cb({error : error.message})
    }
}

const create = async (data) => {
    try {
        const transaction = await axios.post(URL, data)
        console.log(transaction.data);
    } catch (error) {
        console.log(error);
    }
}

const update = async (cb) => {
    try {
        const transaction = await axios.get(URL)
        console.log(transaction.data);
        cb(transaction.data)
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
    getTransactions,
    remove,
    create
}