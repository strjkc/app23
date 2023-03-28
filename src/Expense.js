import './Expense.css'

const Expense = ({expenseName, value}) => {
    return(
        <div className={`${expenseName}_wrapper expense_wrapper`}>
            <div className={`expense_name ${expenseName}_name`}>{expenseName}:</div>
            <div className={`expense_value ${expenseName}_value`}>{value}</div>
        </div>

    )
}

export default Expense