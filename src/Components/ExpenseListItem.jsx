import "../CSS/ExpenseListItem.css"
import ExpenseEntry from "./ExpenseEntry"
import { useContext, useState } from "react"
import Button from "./Button"
import { FormContext } from "../App"

const ExpenseListItem = ({expense, putEntry, removeItem, editable, textColor}) => {
    const style={
        display: "flex",
        padding:"8px 8px",
        color: editable ? textColor : "black"
    }

    const [displayEdit, setDisplayEdit] = useState(false)
    const {displayForm, setDisplayForm, setForm} = useContext(FormContext)

    const toggleDisplayEdit = () => {
        if(editable)
            displayEdit ? setDisplayEdit(false) : setDisplayEdit(true)
    }

    const handleWrapperClick = () => {
        setDisplayForm(!displayForm)
        setForm(expense)
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
        </div>
    )
}

export default ExpenseListItem