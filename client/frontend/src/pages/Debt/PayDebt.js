import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { payDebt } from "../../axios/Debt";

const PayDebt = () => {
  const { debt_id, description, total } = useParams();
  // const data= useParams()
  const [form, setForm] = useState({
    description: "",
    debt_id: 0,
    amount: 0,
    status: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setForm({ ...form, description: description, debt_id: debt_id });
    console.log({ debt_id, description, total });
  }, []);

  const submitHandler = () => {
    payDebt(form, (result) => {
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
        navigate(-1);
      }
    });
    console.log(form);
  };
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="amount"
          value={description}
          className="form-control"
          id="exampleInputamount1"
          aria-describedby="amountHelp"
          disabled
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label">Total</label>
        <input
          type="amount"
          value={total}
          className="form-control"
          id="exampleInputamount1"
          aria-describedby="amountHelp"
          disabled
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          onChange={(e) =>
            setForm({
              ...form,
              amount:
                Number(e.target.value) > Number(total) ? total : e.target.value,
            })
          }
          value={form.amount}
          className="form-control"
          id="exampleInputamount1"
          aria-describedby="amountHelp"
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

export default PayDebt;
