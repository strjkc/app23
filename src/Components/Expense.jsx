import '../CSS/Expense.css'

const Expense = ({expenseName, value}) => {
    return(
        <div style={{padding:"4px", display: "flex"}}>
            <div className={`expense_name ${expenseName}_name`}>{expenseName}</div>
            <div className={`expense_value ${expenseName}_value`}>{value}</div>
        </div>

    )
}

export default Expense