export let urlExpenses = null
export let urlTotals = null

if(process.env.NODE_ENV === "development"){
    console.log(process.env.NODE_ENV)
    console.log("Application running in dev mode")
    urlExpenses = "http://localhost:3001/api/entrys"
    urlTotals = "http://localhost:3001/api/totals"
}else {
    console.log(`env: ${process.env.NODE_ENV}`)

    console.log("Application running in prod mode")
    urlExpenses = "http://prodserver"
    urlTotals = "http://prodserver"
}