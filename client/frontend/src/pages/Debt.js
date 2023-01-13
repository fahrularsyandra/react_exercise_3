import React, { useEffect, useState } from "react";
import "../styles/Debt.css";
import { getDebts, remove } from "../axios/Debt";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const Debt = () => {
  const [debts, setDebts] = useState({});
  
  const navigate = useNavigate();
  useEffect(() => {
    getDebts((result) => {
      const { error, data } = result;
      if (error) {
        navigate("/login");
        navigate(0)
      }
      setDebts(result.data.data);
    });
  }, []);

  const deleteHandler = (id) => {
    remove(id, (result) => {
      const { error } = result;
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
          title: "Data has been deleted",
          showConfirmButton: false,
          timer: 1700,
        });
        navigate(0);
      }
    });
  };
  return (
    <div className="container p-2">
      <div className="mt-3">
        <button className="btn btn-primary">
          <Link className="navbar-brand" to="/debts/add">
            +Debt
          </Link>
        </button>
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
                  {debt.status === 0 ? (
                    <td className="bg-success text-style">PAID OFF</td>
                  ) : (
                    <td className="bg-warning text-style">DEBT</td>
                  )}
                  <td>
                    {debt.status === 1 ? (
                      <button
                      onClick={() => navigate(`/debts/pay/${debt.id}/${debt.description}/${debt.amount}`)}
                        type="button"
                        className="btn btn-info btn-sm w-20 text-style"
                      >
                        PAY DEBT
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-info btn-sm w-20 text-style"
                        disabled
                      >
                        PAY DEBT
                      </button>
                    )}

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
              <td className="text-align-center" colSpan={5}>
                There is no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Debt;
