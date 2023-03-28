import Expense from './Expense'
import ExpensesList from './ExpensesList'
import "./App.css"
import strings from './Strings'
import ExpenseEntry from './ExpenseEntry'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {urlExpenses, urlTotals} from './config'


function App() {
  
  //TODO: Kad gradim newExpense moram da ispravim koje vrednosti ulaze u polja iz dropdowna, i datume
  
  

  
  
  const [expenses, setExpenses] = useState([])
  const [monthTotals, setMonthTotals] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [totals, setTotals] = useState([])
  const [showTotals, setShowTotals] = useState(true)

  useEffect(() => {
    axios.get(urlExpenses)
    .then(response => {
      console.log(response.data)
      setExpenses(response.data)
    })
  }, [])

  useEffect(() => {
    const currMonth = selectedMonth || new Date().getMonth()

    axios.get(`${urlTotals}/${currMonth}`)
    .then(response => {
      console.log(response.data)
      setMonthTotals(response.data)
    })
    axios.get(`${urlExpenses}/${currMonth}`)
    .then(response => {
      console.log(response.data)
      setMonthlyExpenses(response.data)
    })

  },[selectedMonth])

  useEffect(() => {
    axios.get(urlTotals)
    .then(response => {
      console.log(response.data)
      setTotals(response.data)
    })
  }, [expenses])


  const listOfExpenses = expenses.filter(expense => Boolean(expense.isExpense))
  const listOfIncomes = expenses.filter(expense => Boolean(!expense.isExpense))
  

  const postNewEntry = (newEntry, resetState) => {
    axios.post(urlExpenses, newEntry)
    .then( (response) => {
      console.log(`Response data new entry: ${response.data}`)
      const newList = expenses.concat(response.data)
      console.log(`New list`, newList) 
      setExpenses(newList)
      resetState()
    })
  }

  const putExistingEntry = (changedEntry, resetState) => {
    console.log("changed Entry:", changedEntry)
    const putUrl = `${urlExpenses}/${changedEntry.id}`
    console.log("PUT URL: ", putUrl)
    axios.put(putUrl, changedEntry)
    .then( (response) => {
      const newExpenseList = expenses.map(expense => expense.id !== response.data.id ? expense : response.data)
      setExpenses(newExpenseList)
      resetState(response.data)
    })
  }

  return (
    <div className="App">
      <div className={"left_pannel pannel"}>
        <div className={"left_pannel_item"}>
          <Expense expenseName = {strings.income} value = {monthTotals.income}/>
          <Expense expenseName = {strings.expenses} value = {monthTotals.expenses}/>
          <Expense expenseName ={strings.available} value = {monthTotals.available}/>
        </div>
        <ExpensesList expenses={monthlyExpenses} putEntry={putExistingEntry} listTitle={strings.expenseList} />
        <ExpenseEntry changeExpenses={postNewEntry} financialEntry={null}/>
      </div>
      <div className={"right_pannel pannel"} style={{flexDirection: "column"}}>
        { 
        showTotals ?
        totals.map(total =>         <div className={"left_pannel_item"}>

                  <Expense expenseName = {strings.income} value = {total.income}/>
          <Expense expenseName = {strings.expenses} value = {total.expenses}/>
          <Expense expenseName ={strings.available} value = {total.available}/>

        </div>)
        
        :       
        <>
        <ExpensesList expenses={listOfExpenses} putEntry={putExistingEntry} listTitle={strings.expenseList}/>
        <ExpensesList expenses={listOfIncomes} putEntry={putExistingEntry} listTitle={strings.incomeList}/>
        </>
}
      </div>
    </div>
    
  );
}

export default App;
