import strings from "../Localization/Strings"
import Expense from "./Expense"
import "../CSS/Total.css"


const Total = ({total}) => {
  return (
    <div className="totals-wrapper">
        <Expense expenseName = {strings.income} value = {total.income}/>
        <Expense expenseName = {strings.expenses} value = {total.expenses}/>
        <Expense expenseName ={strings.available} value = {total.available}/>
    </div>
  )  
}

export default Total

