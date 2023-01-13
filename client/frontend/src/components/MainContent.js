import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Debt, HomePage, Income, Transaction } from '../pages'
import AddDebt from '../pages/Debt/AddDebt'
import PayDebt from '../pages/Debt/PayDebt'
import Login from '../pages/Login'
import AddTransaction from '../pages/Transactions/AddTransaction'

const MainContent = () => {
  return (
        <div className='container p-3'>
            <Routes>
                <Route path='/' element={<Login/>} />
                {/* <Route path='/login' element={<Login/>} /> */}
                <Route path='/debts' element={<Debt/>} />
                <Route path='/debts/add' element={<AddDebt/>} />
                <Route path='/debts/pay/:debt_id/:description/:total' element={<PayDebt/>} />
                <Route path='/transactions' element={<Transaction/>} />
                <Route path='/transactions/add' element={<AddTransaction/>} />
                <Route path='/incomes' element={<Income/>} />
            </Routes>  
        </div>
  )
}

export default MainContent