import {useEffect, useRef, useState} from 'react'
import InputField from './InputField'
import strings from './Strings'
import Dropdown from './Dropdown'
import "./ExpenseEntry.css"
import EntryDatePicker from './EntryDatePicker'
import CheckBox from './CheckBox'
import { useWindowSize } from './Hooks'


const ExpenseEntry = ({changeExpenses, financialEntry, columnLayout, aditionalButton}) => {

    const [expNameState, setExpNameState] = useState(financialEntry ? financialEntry.name         : ""  )
    const [amount, setAmount]               = useState(financialEntry ? financialEntry.amount       : "" )
    const [expDate, setExpdate]             = useState(financialEntry ? financialEntry.endDate     : 0 )
    const [monthYear, setMonthYear]         = useState(financialEntry ? financialEntry.frequence    : 0 )
    const [expenseIncome, setExpenseIncome] = useState(financialEntry ? financialEntry.isExpense    : 0  )
    const [startDate, setStartDate]         = useState(financialEntry ? financialEntry.startDate    : "")
    const [isReocuring, setIsReocuring]     = useState(financialEntry ? financialEntry.isReocuring : false)
    const [noExpState, setExpState] = useState(false)
    const wrapperRef = useRef()
    const [width, height] = useWindowSize()

    useEffect(() => {
      if(startDate === ""){
        const currYear = new Date().getFullYear()
        const currMonth = new Date().getMonth()
        let month = 0
        if (currMonth / 10 < 1){
            month = `0${currMonth + 1}`
        }else{
          month = currMonth + 1
        }
        setStartDate(`${currYear}-${month}`)
        setExpdate(`${currYear}-${month}`)
      }
    }, [])

    //set state
    const changeExpNameState = (event) => {
        event.preventDefault()
        console.log("ref", wrapperRef.current.offsetWidth)
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
      const flexStyle = {display: "flex", flexDirection: columnLayout || "row"}
      if (wrapperRef.current){
        console.log(wrapperRef)
        flexStyle.flexDirection = wrapperRef.current.offsetWidth <= 500 ? "column" : "row"
        
      }

      console.log("width: ", width)

      if(width <= 500){
        columnLayout = true
      }

      


const mory = [{name: "Month", setState: setMonthOrYear}, {name: "Year", setState: setMonthOrYear}]
const exporin = [{name: "Income", setState: setExpenseOrIncome}, {name: "Expense", setState: setExpenseOrIncome}]

    return(
        <div className={"entry_wrapper"} ref={wrapperRef}>
            <div style={{height: "50px", padding: "8px", fontSize: "25px", color: "Black"}}>Unos:</div>
            <form onSubmit={postEntry}>
                <div style={{display:"grid", gridTemplateColumns: columnLayout ? "auto" : "50% 50%"}} className={"inputs-wrapper"} >
                <InputField placeholderText={strings.placeholderExpName} inputName={strings.expName} state={expNameState} setState={changeExpNameState}/>
                <InputField placeholderText={strings.placeholderAmount} inputName={strings.amount} state={amount} setState={changeAmountState}/>
                <Dropdown dropdownTitle={strings.monOrYear} state= {monthYear} options={mory}/>
                <Dropdown dropdownTitle={strings.type} state = {expenseIncome} options={exporin}/>
                <CheckBox inputName={strings.isReocuring} setState={populateIsReocuring} state={isReocuring}/>
                <CheckBox inputName={strings.noExpDate} setState={setMaxDate} state={noExpState}/>
                <EntryDatePicker state={startDate} setState={populateStartDate} dateText={strings.startDate}/>
                <EntryDatePicker state={expDate} setState={changeExpdateState} dateText={strings.expDate}/>
                </div>
                <div style={{display: "flex", padding: "8px", width: "100%", height: "30px",justifyContent: aditionalButton ? "space-around" : "center", alignItems: "center"}}>
                  <button style={{width: "25%", height: "30px", backgroundColor: "#817df7", outline: "none", border: "none", borderRadius: "5px", color: "#F7F9FA"}} type="submit">Save</button>  
                  {aditionalButton}
                </div>
            </form>
        </div>
    )

}

export default ExpenseEntry