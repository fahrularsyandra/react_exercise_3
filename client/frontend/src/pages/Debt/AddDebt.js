import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from '../../axios/Debt'

const AddDebt = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
      description: "",
      debt_id: null,
      amount: 0,
      status: 0,
      payDebt: false,
      income: false,
      outcome: false
    })

    const submitHandler = () => {
          create({
            description: form.description,
            amount: form.amount,
            staus: 1
          })
        navigate('/debts')
        console.log(form);
      }
  return (
    <>
        <div className="mb-3">
        <label  className="form-label">Description</label>
        <input type="text" onChange={(e) => setForm({...form, description: e.target.value})} className="form-control" id="descInput" aria-describedby="textHelp" ></input>
        </div>
        <div className="mb-3">
        <label className="form-label">Amount</label>
        <input type="text" onChange={(e) => setForm({...form, amount: e.target.value})} className="form-control" id="amountInput" ></input>
        </div>
        <div className='mt-3'>
        <button onClick={() => submitHandler()} className="btn btn-primary">Submit</button>
        </div>
    </>
          
      
  )
}

export default AddDebt