import "./ExpenseListItem.css"
import ExpenseEntry from "./ExpenseEntry"
import { useState } from "react"

const ExpenseListItem = ({expense, putEntry}) => {
    const [displayEdit, setDisplayEdit] = useState(false)

    const toggleDisplayEdit = () => {
        displayEdit ? setDisplayEdit(false) : setDisplayEdit(true)
    }

    const handleWrapperClick = () => {
        toggleDisplayEdit()
    }
    
    return(
        <div className={"expense_li_item_wrapper"}>
            
            <div onClick={handleWrapperClick}>
                <div className={"expense_li_name"}>{expense.name}:</div>
                <div className={"expense_li_value"}>{expense.amount}</div>
            </div>
            {
            displayEdit ? 
                <ExpenseEntry changeExpenses={putEntry} financialEntry={expense}/>
            :<></>
            }
        </div>
    )
}

export default ExpenseListItem