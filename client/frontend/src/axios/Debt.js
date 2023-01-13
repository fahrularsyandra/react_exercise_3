import axios from "axios";

const URL = "http://localhost:3000/api/debts";

const access_token = localStorage.getItem("access_token");
const headers = {
  headers: {
    access_token: access_token,
  },
};
const getDebts = async (cb) => {
  if (access_token) {
    console.log(access_token);
    try {
      const newDebt = await axios.get(URL, {
        headers: {
          access_token: access_token,
        },
      });
      console.log(newDebt.data);
      cb({ data: newDebt.data });
    } catch (error) {
      cb({ error: error.message });
    }
  } else {
    cb({ error: "Token expired" });
  }
};

const create = async (data, cb) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    try {
      const newDebt = await axios.post(URL, data, headers);
      console.log({newDebt});
      const x = {
        description: newDebt.description,
        debt_id: newDebt.id,
        amount: newDebt.amount,
        status: 2,
      }
      cb({ data: newDebt.data });
    } catch (error) {
        console.log(error);
      cb({ error: error });
    }
  } else {
    cb({ error: "Token expired" });
  }
};

const payDebt = async (data, cb) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const newTransaction = await axios.post("http://localhost:3000/api/transactions", data, headers);
        console.log(newTransaction);
        cb({ data: newTransaction.data });
      } catch (error) {
          console.log(error);
        cb({ error: error });
      }
    } else {
      cb({ error: "Token expired" });
    }
  };
const update = async (cb) => {
  try {
    const newDebt = await axios.get(URL);
    console.log(newDebt.data);
    cb(newDebt.data);
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
export { getDebts, remove, create, payDebt};
