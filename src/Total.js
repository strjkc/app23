import strings from "./Strings"
import Expense from "./Expense"

const totalStyle= {
    display: "flex",
    flexDirection: "column",
    padding: "8px"
}


const Total = ({total, title}) => {
  return (
    <div style={totalStyle}>
        <div style={{fontSize: "20px", fontWeight: "bold"}}>{title}</div>
        <Expense expenseName = {strings.income} value = {total.income}/>
        <Expense expenseName = {strings.expenses} value = {total.expenses}/>
        <Expense expenseName ={strings.available} value = {total.available}/>
    </div>
  )  
}

export default Total

