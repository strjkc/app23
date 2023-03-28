import ExpenseListItem from "./ExpenseListItem"
import "./ExpensesList.css"

const ExpensesList = ({expenses, listTitle, putEntry}) => {
    //expense should be a list of objects with expenseName and value properties

    return(
        <div className={"expenses_list_wrapper"}>
            <div className={`expenses_list_title ${listTitle}_title`}>{listTitle}:</div>
            {expenses.map(expense => <ExpenseListItem key={expense.id} putEntry={putEntry} expense= {expense}/>) }
        </div>
    )
}

export default ExpensesList