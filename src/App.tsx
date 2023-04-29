import { useContext, useState } from 'react'
import './App.css'
import { ExpenseList } from './components/ExpenseList'
// import interfaces
import ExpenseTracker from './interfaces/expenseList'
import expense from './interfaces/expense'

// import the expense form component
import ExpenseForm from './components/expenseForm'

function App() {
  const [expenses, setExpenses] = useState<ExpenseTracker>({ expenses: [] })
  const addExpense = (expense: expense) => {
    setExpenses({ expenses: [...expenses.expenses, expense] })
  }
  const removeExpense = (id: number) => {
    setExpenses({ expenses: expenses.expenses.filter(expense => expense.id !== id) })
  }


  return (
    <>
      <div className='flex items-center justify-center w-full h-screen overflow-auto bg-slate-700'>
        <div id='trackerHolder' className='grid w-1/2 rounded-lg shadow-lg bg-slate-300 h-1/2'>
          <h1 className='col-start-1 text-4xl font-bold text-gray-800'>Expense Tracker</h1>
          <ExpenseForm addExpense={addExpense} />
          <ExpenseList removeExpense={removeExpense} expenses={expenses} />
        </div>
      </div>
    </>
  )
}

export default App
