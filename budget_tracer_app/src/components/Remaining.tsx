import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

const Remaining = () => {

    const {state} = useContext(AppContext);
    const totalExpenses = state.expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);

    return (
        <div className="p-4 alert alert-success">
            <span>Remaining: {state.budget-totalExpenses}$</span>
        </div>
    )

}


export default Remaining;