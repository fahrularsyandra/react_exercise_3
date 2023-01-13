import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../axios/Auth";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const submitHandler = () => {
    login(form, (result) => {
      const { error, data } = result;

      if (error) {
        Swal.fire({
          icon: "error",
          title: error.response ? error.response.data.data : error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/debts");
      }
    });
  };
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="form-control"
          id="exampleInputusername1"
          aria-describedby="usernameHelp"
        ></input>
        <div id="usernameHelp" className="form-text">
          We'll never share your username with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="form-control"
          id="exampleInputPassword1"
        ></input>
      </div>
      <button
        type="submit"
        onClick={() => submitHandler()}
        className="btn btn-primary"
      >
        Submit
      </button>
    </>
  );
};

export default Login;
