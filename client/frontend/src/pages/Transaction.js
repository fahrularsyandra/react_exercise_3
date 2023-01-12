import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../axios/Transaction";

const Transaction = () => {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    getTransactions((result) => setTransaction(result.data));
  }, []);
  return (
    <div className="container p-2">
      {/* <div className="text-style">{transactions}</div> */}
      
      <div className='mt-3'>
        <button className="btn btn-primary"><Link className="navbar-brand" to="/transactions/add">+Transaction</Link></button>
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
                    <td className="bg-success text-style">INCOME</td>
                  ) : transaction.status === 1 ? (
                    <td className="bg-warning text-style">OUTCOME</td>
                  ) : (
                    <td className="bg-danger text-style">DEBT</td>
                  )}
                  <td>
                    {transaction.status === 1 ? (
                      <button
                        type="button"
                        className="btn btn-info btn-sm w-25 text-style"
                      >
                        EDIT
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-info btn-sm w-25 text-style"
                        disabled
                      >
                        EDIT
                      </button>
                    )}

                    <button
                      type="button"
                      className="ms-1 btn btn-danger btn-sm w-25 text-style"
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
                Loading
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
