import strings from "./Strings"
import Expense from "./Expense"

const totalStyle= {
    display: "flex",
    flexDirection: "column",
    padding: "8px"
}


const Total = ({total}) => {
  return (
    <div style={totalStyle}>
        <Expense expenseName = {strings.income} value = {total.income}/>
        <Expense expenseName = {strings.expenses} value = {total.expenses}/>
        <Expense expenseName ={strings.available} value = {total.available}/>
    </div>
  )  
}

export default Total

