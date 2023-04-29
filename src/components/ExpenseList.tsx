import React from 'react'
import { useState } from 'react'
import Expense from '../interfaces/expense'
import ExpenseTracker from '../interfaces/expenseList'
import "./ExpenseList.css"

interface Props {
    expenses: ExpenseTracker
    removeExpense: (id: string) => void
}
// use ref to refer to the select element in the form
const categoryRef = React.createRef<HTMLSelectElement>()

export const ExpenseList = ({expenses, removeExpense}:Props) => {
    // wrap the remove expense function in a function that gets the id from the event target data-id attribute
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id as string
        removeExpense(id)
    }

    const selectorState = useState('all')
    const [selector, setSelector] = selectorState
    // create a function to handle the change in the select element
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelector(event.target.value)
    }

  return (
    <div className='grid h-full grid-cols-1 col-start-2 grid-rows-6 gap-4 row-span-full'>
    <h2 className='text-3xl font-bold'>Expense List</h2>
    {/* a table to hold expenses*/}
    <table className='w-full'>
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th><select ref={categoryRef} onChange={handleChange} name="category" id="category">
                    <option value="all">All</option>
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Misc">Misc</option>
                </select>
                </th>
            </tr>
        </thead>
        <tbody>
            {/* filter the expenses list to match the value selected in the categoryref */}
            {expenses.expenses.filter(expense => {
                if (selector === 'all') {
                    return true
                } else {
                    return expense.category == selector}}).map((expense, index) => (
                <tr key={index}>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td><button data-id={expense.id} onClick={handleRemove} className='px-4 py-3 text-xl font-semibold text-white bg-red-500 rounded-lg hover:scale-105 hover:bg-red-600'>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}
