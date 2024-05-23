import React, {useState, useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";
import {Expense} from "./ExpenseItem.tsx";
import {v4 as uuidv4} from "uuid";

const AddExpenseForm = () => {
    const {addExpense} = useContext(AppContext);
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const expense : Expense = {
            name: name,
            cost: Number(cost),
            id: uuidv4()
        };

        addExpense(expense);
        setName("");
        setCost("");
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="name"> Name </label>
                    <input
                        required={true}
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    ></input>
                </div>
                <div className="col-sm">
                    <label htmlFor="Cost"> Cost </label>
                    <input
                        required={true}
                        type="number"
                        className="form-control"
                        id="cost"
                        value={cost}
                        onChange={(event) => setCost(event.target.value)}
                    ></input>
                </div>
                <div className="col-sm mt-2">
                    <button type="submit" className="btn btn-primary mt-3"> Save </button>
                </div>
            </div>
        </form>
    )

}

export default AddExpenseForm;