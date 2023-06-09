import "./ExpenseListItem.css"
import ExpenseEntry from "./ExpenseEntry"
import { useState } from "react"
import axios from "axios"
import {urlExpenses} from './config'
import Button from "./Button"


const ExpenseListItem = ({expense, putEntry, removeItem, editable, textColor}) => {
    const style={
        display: "flex",
        padding:"8px 8px",
        color: editable ? textColor : "black"
    }

    const [displayEdit, setDisplayEdit] = useState(false)

    const toggleDisplayEdit = () => {
        if(editable)
            displayEdit ? setDisplayEdit(false) : setDisplayEdit(true)
    }

    const handleWrapperClick = () => {
        toggleDisplayEdit()
    }
    const wrapperStyle = {display: "flex",
        background: editable ?  "#817df7" : "inherit",
        padding: editable ? "8px" : "0px",
        borderRadius: editable ? displayEdit ? "8px 8px 0 0" : "8px" : "0px"}

    
    return(
        <div className={"expense_li_item_wrapper"} style={style}>
            
            <div style={wrapperStyle} onClick={handleWrapperClick}>
                <div className={"expense_li_name"}>{expense.name}:</div>
                <div className={"expense_li_value"}>{expense.amount}</div>
            </div>
            {
            displayEdit ?
                <div style={{ boxShadow: editable ? "rgb(129, 125, 247) 1px 8px 17px -2px" : "none", padding: editable ? "8px" : "0px", borderRadius: editable ? displayEdit ? "0 0 8px 8px" : "8px" : "0px"}}>
                <ExpenseEntry changeExpenses={putEntry} financialEntry={expense} columnLayout={true} aditionalButton={
                    <Button buttonOnClick={(e) => removeItem(expense.id)}
                            buttonType={"submit"}
                            buttonText={"Obrisi"}
                    />}/>
                </div>
            :<></>
            }
        </div>
    )
}

export default ExpenseListItem