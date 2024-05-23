import 'bootstrap/dist/css/bootstrap.min.css'
import Budget from "./components/Budget.tsx";
import ExpensesList from "./components/ExpensesList.tsx";
import AddExpenseForm from "./components/AddExpenseForm.tsx";
import {AppProvider} from "./context/AppContext.tsx"
import Remaining from "./components/Remaining.tsx";
import TotalSpent from "./components/TotalSpent.tsx";
import EditBudget from "./components/EditBudget.tsx";
import {useState} from "react";
const App = () => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <AppProvider>
            <div className="container">
                <h1 className="mt-3">My Budget Planner </h1>
                <div className="row mt-3">
                    <div className="col-sm">
                        <Budget setIsEditing={setIsEditing}/>
                    </div>
                    <div className="col-sm">
                        <Remaining/>
                    </div>
                    <div className="col-sm">
                        <TotalSpent/>
                    </div>
                </div>
                <h3 className="mt-3 fs-1">Expenses</h3>
                <div className="row mt-3">
                    <div className="col-sm">
                        <ExpensesList/>
                    </div>
                </div>
                <h3 className="mt-3 fs-1">Add Expense</h3>
                <div className="row mt-3">
                    <div className="col-sm">
                        <AddExpenseForm/>
                    </div>
                </div>
            </div>
            {isEditing && (<EditBudget setIsEditing={setIsEditing}/>)}
        </AppProvider>
    )
}

export default App;