import React from 'react'
import Expense from '../interfaces/expense'
// import the react hook form
import { useForm } from 'react-hook-form'
// import zod for validation
import * as z from 'zod'
// create a schema for the form
const schema = z.object({
    description: z.string().min(1).max(100),
    amount: z.number().min(1),
    category: z.string().min(1).max(100)
})

// create a type for the schema
type ExpenseSchema = z.infer<typeof schema>

// create a type for the props
interface Props {
    addExpense: (expense:Expense) => void
}
const ExpenseForm = (props: Props) => {


// use the react hook form to handle the form submission
const { register } = useForm()
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const expense: Expense = {
        description: form.description.value,
        amount: form.amount.value,
        category: form.category.value
    }
    props.addExpense(expense)
    form.reset()
}


  return (
    <>
        <form onSubmit={handleSubmit} action="submit" className='grid w-full col-start-1 gap-8 p-8 rounded-lg '>
            <div className='grid items-center justify-center grid-cols-2'>
                <label htmlFor="description">Description</label>
                <input className="p-2 rounded-lg" type="text" name="description" id="description" required />
            </div>
            <div className='grid items-center justify-center grid-cols-2'>
                <label htmlFor="amount">Amount</label>
                <input className='p-2 rounded-sm' type="number" name="amount" id="amount" required min={1}/>
            </div>
            <div className='grid items-center justify-center grid-cols-2'>
                <label htmlFor="category">Category</label>
                <select className='p-2 rounded-md' name="category" id="category" required>
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Misc">Misc</option>
                </select>
            </div>
            <div className='grid justify-end'>
                <button className='px-3 py-2 font-semibold text-white rounded-lg bg-slate-800' type="submit">Add Expense</button>
            </div>

        </form>
    </>
  )
}
export default ExpenseForm