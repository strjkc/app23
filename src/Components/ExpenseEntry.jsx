import {useEffect, useRef, useState} from 'react'
import InputField from './InputField'
import strings from '../Localization/Strings'
import Dropdown from './Dropdown'
import "../CSS/ExpenseEntry.css"
import EntryDatePicker from './EntryDatePicker'
import CheckBox from './CheckBox'
import { useWindowSize } from '../Helper/Hooks'
import Button from './Button'


const ExpenseEntry = ({changeExpenses, financialEntry, columnLayout, aditionalButton}) => {

    const [transactionName, setTransactionName] = useState(financialEntry ? financialEntry.name         : ""  )
    const [transactionAmount, setTransactionAmount]               = useState(financialEntry ? financialEntry.amount       : "" )
    const [expDate, setExpdate]             = useState(financialEntry ? financialEntry.endDate     : "" )
    const [monthYear, setMonthYear]         = useState(financialEntry ? financialEntry.frequence    : 0 )
    const [expenseIncome, setExpenseIncome] = useState(financialEntry ? financialEntry.isExpense    : 0  )
    const [startDate, setStartDate]         = useState(financialEntry ? financialEntry.startDate    : "")
    const [isOnetime, setIsOnetime]     = useState(financialEntry ? financialEntry.isReocuring : false)
    const [currDate, setCurrDate] = useState("")
    const [noExpState, setExpState] = useState(false)
    const wrapperRef = useRef()
    const [width, height] = useWindowSize()

    useEffect(() => {
      getCurrentDates()
    }, [])

    const getCurrentDates = () => {
      if(startDate === ""){
        const currYear = new Date().getFullYear()
        //January is 0
        const currMonth = new Date().getMonth()
        const month = currMonth < 9 ? `0${currMonth + 1}` : `${currMonth + 1}`
        const dateToSet = `${currYear}-${month}`
        setCurrDate(dateToSet)
        setStartDate(dateToSet)
        setExpdate(dateToSet)
      }
    }

      const populateStartDate = (value) => {
        if(isOnetime){
          setStartDate(value)
          setExpdate(value)  
        }else{
          setStartDate(value)
        }
      }

      const setMaxDate = (checked) => {
        if(checked){
          setExpdate("9999-12")
          setExpState(true)
        }else{
          setExpdate(currDate)
          setExpState(false)
        }
      }

      const resetState = (financialEntry) => {
        setTransactionName(financialEntry ? financialEntry.name         : ""  )
        setTransactionAmount      (financialEntry ? financialEntry.amount       : ""  )
        setExpdate     (financialEntry ? financialEntry.endDate     : ""  )
        setMonthYear   (financialEntry ? financialEntry.frequence    : 0  )
        setExpenseIncome(financialEntry ? financialEntry.isExpense    : 0  )
        setStartDate   (financialEntry ? financialEntry.startDate    : ""  )
        setIsOnetime (financialEntry ? financialEntry.isReocuring : false)
        getCurrentDates()
      }

      //post state
      const postEntry = async (event) => {
            event.preventDefault()
            const newEntry = {
                id: financialEntry ? financialEntry.id : null,
                name: transactionName,
                amount: Number(transactionAmount),
                endDate: expDate,
                isExpense: Number(expenseIncome),
                startDate: startDate,
                isReocuring: !isOnetime,
                frequence: Number(monthYear)
            }
            await changeExpenses(newEntry)
            resetState()

      }
      const flexStyle = {display: "flex", flexDirection: columnLayout || "row"}
      if (wrapperRef.current){

        flexStyle.flexDirection = wrapperRef.current.offsetWidth <= 500 ? "column" : "row"
        
      }


      if(width <= 500){
        columnLayout = true
      }


    /*
    Data objects and structures for passing to props
    */

      const occurenceOptions = [strings.occurenceOption1, strings.occurenceOption2]
      const typeOptions = [strings.typeOption1, strings.typeOption2]

      const occurenceData = {
        options: occurenceOptions,
        setState: setMonthYear,
        state: monthYear,
        title: strings.monOrYear
      } 

      const transTypeData = {
        options: typeOptions,
        setState: setExpenseIncome,
        state: expenseIncome,
        title: strings.type
      } 

      const reccuringCheckData = {
        name: strings.isReocuring,
        state: isOnetime,
        setState: setIsOnetime
      }

      const indefiniteCheckData = {
        name: strings.noExpDate,
        state: noExpState,
        setState: setMaxDate
      }

      const startDatePickerData = {
        //this should allways be enabled - true
        isDisabled: false,
        state: startDate,
        setState: populateStartDate,
        name: strings.startDate
      }

      const ednDatePickerData = {
        isDisabled: 
        isOnetime,
        state: expDate,
        setState: setExpdate,
        name: strings.expDate
      }

      const transAmountInputData = {
        transactionAmount, setState: setTransactionAmount, fieldLabel: strings.transAmountLabel, 
        placeholderText: strings.transAmountPlaceholder, componentId: "trans-amount"
      }

      const transNameInputData = {
        transactionName, setState: setTransactionName, fieldLabel: strings.transNameLabel,
         placeholderText: strings.transNamePlaceholder, componentId: "trans-name"
      }


    return(
        <div className={"entry_wrapper"} ref={wrapperRef}>
            <div>{strings.entryTitle}</div>
            <form onSubmit={postEntry}>
                <div className={"inputs-wrapper"} >
                  <InputField data={transNameInputData}/>
                  <InputField data={transAmountInputData}/>
                  <Dropdown data={occurenceData}/>
                  <Dropdown data={transTypeData}/>
                  <CheckBox data={reccuringCheckData}/>
                  <CheckBox data={indefiniteCheckData}/>
                  <EntryDatePicker data={startDatePickerData}/>
                  <EntryDatePicker data={ednDatePickerData}/>
                </div>
                <div style={{display: "flex", padding: "8px", width: "100%", height: "30px",justifyContent: aditionalButton ? "space-around" : "center", alignItems: "center"}}>
                <Button buttonType={"sumbit"} buttonText = {"Save"}/>
                  {aditionalButton}
                </div>
            </form>
        </div>
    )

}

export default ExpenseEntry