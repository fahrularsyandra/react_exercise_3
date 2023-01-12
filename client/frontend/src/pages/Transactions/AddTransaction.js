import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { create } from '../../axios/Transaction';

const AddTransaction = () => {
  const [form, setForm] = useState({
    description: "",
    debt_id: null,
    amount: 0,
    status: 0,
    payDebt: false,
    income: false,
    outcome: false
  })
  const navigate = useNavigate()

  const submitHandler = () => {
    if(form.payDebt){
      create({
        description: form.description,
        debt_id: form.debt_id,
        amount: form.amount,
        status: 1,
      })
    }
    else if(form.income){
      create({
        description: form.description,
        debt_id: null,
        amount: form.amount,
        status: 0,
      })
    }
    else {
      create({
        description: form.description,
        debt_id: null,
        amount: form.amount,
        status: 1,
      })
    }
    navigate(-1)
    console.log(form);
  }

  return (
      <>
        <div className="mb-3">
          <label  className="form-label">Description</label>
          <input type="text" onChange={(e) => setForm({...form, description: e.target.value})} className="form-control" id="descInput" aria-describedby="textHelp" required></input>
        </div>
        <div className="form-check form-check-inline mb-3">
          <input onChange={(e) => setForm({...form, payDebt: e.target.checked})} checked={form.payDebt} className="form-check-input" type="checkbox" id="inlineCheckbox1" value="1"></input>
          <label className="form-check-label" >Pay Debt</label>
        </div>
        {(form.payDebt)? <div className="mb-3">
          <label  className="form-label">Debt ID</label>
          <input type="text" onChange={(e) => setForm({...form, debt_id: e.target.value})} className="form-control" id="amountInput" required></input>
        </div>: <div></div>}
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="text" onChange={(e) => setForm({...form, amount: e.target.value})} className="form-control" id="amountInput" required></input>
        </div>
        {
          (!form.payDebt)
            ? <div className="form-check form-check-inline">
                <input className="form-check-input" onChange={(e) => setForm({...form, income: e.target.checked})} checked={form.income} type="checkbox" id="inlineCheckbox1" value="1"></input>
                <label className="form-check-label" >Income</label>
              </div>
            : <div></div>
        }
        
        <div className="form-check form-check-inline">
          <input className="form-check-input" onChange={(e) => setForm({...form, outcome: e.target.checked})} checked={form.outcome}  type="checkbox" id="inlineCheckbox2" value="2"></input>
          <label className="form-check-label" >Outcome</label>
        </div>
        <div className='mt-3'>
          <button onClick={() => submitHandler()} className="btn btn-primary">Submit</button>
        </div>
        
      </>
    
  )
}

export default AddTransaction