export let urlExpenses = null
export let urlTotals = null
export let urlSavings = null

if(process.env.NODE_ENV === "development"){
    console.log(process.env.NODE_ENV)
    console.log("Application running in dev mode")
    urlExpenses = "http://localhost:3001/api/entrys"
    urlTotals = "http://localhost:3001/api/totals"
    urlSavings = "http://localhost:3001/api/savings"
}else {
    console.log(`env: ${process.env.NODE_ENV}`)

    console.log("Application running in prod mode")
    urlExpenses = "/api/entrys"
    urlTotals = "/api/totals"
    urlSavings = "/api/savings"
}