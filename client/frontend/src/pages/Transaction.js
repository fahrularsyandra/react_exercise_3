import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTransactions, remove } from "../axios/Transaction";
import Swal from "sweetalert2";

const Transaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [summary, setSummary] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    getTransactions((result) => {
      const { error, data } = result;
      if (error) {
        navigate("/login");
        navigate(0)
      }
      setTransaction(result.data);
      setSummary(result.summary)
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
          timer: 2000,
        });
        navigate(0);
      }
    });
  };
  return (
    <div className="container p-2">
      {/* <div className="text-style">{transactions}</div> */}

      <div className="mt-3">
        <button className="btn btn-primary">
          <Link className="navbar-brand" to="/transactions/add">
            +Transaction
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
          {transactions.length > 0 ? (
            transactions.map((transaction, i) => {
              return (
                <tr className="bg-light" key={i + 1}>
                  <th scope="row">{i + 1}</th>
                  <td className="text-style">{transaction.description}</td>
                  <td className="text-style">
                    {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.amount)}
                  </td>
                  {transaction.status === 0 ? (
                    <td className="bg-success text-style text-white text-center">INCOME</td>
                  ) : transaction.status === 1 ? (
                    <td className="bg-warning text-style text-center">PAID</td>
                  ) : (
                    <td className="bg-danger text-style text-white text-center">DEBT</td>
                  )}
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteHandler(transaction.id)}
                      className="ms-1 btn btn-danger btn-sm w-50 text-style"
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
          
          <tr className="bg-light" key="tota;">
                  <td className="text-style text-center" colSpan={3}>Summary</td>
                  <td className="text-style" colSpan={2}>
                    : {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                    }).format(summary)}
                  </td>
                </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
