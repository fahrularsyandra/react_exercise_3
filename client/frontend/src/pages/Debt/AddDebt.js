import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../axios/Debt";
import Swal from "sweetalert2";

const AddDebt = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    amount: 0,
    status: 0,
  });

  const submitHandler = () => {
    create(
      {
        description: form.description,
        amount: form.amount,
        status: 1,
      },
      (result) => {
        const { error } = result;
        if (error) {
          Swal.fire({
            icon: "error",
            // title: error.response ? error.response.data.message : error.message,
            title: JSON.stringify(error),
            showConfirmButton: false,
            timer: 10000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Data has been created",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1)
        }
      }
    );
    console.log(form);
  };
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="form-control"
          id="descInput"
          aria-describedby="textHelp"
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="form-control"
          id="amountInput"
        ></input>
      </div>
      <div className="mt-3">
        <button onClick={() => submitHandler()} className="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
};

export default AddDebt;
