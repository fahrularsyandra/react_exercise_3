import axios from "axios";

const URL = "http://localhost:3000/api/transactions";
const access_token = localStorage.getItem("access_token");
const headers = {
  headers: {
    access_token: access_token,
  },
};
const getTransactions = async (cb) => {
  if (access_token) {
    try {
      const transactions = await axios.get(URL, headers);
      console.log(transactions.data);
      cb(transactions.data);
    } catch (error) {
      cb({ error: error.message });
    }
  } else {
    cb({ error: "Token expired" });
  }
};

const create = async (data, cb) => {
  if (access_token) {
    try {
      const transactions = await axios.post(URL, data, headers);
      console.log(transactions.data);
      cb(transactions.data);
    } catch (error) {
      cb({ error: error.message });
    }
  } else {
    cb({ error: "Token expired" });
  }
};

const update = async (cb) => {
  try {
    const transaction = await axios.get(URL);
    console.log(transaction.data);
    cb(transaction.data);
  } catch (error) {
    cb({ error: error.message });
  }
};

const remove = async (id, cb) => {
  if (access_token) {
    try {
        console.log(id);
      await axios.get(`${URL}/${id}`, headers);
      cb({ data: "delete success" });

    } catch (error) {
      cb({ error: error });
    }
  } else {
    cb({ error: "Token expired" });
  }
};
export { getTransactions, remove, create };
