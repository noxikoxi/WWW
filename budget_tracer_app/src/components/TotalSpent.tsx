import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

const TotalSpent = () => {

    const {state} = useContext(AppContext);
    const totalExpenses = state.expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);

    return (
        <div className="p-4 alert alert-primary">
            <span>Spent so far: {totalExpenses}$</span>
        </div>
    )

}


export default TotalSpent;