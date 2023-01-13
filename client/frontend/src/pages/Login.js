import React, { useState } from 'react'
import { login } from '../axios/Auth'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const submitHandler = () => {
    login(form)
    console.log(form)
  }
  return (
    <>
    <div className="mb-3">
      <label  className="form-label">Email address</label>
      <input type="email" onChange={(e) => setForm({...form, email: e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label  className="form-label">Password</label>
      <input type="password" onChange={(e) => setForm({...form, pasword: e.target.value})} className="form-control" id="exampleInputPassword1"></input>
    </div>
    <button type="submit" onClick={() => submitHandler()} className="btn btn-primary">Submit</button>
    </>
  )
}

export default Login