const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const {
	readData,
	writeData,
	formatAmount,
} = require('./utils.js')

const app = express()
const expressWs = require('express-ws')(app)
const port = 3000




const KNOWN_CURRENCY_CODES = Object.freeze([
	'ETH',
	'BTC',
	'USD',
	'EUR',
	'JPY',
	'GBP',
	'AUD',
	'CAD',
	'CHF',
	'CNH',
	'HKD',
	'NZD',
	'RUB',
	'UAH',
	'BYR'
])

let currencyFeedSubscribers = []

const data = readData()

app.use(cors())
app.use(bodyParser.json())


app.ws('/currency-feed', (ws, req) => {
	currencyFeedSubscribers.push(ws)
	ws.on('close', () => {
		currencyFeedSubscribers = currencyFeedSubscribers.filter(websocket => websocket !== ws)
	})
})

app.ws('/currency-feed', (ws, req) => {
	currencyFeedSubscribers.push(ws)
	ws.on('close', () => {
		currencyFeedSubscribers = currencyFeedSubscribers.filter(websocket => websocket !== ws)
	})
})

app.listen(port, () => {
	console.log(`Example app listening at ws://localhost:${port}/currency-feed`)
})


function setExchangeRate(currency1, currency2, rate) {
	const existingInverseRate = data.exchange[`${currency2}/${currency1}`]
	if (existingInverseRate) {
		data.exchange[`${currency2}/${currency1}`] = formatAmount(1 / rate)
		return
	}
	data.exchange[`${currency1}/${currency2}`] = rate
}

function getExchangeRate(currency1, currency2) {
	const straightRate = Number(data.exchange[`${currency1}/${currency2}`])
	if (!isNaN(straightRate)) {
		return straightRate
	}
	const inverseRate = data.exchange[`${currency2}/${currency1}`]
	if (inverseRate) {
		return 1/inverseRate
	}
	return 0
}

const currencyRateFeedGenerator = setInterval(() => {
	const currenciesLength = KNOWN_CURRENCY_CODES.length
	const index1 = Math.floor(Math.random() * currenciesLength)
	let index2 = Math.floor(Math.random() * currenciesLength)
	if (index1 === index2) {
		index2 = (index2 + 1) % currenciesLength
	}
	const from = KNOWN_CURRENCY_CODES[index1]
	const to = KNOWN_CURRENCY_CODES[index2]
	const rate = formatAmount(0.001 + Math.random() * 100)
	const previousExchangeRate = getExchangeRate(from, to)
	const change = rate > previousExchangeRate ? 1 : rate < previousExchangeRate ? -1 : 0
	setExchangeRate(from, to, rate)
	writeData(data)
	currencyFeedSubscribers.forEach(subscriber => subscriber.send(
		JSON.stringify({
			type: 'EXCHANGE_RATE_CHANGE',
			from,
			to,
			rate,
			change
		})
	))


}, 1000)
currencyRateFeedGenerator.unref()
