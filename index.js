const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let reminders = [
	{
	  "name": "Buy some eggs",
	  "timestamp":"2021-11-10T13:00:00.141Z",
	  "id":1
	},
    {
      "name": "Make an omelette",
      "timestamp": "2021-11-11T08:00:00.141Z",
      "id": 2
    },
    {
      "name": "Wash dishes",
      "timestamp": "2021-11-11T09:00:00.000Z",
      "id": 3
    },
    {
      "name": "Buy more eggs",
      "timestamp": "2021-11-11T13:00:00.000Z",
      "id": 4
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/reminders', (req, res) => {
  res.json(reminders)
})

app.get('/api/reminders/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const reminder = reminders.find(reminder => reminder.id === id )
  console.log(reminder)
  res.json(reminder)
})

app.delete('/api/reminders/:id', (req, res) => {
  const id = Number(req.params.id)
  reminders = reminders.filter(reminder => reminder.id!==id)
  res.status(204).end()
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

app.post('/api/reminders', (req, res) => {
	const body=req.body

	if (body.timestamp===undefined){
		return res.status(400).json({error:'timestamp missing'})
	}

	if (reminders.find(reminder => reminder.name === body.name )){
		return res.status(400).json({error:'name must be unique'})
	}

	const reminder ={
		name:body.name,
		timestamp: new Date(),
		id: getRandomInt(4, 1000000)
	}


	reminders=reminders.concat(reminder)

	res.json(reminder)

	console.log(reminders)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

