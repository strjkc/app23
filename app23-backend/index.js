const express = require('express')
const app = express()



const db = {
  "totals": {
    "incomes": 180000,
    "expenses": 11111,
    "available": 555555
  },
  "expenses": [
    {
      "id": 1,
      "name": "Plata",
      "amount": 180000,
      "endMonth": "2023-06-13",
      "startDate": "2023-04-13",
      "isExpense": 0,
      "frequence": 0
    },
    {
      "id": 2,
      "name": "Kredit",
      "amount": 30000,
      "endMonth": "2023-06-13",
      "startDate": "2023-04-13",
      "isExpense": 1,
      "frequence": 0
    },
    {
      "name": "Struja",
      "id": 3,
      "amount": 3000,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "id": 4,
      "name": "Telefon",
      "amount": "2500",
      "endMonth": "2023-06-13",
      "startDate": "2023-04-13",
      "isExpense": 1,
      "frequence": 0
    },
    {
      "name": "SBB",
      "id": 5,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Kreditna kartica",
      "id": 6,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Infostan",
      "id": 7,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Zgrada",
      "id": 8,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Hrana",
      "id": 9,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Gorivo",
      "id": 10,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "frequence": 0,
      "endMonth": "2023-06-13"
    },
    {
      "name": "Prevoz",
      "id": 11,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "name": "Porez",
      "id": 12,
      "amount": 2100,
      "isReocurring": true,
      "isExpense": 1,
      "startDate": "2023-04-13",
      "endMonth": "2023-06-13",
      "frequence": 0
    },
    {
      "id": 13,
      "name": "Patike",
      "amount": "10000",
      "endMonth": "2023-06-13",
      "startDate": "2023-04-13",
      "isExpense": 1,
      "frequence": 0
    },
    {
      "id": 14,
      "name": "Procesor",
      "amount": "10000",
      "endMonth": "2023-06-13",
      "isExpense": 1,
      "isReocuring": true,
      "frequence": 0
    },
    {
      "id": 15,
      "name": "Graficka",
      "amount": "20000",
      "endMonth": "2023-06-13",
      "isExpense": 1,
      "startDate": "2023-04-13",
      "isReocuring": true,
      "frequence": 0
    },
    {
      "id": 16,
      "name": "Kuciste",
      "amount": "5000",
      "endMonth": "2023-06-13",
      "isExpense": 1,
      "startDate": "2023-04-13",
      "isReocuring": true,
      "frequence": 0
    },
    {
      "id": 17,
      "name": "novi",
      "amount": 5000,
      "endMonth": "2023-06-13",
      "isExpense": 1,
      "startDate": "2023-03-08",
      "isReocuring": true,
      "frequence": 1
    }
  ]
}


app.get('/', (request, response) => {
  response.send(db.toJson())
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})