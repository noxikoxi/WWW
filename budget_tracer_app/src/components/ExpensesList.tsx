import ExpenseItem from "./ExpenseItem.tsx";
import {AppContext} from "../context/AppContext.tsx";
import {useContext} from "react";

const ExpensesList = () => {

    const context = useContext(AppContext);

    return (
        <ul className="list-group">
            {context?.state.expenses.map((expense) => (
                <ExpenseItem id={expense.id} key={expense.id} name={expense.name} cost={expense.cost}/>
            ))}
        </ul>
    )
}

export default ExpensesList;