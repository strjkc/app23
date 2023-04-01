import ExpenseListItem from "./ExpenseListItem"
import "./ExpensesList.css"

const style={
    display: "flex",
    flexDirection: "column",
    width: "45%"
}

const ExpensesList = ({expenses, removeItem, listTitle, putEntry, editable}) => {
    //expense should be a list of objects with expenseName and value properties

    return(
        <div style={style}>
            <div style={{padding: "8px", fontSize: "25px", height:"50px", lineHeight:"50px"}} className={`expenses_list_title ${listTitle}_title`}>{listTitle}</div>
            {expenses.map(expense => <ExpenseListItem key={expense.id} textColor={"#F7F9FA"} removeItem={removeItem} putEntry={putEntry} expense= {expense} editable={editable}/>) }
        </div>
    )
}

export default ExpensesList