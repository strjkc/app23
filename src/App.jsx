import Expense from './Components/Expense'
import ExpensesList from './Components/ExpensesList'
import "./App.css"
import strings from './Localization/Strings'
import ExpenseEntry from './Components/ExpenseEntry'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {urlExpenses, urlTotals, urlSavings} from './Config/config'
import Total from './Components/Total'
import EntryDatePicker from './Components/EntryDatePicker'
import WrapperPannel from './Components/WrapperPannel'
import FolderView from './Components/FolderView'
import { useWindowSize } from './Helper/Hooks'
import InputField from './Components/InputField'
import transactions from './Services/transactions'

function App() {
  
  const [expenses, setExpenses] = useState([])
  const [monthTotals, setMonthTotals] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [totals, setTotals] = useState([])
  const [showSavings, setShowSavings] = useState(false)
  const [showTotals, setShowTotals] = useState(false)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 'November', "December"]
  const [activeButton, setActiveButton] = useState(0)
  const [activeButtonSavings, setActiveButtonSavings] = useState(0)
  const [width, height] = useWindowSize()
  const [savings, setSavings] = useState(null)


  const getCurDateFormated = () => {
    const curYear = new Date().getFullYear()
    const curMon = new Date().getMonth() + 1
    const formatedMon = curMon / 10 < 1 ? `0${curMon}` : String(curMon)
    const formatedDate = `${curYear}-${formatedMon}`
    setSelectedMonth(formatedDate)
  }

  useEffect(() => {
    (async function () {
    const data = await transactions.getSavings()
    const expensesData = await transactions.getExpenses()
    const saving = {
      currentSaving: Math.ceil(data[0].currentSaving),
      totalSaved: Math.ceil(data[0].totalSaved),
      percentToSave: data[0].percentToSave
    }
    setSavings(saving)
    setExpenses(expensesData)
    getCurDateFormated()
  })()
  },[])


  useEffect( () => {
    (async function () {
    const currMonth = new Date(selectedMonth).getMonth() || new Date().getMonth()    
    const data =  await transactions.getCurrTotals(currMonth) 
    setMonthTotals(data)
    const dataExp =  await transactions.getCurrExpenses(currMonth)
    setMonthlyExpenses(dataExp)
    })()
  },[selectedMonth])

  useEffect(  () => {
    (async function () {
    const data =  await transactions.getTotals()
    setTotals(data)
    })()
  }, [expenses])


  const listOfExpenses = expenses.filter(expense => Boolean(expense.isExpense))
  const listOfIncomes = expenses.filter(expense => Boolean(!expense.isExpense))
  

  const postNewEntry = async (newEntry) => {
    const data = await transactions.postNewEntry(newEntry)
    const newList = expenses.concat(response.data)
    setExpenses(newList)
  }

  const putExistingEntry = async (changedEntry) => {
    //const putUrl = `${urlExpenses}/${changedEntry.id}`
    const data = await transactions.putExistingEntry(changedEntry)
    const newExpenseList = expenses.map(expense => expense.id !== response.data.id ? expense : response.data)
    setExpenses(newExpenseList)
    resetState(data)
  }

  const removeExistingEntry = async (id) => {
    await transactions.removeExistingEntry(id)
    //axios.delete(`${urlExpenses}/${id}`)
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
  } 

  const monthProjection = totals.map((total, index) => <><Total total={total} title={strings.months[index]}/></>)



/*
    treba napraviti poseban objekat za savings, trebalo bi refaktorisati total objekat tako da prima array neki i izlistava ga da bi mogao da ga koristim i za totals i za savings
    server treba srediti da salje samo objekat ne array sa jednim objektom
    prevode uraditi za tabove nove
     
*/

const mainDatePickerData = {
  //this should allways be enabled - true
  isEnabled: true,
  state: selectedMonth,
  setState: setSelectedMonth,
  name: strings.selectedMonth
}

/*
          buttons={[   <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(false); setActiveButtonSavings(0)}}>Totals</button>,
          <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(true); setActiveButtonSavings(1)}}>Savings</button>]} 
          activeButton={activeButtonSavings}
          >



*/

const folderLeft = {
  setActiveButton: setActiveButtonSavings,
  setShowTab:setShowSavings,
  currentActive: activeButtonSavings
}

const folderRight = {
  button1Function: () => {setShowTotals(false); setActiveButton(0)},
  button2Function:() => {setShowTotals(true); setActiveButton(1)},
  buttonTabLeft: strings.folderTab1,
  buttonTabRight: strings.folderTab2,
  activeButton: activeButton
}



  return (
    <div className="App">
      <div className={"left_pannel"}>
        {showSavings ?
          <FolderView data={folderLeft}>
            <Expense expenseName={"Savings for current month:"} value={savings.currentSaving}/>
            <InputField placeholderText="Total saved" inputName="Total saved" state={savings.totalSaved} setState={setSavings}/>
            <InputField placeholderText="Saved percent" inputName="Saved percent" state={savings.percentToSave} setState={setSavings}/>
          </FolderView>
          :
          <FolderView data={folderLeft}>               
            <div style={{fontSize: "25px", height: "50px", padding: "8px", color: "black"}}>{strings.currenthMonthTotals}</div>
            <EntryDatePicker data={mainDatePickerData}/> 
            <Total total={monthTotals}/>            
          </FolderView>
          }

          <WrapperPannel item={
            <ExpenseEntry changeExpenses={postNewEntry} financialEntry={null}/>
          }
          flexDirection={"column"}
          />
          <WrapperPannel item={
              <ExpensesList expenses={monthlyExpenses} putEntry={putExistingEntry} listTitle={strings.expenseList} editable={false} />
          }
          flexDirection={"column"}
           />
      </div>
      <div className={"right_pannel"}>
        
        { 
        showTotals ?
        <FolderView data={folderRight}>
          <><div style={{fontSize: "25px", height: "50px", lineHeight: "50px", padding: "8px", color: "black"}}>{strings.projectionTitle}</div>
          <div>{monthProjection}</div></>
        </FolderView>

        :
        <FolderView data={folderRight}>
          <div style={{display: "flex", flexDirection: width <= 500 ? "column" : "row"}}>
            <ExpensesList expenses={listOfExpenses} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.expenseList} editable={true}/>
            <ExpensesList expenses={listOfIncomes} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.incomeList} editable={true}/>
          </div>
        </FolderView>
            }
      </div>
    </div>
    
  );
}

export default App;
