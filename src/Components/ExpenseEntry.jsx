import { useEffect, useState } from 'react'
import InputField from './InputField'
import strings from '../Localization/Strings'
import Dropdown from './Dropdown'
import "../CSS/ExpenseEntry.css"
import EntryDatePicker from './EntryDatePicker'
import CheckBox from './CheckBox'
import Button from './Button'
import {getCurrentDates} from "../Helper/helpers"


const ExpenseEntry = ({ changeExpenses, financialEntry }) => {

  const [transactionName, setTransactionName] = useState(financialEntry?.name || "")
  const [transactionAmount, setTransactionAmount] = useState(financialEntry?.amount || "")
  const [endDate, setEndDate] = useState(financialEntry?.endDate || "")
  const [monthYear, setMonthYear] = useState(financialEntry?.frequence || 0)
  const [expenseIncome, setExpenseIncome] = useState(financialEntry?.isExpense || 0)
  const [startDate, setStartDate] = useState(financialEntry?.startDate || "")
  const [isOnetime, setIsOnetime] = useState(financialEntry?.isReocuring || false)
  const [currDate, setCurrDate] = useState("")
  const [noExpState, setExpState] = useState(false)

  useEffect(() => {
    const currentDate = getCurrentDates()
    setStartDate(currentDate)
    setCurrDate(currentDate)
    setEndDate(currentDate) 
    
  }, [])



  const populateStartDate = (value) => {
    if (isOnetime) {
      setStartDate(value)
      setEndDate(value)
    } else {
      setStartDate(value)
    }
  }

  const setMaxDate = (checked) => {
    if (checked) {
      setEndDate("9999-12")
      setExpState(true)
    } else {
      setEndDate(currDate)
      setExpState(false)
    }
  }

  const resetState = () => {
    setTransactionName("")
    setTransactionAmount("")
    setEndDate("")
    setMonthYear(0)
    setExpenseIncome(0)
    setStartDate("")
    setIsOnetime(false)
    getCurrentDates()
  }

  //post state
  const postEntry = async (event) => {
    event.preventDefault()
    const newEntry = {
      name: transactionName,
      amount: Number(transactionAmount),
      endDate: endDate,
      isExpense: Number(expenseIncome),
      startDate: startDate,
      isReocuring: !isOnetime,
      frequence: Number(monthYear)
    }
    await changeExpenses(newEntry)
    resetState()

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

  const endDatePickerData = {
    isDisabled:
      isOnetime,
    state: endDate,
    setState: setEndDate,
    name: strings.expDate
  }

  const transAmountInputData = {
    state: transactionAmount, setState: setTransactionAmount, fieldLabel: strings.transAmountLabel,
    placeholderText: strings.transAmountPlaceholder, componentId: "trans-amount"
  }

  const transNameInputData = {
    state: transactionName, setState: setTransactionName, fieldLabel: strings.transNameLabel,
    placeholderText: strings.transNamePlaceholder, componentId: "trans-name"
  }


  return (
      <div className={"entry-wrapper-inner"} onClick={e => e.stopPropagation()}>
      <h3>{strings.entryTitle}</h3>
      <form onSubmit={postEntry}>
        <div className={"inputs-wrapper"} >
          <InputField data={transNameInputData} />
          <InputField data={transAmountInputData} />
          <Dropdown data={occurenceData} />
          <Dropdown data={transTypeData} />
          <CheckBox data={reccuringCheckData} />
          <CheckBox data={indefiniteCheckData} />
          <EntryDatePicker data={startDatePickerData} />
          <EntryDatePicker data={endDatePickerData} />
        </div>
        <div id="form-button-wrapper">
          <Button buttonType={"sumbit"} buttonText={"Save"} />
          {financialEntry && <Button buttonType={"sumbit"} buttonText={"Delete"}></Button>}
        </div>
      </form>
      </div>
  )

}

export default ExpenseEntry