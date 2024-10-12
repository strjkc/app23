import Expense from './Components/Expense'
import ExpensesList from './Components/ExpensesList'
import "./App.css"
import strings from './Localization/Strings'
import ExpenseEntry from './Components/ExpenseEntry'
import {createContext, useEffect, useState} from 'react'
import Total from './Components/Total'
import EntryDatePicker from './Components/EntryDatePicker'
import WrapperPannel from './Components/WrapperPannel'
import FolderView from './Components/FolderView'
import { useWindowSize } from './Helper/Hooks'
import InputField from './Components/InputField'
import transactions from './Services/transactions'
import {getCurrentDates} from "./Helper/helpers"
import Modal from './Components/Modal'


export const FormContext = createContext()

function App() {
  
  const [expensesList, setExpensesList] = useState([])
  const [monthTotals, setMonthTotals] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState([])
  const [selectedMonth, setSelectedMonth] = useState("")
  const [totals, setTotals] = useState([])
  const [showSavings, setShowSavings] = useState(false)
  const [showTotals, setShowTotals] = useState(false)
  const [activeButton, setActiveButton] = useState(0)
  const [activeButtonSavings, setActiveButtonSavings] = useState(0)
  const [width, height] = useWindowSize()
  const [savings, setSavings] = useState({})
  const [displayForm, setDisplayForm] = useState(false)
  const [form, setForm] = useState(null)



  useEffect(() => {
    (async function () {
      const [savingsData, expensesData] = await Promise.all([
        transactions.getSavings(),
        transactions.getExpenses()
      ])

      

    const saving = {
      currentSaving: Math.ceil(savingsData[0].currentSaving),
      totalSaved: Math.ceil(savingsData[0].totalSaved),
      percentToSave: savingsData[0].percentToSave
    }
    setSavings(saving)
    setExpensesList(expensesData)
    setSelectedMonth(getCurrentDates())
  })()
  },[])


  useEffect( () => {
    (async function () {
    const currMonth = new Date(selectedMonth).getMonth() || new Date().getMonth()
    const [totalsData, expensesData] = await Promise.all([
      transactions.getCurrTotals(currMonth), 
      transactions.getCurrExpenses(currMonth)
    ])    
    setMonthTotals(totalsData)
    setMonthlyExpenses(expensesData)
    })()
  },[selectedMonth])

  useEffect(  () => {
    (async function () {
    const data =  await transactions.getTotals()
    setTotals(data)
    })()
  }, [expensesList])


  const listOfExpenses = expensesList.filter(expense => Boolean(expense.isExpense))
  const listOfIncomes = expensesList.filter(expense => Boolean(!expense.isExpense))
  

  const postNewEntry = async (newEntry) => {
    const data = await transactions.postNewEntry(newEntry)
    const newList = expensesList.concat(data)
    setExpensesList(newList)
  }

  const putExistingEntry = async (changedEntry) => {
    const data = await transactions.putExistingEntry(changedEntry)
    const newExpenseList = expensesList.map(expense => expense.id !== data.id ? expense : data)
    setExpensesList(newExpenseList)
  }

  const removeExistingEntry = async (id) => {
    await transactions.removeExistingEntry(id)
    const newExpenses = expensesList.filter(expense => expense.id !== id)
    setExpensesList(newExpenses)
  } 

  const monthProjection = totals.map((total, index) => <><Total total={total} title={strings.months[index]}/></>)

const mainDatePickerData = {
  isEnabled: true,
  state: selectedMonth,
  setState: setSelectedMonth,
  name: strings.selectedMonth
}

const folderLeft = {
  button1Function: () => {setShowSavings(false); setActiveButtonSavings(0)},
  button2Function: () => {setShowSavings(true); setActiveButtonSavings(1)},
  buttonTabLeft: strings.folderButton3,
  buttonTabRight: strings.folderButton4,
  activeButton: activeButton
}

const folderRight = {
  button1Function: () => {setShowTotals(false); setActiveButton(0)},
  button2Function:() => {setShowTotals(true); setActiveButton(1)},
  buttonTabLeft: strings.folderTab1,
  buttonTabRight: strings.folderTab2,
  activeButton: activeButton
}

const savingsInputTotal = {
  state: savings.totalSaved, setState: setSavings, fieldLabel: "Saved percent",
   placeholderText: "Saved percent", componentId: "savings-total"
}

const savingsInputToSave = {
  state: savings.percentToSave, setState: setSavings, fieldLabel: "Saved percent",
   placeholderText: "Saved percent", componentId: "savings-percent"
}

//fieldLabel, state, setState, placeholderText, componentId


  return (
    <div className="App">
        <div style={{display: 'inline-block'}}>
        <button onClick={() => setDisplayForm(!displayForm)}>New Entry</button>
            {displayForm ?
            <Modal closeModal={() => {setDisplayForm(!displayForm); setForm(null)}}> 
              <ExpenseEntry  changeExpenses={postNewEntry} financialEntry={form}/> 
            </Modal>: <></>
            }
        </div>

          
        <div style={{display: 'flex', flexDirection:"row", justifyContent: 'space-around'}}>
          <WrapperPannel>
            <Expense expenseName={"Savings for current month:"} value={savings.currentSaving}/>
            <InputField data={savingsInputTotal}/>
            <InputField data={savingsInputToSave}/>
          </WrapperPannel>
          <WrapperPannel>
            <h3 style={{fontSize: "25px", height: "50px", padding: "8px", color: "black"}}>{strings.currenthMonthTotals}</h3>
            <EntryDatePicker data={mainDatePickerData}/> 
            <Total total={monthTotals}/>            
          </WrapperPannel>


        <WrapperPannel>
          <><div style={{fontSize: "25px", height: "50px", lineHeight: "50px", padding: "8px", color: "black"}}>{strings.projectionTitle}</div>
          <div>{monthProjection}</div></>
        </WrapperPannel>
        <WrapperPannel>
          <div  onClick={() => console.log("capture")} style={{display: "flex", flexDirection: width <= 500 ? "column" : "row"}}>
            <FormContext.Provider value={{displayForm, setDisplayForm, setForm}}>
              <ExpensesList expenses={listOfExpenses} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.expenseList} editable={true}/>
              <ExpensesList expenses={listOfIncomes} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.incomeList} editable={true}/>
            </FormContext.Provider>
          </div>
        </WrapperPannel>
        </div>
      </div>
    
  );
}

export default App;
