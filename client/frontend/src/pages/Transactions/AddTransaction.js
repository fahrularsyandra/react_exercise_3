import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../axios/Transaction";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const [form, setForm] = useState({
    description: "",
    debt_id: null,
    amount: 0,
    status: 0,
    payDebt: false,
    income: false,
    outcome: false,
  });
  const navigate = useNavigate();

  const submitHandler = () => {
    const data = {
      description: form.description,
      debt_id: null,
      amount: form.amount,
      status: 0,
    };
    if (form.income) {
      data.status = 0;
    } else {
      data.status = 1;
    }
    create(data,
      (result) => {
        const { error } = result;
        if (error) {
          Swal.fire({
            icon: "error",
            title: error.response ? error.response.data.message : error.message,
            // title: JSON.stringify(error),
            showConfirmButton: false,
            timer: 10000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Transaction has been created!",
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
          required
        ></input>
      </div>
      {/* <div className="form-check form-check-inline mb-3">
          <input onChange={(e) => setForm({...form, payDebt: e.target.checked})} checked={form.payDebt} className="form-check-input" type="checkbox" id="inlineCheckbox1" value="1"></input>
          <label className="form-check-label" >Pay Debt</label>
        </div>
        {(form.payDebt)? <div className="mb-3">
          <label  className="form-label">Debt ID</label>
          <input type="text" onChange={(e) => setForm({...form, debt_id: e.target.value})} className="form-control" id="amountInput" required></input>
        </div>: <div></div>} */}
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="form-control"
          id="amountInput"
          required
        ></input>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onChange={(e) =>
            setForm({
              ...form,
              income: e.target.checked,
              outcome: !e.target.checked,
            })
          }
          checked={form.income}
          type="checkbox"
          id="inlineCheckbox1"
          value="1"
        ></input>
        <label className="form-check-label">Income</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onChange={(e) =>
            setForm({
              ...form,
              outcome: e.target.checked,
              income: !e.target.checked,
            })
          }
          checked={form.outcome}
          type="checkbox"
          id="inlineCheckbox2"
          value="2"
        ></input>
        <label className="form-check-label">Outcome</label>
      </div>
      <div className="mt-3">
        <button onClick={() => submitHandler()} className="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
};

export default AddTransaction;
