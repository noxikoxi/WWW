import React, {useContext, useState} from "react";
import {AppContext} from "../context/AppContext.tsx";

type Props = {
    setIsEditing: (val: boolean) => void;
}

const EditBudget = ({setIsEditing} : Props) => {

    const {changeBudget, state} = useContext(AppContext);
    const [value, setValue] = useState("");


    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        changeBudget(Number(value));
        setIsEditing(false);
    }

    return (
        <div className="fixed-top d-flex bg-black bg-opacity-75 p-4 h-100">
            <div id="popup" className="d-flex align-items-center position-fixed top-50 start-50 translate-middle bg-primary rounded-3 w p-4">
                <button id="closeButton" type="button" className="btn btn-danger" onClick={() => setIsEditing(false)}> Close</button>
                <div className="container w-100">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="pb-1 p-0 text-white" htmlFor="budget">Budget</label>
                        </div>
                        <div className="d-flex flex-1 flex-column flex-md-row justify-content-lg-evenly gap-2">
                            <div className="col-sm">
                                <input
                                    required={true}
                                    type="number"
                                    className="form-control"
                                    id="budget"
                                    value ={value}
                                    placeholder={String(state.budget)}
                                    onChange={(event) => setValue(event.target.value)}
                                ></input>
                            </div>
                        <div>
                            <button type="submit" className="btn btn-warning"> Save</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditBudget;