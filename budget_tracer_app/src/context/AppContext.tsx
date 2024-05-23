import React, {createContext, useReducer} from "react";
import {Expense} from "../components/ExpenseItem.tsx";

type State = {
    budget: number,
    expenses: Expense[]
}

type BudgetContext = {
    state: State,
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    changeBudget: (value: number) => void;
}

type Action =
    { type: 'ADD_EXPENSE'; payload : Expense } |
    { type: 'REMOVE_EXPENSE'; payload: string } |
    { type: 'CHANGE_BUDGET'; payload: number }


const AppReducer = (state : State, action: Action) => {
    switch (action.type){
        case 'CHANGE_BUDGET':
            return {
                ...state,
                budget: action.payload
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };

        case 'REMOVE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id != action.payload)
            };



        default:
            return state;
    }
}

const initialState : State = {
    budget: 0,
    expenses: [
    ]
}

const initialContext : BudgetContext = {
    addExpense(): void {
    },
    removeExpense(): void {
    },
    changeBudget(): void {
    },
    state: initialState
}

export const AppContext = createContext<BudgetContext>(initialContext);

type AppProviderProps = {
    children : React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({children})  => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const addExpense = (expense: Expense) => {
        dispatch({type: "ADD_EXPENSE", payload: expense});
    };

    const removeExpense = (id: string) => {
        dispatch({type: "REMOVE_EXPENSE", payload: id});
    };

    const changeBudget = (value: number) => {
        dispatch({type: "CHANGE_BUDGET", payload: value});
    };

    return(<AppContext.Provider value={{
        state,
        addExpense,
        removeExpense,
        changeBudget

    }}>
    {children}
    </AppContext.Provider>)
}