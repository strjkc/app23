import Expense from './Expense'
import ExpensesList from './ExpensesList'
import "./App.css"
import strings from './Strings'
import ExpenseEntry from './ExpenseEntry'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {urlExpenses, urlTotals, urlSavings} from './config'
import Total from './Total'
import EntryDatePicker from './EntryDatePicker'
import WrapperPannel from './WrapperPannel'
import FolderView from './FolderView'
import { useWindowSize } from './Hooks'
import InputField from './InputField'


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
    axios.get(urlSavings)
    .then(response => {
      console.log("Savings:", response.data)
      const saving = {
        currentSaving: Math.ceil(response.data[0].currentSaving),
        totalSaved: Math.ceil(response.data[0].totalSaved),
        percentToSave: response.data[0].percentToSave
      }
      setSavings(saving)
    })
  })

  useEffect(() => {
    axios.get(urlExpenses)
    .then(response => {
      console.log(response.data)
      setExpenses(response.data)
    })

    getCurDateFormated()
  }, [])

  useEffect(() => {
    console.log("date: ", selectedMonth)
    const currMonth = new Date(selectedMonth).getMonth() || new Date().getMonth()
    
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

  const removeExistingEntry = (id) => {
    axios.delete(`${urlExpenses}/${id}`)
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
  } 

  const monthProjection = totals.map((total, index) => <><Total total={total} title={strings.months[index]}/></>)



/*
    treba napraviti poseban objekat za savings, trebalo bi refaktorisati total objekat tako da prima array neki i izlistava ga da bi mogao da ga koristim i za totals i za savings
    server treba srediti da salje samo objekat ne array sa jednim objektom
    prevode uraditi za tabove nove
     
*/


  return (
    <div className="App">
      <div className={"left_pannel"}>
        {showSavings ?
          <FolderView mainItem={ 
            <>
              <Expense expenseName={"Savings for current month:"} value={savings.currentSaving}/>
              <InputField placeholderText="Total saved" inputName="Total saved" state={savings.totalSaved} setState={setSavings}/>
              <InputField placeholderText="Saved percent" inputName="Saved percent" state={savings.percentToSave} setState={setSavings}/>
            </>
          }
          buttons={[   <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(false); setActiveButtonSavings(0)}}>Totals</button>,
          <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(true); setActiveButtonSavings(1)}}>Savings</button>]} 
          activeButton={activeButtonSavings}
          >
          </FolderView>
          :
          <FolderView mainItem={ 
            <>
            <div style={{fontSize: "25px", height: "50px", padding: "8px", color: "black"}}>{strings.currenthMonthTotals}</div>
          <EntryDatePicker isEnabled={true} dateText={strings.selectedMonth} state={selectedMonth} setState={(e) => setSelectedMonth(e.target.value)}/> 
          <Total total={monthTotals}/>
            </>
          }
          buttons={[   <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(false); setActiveButtonSavings(0)}}>Totals</button>,
          <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowSavings(true); setActiveButtonSavings(1)}}>Savings</button>]} 
          activeButton={activeButtonSavings}
          >
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
        <FolderView mainItem={<><div style={{fontSize: "25px", height: "50px", lineHeight: "50px", padding: "8px", color: "black"}}>{strings.projectionTitle}</div><div>{monthProjection}</div></>} 
        
                    buttons={[   <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowTotals(false); setActiveButton(0)}}>{strings.folderTab1}</button>,
                                <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowTotals(true); setActiveButton(1)}}>{strings.folderTab2}</button>]} 

            activeButton={activeButton}
        
        
        
        
        />

        :
        <FolderView mainItem={            
        <div style={{display: "flex", flexDirection: width <= 500 ? "column" : "row"}}>
          <ExpensesList expenses={listOfExpenses} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.expenseList} editable={true}/>
          <ExpensesList expenses={listOfIncomes} removeItem={removeExistingEntry} putEntry={putExistingEntry} listTitle={strings.incomeList} editable={true}/>
        </div>} 
                    buttons={[   <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowTotals(false); setActiveButton(0)}}>{strings.folderTab1}</button>,
                                <button style={{width: "100%", height: "100%", border: "none", borderRadius: "inherit", backgroundColor: "inherit"}} onClick={() => {setShowTotals(true); setActiveButton(1)}}>{strings.folderTab2}</button>]} activeButton={activeButton}/>}
      </div>
    </div>
    
  );
}

export default App;
