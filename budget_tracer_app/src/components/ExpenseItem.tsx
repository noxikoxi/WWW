import {TiDelete} from 'react-icons/ti';
import {AppContext} from "../context/AppContext.tsx";
import {useContext} from "react";

export type Expense = {
    id: string,
    name: string,
    cost: number
}

const ExpenseItem = (expense : Expense) => {

    const {removeExpense} = useContext(AppContext);

    return (
        <li className="p-1 list-group-item d-flex justify-content-between align-items-center">
            <span className="ps-2 fw-bold">{expense.name}</span>
            <div>
                <span className="badge text-bg-primary m-3 fs-6">
                    {expense.cost}$
                </span>
                <TiDelete style={{cursor: 'pointer'}} size="2.0em" color="red" onClick={() => removeExpense(expense.id)}></TiDelete>
            </div>
        </li>
    )

}

export default ExpenseItem;