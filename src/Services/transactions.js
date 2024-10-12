import axios from "axios"  
import {urlExpenses, urlTotals, urlSavings} from '../Config/config'

const dataFilter = async (callback) => {
    const promise = await callback()
    return promise.data
}

  const postNewEntry = async (newEntry) => {
  return await dataFilter(async () => await axios.post(urlExpenses, newEntry))
  }

  const putExistingEntry = async (changedEntry) => {
    const putUrl = `${urlExpenses}/${changedEntry.id}`
    return await dataFilter(async () => await axios.post(putUrl, changedEntry))
  }

  const removeExistingEntry = async (id) => {
  return await dataFilter(async () => await axios.delete(`${urlExpenses}/${id}`))
  }
  
  const getSaveings = async () => {
    const promise = await axios.get(urlSavings)
    return promise.data
  }
  const getExpenses = async () => {
    return await dataFilter(async () => await axios.get(urlExpenses))
  }

  const getCurrTotals = async (currMonth) => {
    return await dataFilter(async () => await axios.get(`${urlTotals}/${currMonth}`))
  }
  const getCurrExpenses = async (currMonth) => {
    return await dataFilter(async () => await axios.get(`${urlExpenses}/${currMonth}`))
  }
    
  const getTotals = async () => {
    return await dataFilter(async () => await axios.get(urlTotals))

  }


  export default {postNewEntry, putExistingEntry, removeExistingEntry, getSavings: getSaveings, getExpenses, getCurrTotals,getCurrExpenses,getTotals}