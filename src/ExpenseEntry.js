import {useState} from 'react'
import InputField from './InputField'
import strings from './Strings'
import Dropdown from './Dropdown'
import "./ExpenseEntry.css"
import EntryDatePicker from './EntryDatePicker'

const ExpenseEntry = ({changeExpenses, financialEntry}) => {

    const [expNameState, setExpNameState] = useState(financialEntry ? financialEntry.name         : ""  )
    const [amount, setAmount]               = useState(financialEntry ? financialEntry.amount       : ""  )
    const [expDate, setExpdate]             = useState(financialEntry ? financialEntry.endDate     : ""  )
    const [monthYear, setMonthYear]         = useState(financialEntry ? financialEntry.frequence    : 0 )
    const [expenseIncome, setExpenseIncome] = useState(financialEntry ? financialEntry.isExpense    : 0  )
    const [startDate, setStartDate]         = useState(financialEntry ? financialEntry.startDate    : ""  )
    const [isReocuring, setIsReocuring]     = useState(financialEntry ? financialEntry.isReocuring : false)
    const [noExpState, setExpState] = useState(false)

    //set state
    const changeExpNameState = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setExpNameState(event.target.value)
      }
    
      const changeAmountState = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setAmount(event.target.value)
      }
    
      const changeExpdateState = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setExpdate(event.target.value)
      }

      const setMonthOrYear = (event) => {
          event.preventDefault()
          console.log(event.target.value)
          setMonthYear(event.target.value)
      }

      const setExpenseOrIncome = (event) => {
          event.preventDefault()
          console.log(event.target.value)
          setExpenseIncome(event.target.value)
      }

      const populateStartDate = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setStartDate(event.target.value)
      }

      const populateIsReocuring = (event) => {
        console.log(event.target.checked)
        setIsReocuring(event.target.checked)
        console.log(isReocuring)

      }

      const setMaxDate = (event) => {
        if(event.target.checked){
          setExpdate("9999-12")
        }else{
          setExpdate("")
        }
      }

      const resetState = (financialEntry) => {
        setExpNameState(financialEntry ? financialEntry.name         : ""  )
        setAmount      (financialEntry ? financialEntry.amount       : ""  )
        setExpdate     (financialEntry ? financialEntry.endDate     : ""  )
        setMonthYear   (financialEntry ? financialEntry.frequence    : 0  )
        setExpenseIncome(financialEntry ? financialEntry.isExpense    : 0  )
        setStartDate   (financialEntry ? financialEntry.startDate    : ""  )
        setIsReocuring (financialEntry ? financialEntry.isReocuring : false)
      }

      //post state
      const postEntry = (event) => {
            event.preventDefault()
            const newEntry = {
                id: financialEntry ? financialEntry.id : null,
                name: expNameState,
                amount: Number(amount),
                endDate: expDate,
                isExpense: Number(expenseIncome),
                startDate: startDate,
                isReocuring: isReocuring,
                frequence: Number(monthYear)
            }
            console.log("New entry is:", newEntry)
            changeExpenses(newEntry, resetState)

      }

   


const mory = [{name: "Month", setState: setMonthOrYear}, {name: "Year", setState: setMonthOrYear}]
const exporin = [{name: "Income", setState: setExpenseOrIncome}, {name: "Expense", setState: setExpenseOrIncome}]

    return(
        <div className={"entry_wrapper"}>
            <div>Unos:</div>
            <form onSubmit={postEntry}>
                <InputField inputName={strings.expName} state={expNameState} setState={changeExpNameState} isCheckbox={false}/>
                <InputField inputName={strings.amount} state={amount} setState={changeAmountState} isCheckbox={false}/>
                <Dropdown dropdownTitle={"Is ti a yearly or monthy expense"} state= {monthYear} options={mory}/>
                <Dropdown dropdownTitle={"Is ti an expense or an income"} state = {expenseIncome} options={exporin}/>
                <InputField inputName={strings.isReocuring} setState={populateIsReocuring} state={isReocuring} isCheckbox={true}/>
                <EntryDatePicker state={startDate} setState={populateStartDate} dateText={"Start date of the expense"}/>
                <div>
                  <EntryDatePicker state={expDate} setState={changeExpdateState} dateText={strings.expDate}/>
                  <p>No expiration date</p>
                  <input type="checkbox" onChange={setMaxDate}></input>
                </div>
                <button type="submit">Save</button>  
            </form>
        </div>
    )

}

export default ExpenseEntry