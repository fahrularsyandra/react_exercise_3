import React, { useEffect, useState } from "react";
import "../styles/Debt.css";
import { getDebts, remove } from "../axios/Debt";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router";

const Debt = () => {
  const [debts, setDebts] = useState({});
  useEffect(() => {
    getDebts((result) => setDebts(result.data));
  }, []);

  const navigate = useNavigate()

  const deleteHandler = (id) => {
    remove(id)
    navigate(0)
  }
  return (
    <div className="container p-2">

      <div className='mt-3'>
        <button className="btn btn-primary"><Link className="navbar-brand" to="/debts/add">+Debt</Link></button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {debts.length > 0 ? (
            debts.map((debt, i) => {
              return (
                <tr className="bg-light" key={i + 1}>
                  <th scope="row">{i + 1}</th>
                  <td className="text-style">{debt.description}</td>
                  <td className="text-style">
                    {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                    }).format(debt.amount)}
                  </td>
                  {debt.status === 0? <td className="bg-success text-style">PAID</td> : <td className="bg-warning text-style">DEBT</td>}
                  <td>
                    {debt.status === 1?<button type="button" className="btn btn-info btn-sm w-25 text-style">
                      EDIT
                    </button> : <button type="button" className="btn btn-info btn-sm w-25 text-style" disabled>
                      EDIT
                    </button>}
                    
                    <button
                      type="button"
                      className="ms-1 btn btn-danger btn-sm w-25 text-style"
                      onClick={() => deleteHandler(debt.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-align-center" colSpan={5}>Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Debt;
