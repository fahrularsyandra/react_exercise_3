import axios, { AxiosError } from "axios";

const URL = "http://localhost:3000/api/auth";

const getUser = async (cb) => {
  try {
    const newDebt = await axios.get(URL);
    console.log(newDebt.data);
    cb(newDebt.data);
  } catch (error) {
    cb({ error: error.message });
  }
};

const login = async (data, cb) => {
  try {
    const user = await axios.post(`${URL}/login`, data);
    if (user.status !== 200) {
      cb({ error: user });
    } else {
      if (user.data.data) {
        localStorage.setItem("access_token", user.data.data.access_token);
        cb({
          data: {
            access_token: user.data.data,
          },
        });
      } else {
        cb({ error: { message: user.data.message } });
      }
    }
  } catch (error) {
    // console.log(error.response.data.data);
    // if (error.response) {
      cb({ error: error });
    // } else cb({ "error": error });
  }
};

const register = async (cb) => {
  try {
    const newDebt = await axios.get(URL);
    console.log(newDebt.data);
    cb(newDebt.data);
  } catch (error) {
    cb({ error: error.message });
  }
};

const remove = async (id) => {
  try {
    await axios.get(`${URL}/${id}`);
  } catch (error) {
    return error;
  }
};
export { getUser, remove, login };
