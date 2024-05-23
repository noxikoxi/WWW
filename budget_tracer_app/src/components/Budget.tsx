import {AppContext} from "../context/AppContext.tsx";
import {useContext} from "react";

type Props = {
    setIsEditing: (val : boolean) => void;
}
const Budget = ({setIsEditing} : Props) => {
    const {state} = useContext(AppContext);
    return (
        <div className="d-flex justify-content-between align-items-center alert alert-secondary">
            <span>Budget: {state.budget}$</span>
            <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
            >
                Edit</button>
        </div>
    )
}

export default Budget;