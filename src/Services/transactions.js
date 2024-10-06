import axios from "axios"  
import {urlExpenses, urlTotals, urlSavings} from '../Config/config'

const dataFilter = async (callback) => {
    const promise = await callback()()
    return promise.data
}

/*
export  const postNewEntry =  (newEntry) => {
dataFilter( () => axios.post(urlExpenses, newEntry))
}

export  const putExistingEntry = async (changedEntry) => {
    const putUrl = `${urlExpenses}/${changedEntry.id}`
    dataFilter(() => await axios.put(putUrl, changedEntry))
    
  }



*/
//######################

export  const postNewEntry = async (newEntry) => {
  const promise = await axios.post(urlExpenses, newEntry)
  return promise.data
  }

export  const putExistingEntry = async (changedEntry) => {
    const putUrl = `${urlExpenses}/${changedEntry.id}`
    const promise = await axios.put(putUrl, changedEntry)
    return promise.data
  }

export  const removeExistingEntry = async (id) => {
    const promise = await axios.delete(`${urlExpenses}/${id}`)
    return promise.data
  }
  
  const getSaveings = async () => {
    const promise = await axios.get(urlSavings)
    return promise.data
  }
  const getExpenses = async () => {
    const promise = await axios.get(urlExpenses)
    return promise.data
  }

  const getCurrTotals = async (currMonth) => {
    const promise = await axios.get(`${urlTotals}/${currMonth}`)
    return promise.data 
  }
  const getCurrExpenses = async (currMonth) => {
    const promise = await axios.get(`${urlExpenses}/${currMonth}`)
    return promise.data 
  }
    
  const getTotals = async () => {
    const promise = await axios.get(urlTotals)
    return promise.data 
  }


  export default {postNewEntry, putExistingEntry, removeExistingEntry, getSavings: getSaveings, getExpenses, getCurrTotals,getCurrExpenses,getTotals}