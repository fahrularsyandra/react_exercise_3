import axios from 'axios';

const URL = "http://localhost:3000/api/debts"

const getDebts = async (cb) => {
    try {
        const newDebt = await axios.get(URL)
        console.log(newDebt.data);
        cb(newDebt.data)  
    } catch (error) {
        cb({error : error.message})
    }
}

const create = async (data) => {
    try {
        const newDebt = await axios.post(URL, data)
        const newTransaction = await axios.post(URL, {
            description: newDebt.description,
            debt_id: newDebt.id,
            amount: newDebt.amount,
            status: 2
        })
    } catch (error) {
        console.log(error);
    }
}

const update = async (cb) => {
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
    getDebts,
    remove,
    create
}