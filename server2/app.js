const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT
const connectDB = require('./src/config/dbConn')
const { sendResponse } = require('./src/helper/response')
const httpLogger = require('./src/logger/httplogger')
const errorHandler = require('./src/middleware/errorHandler')

const app = express()
app.use(express.json())
// connectDB();
app.use(httpLogger)
app.use('/api', require('./src/routes/route'))
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/media', express.static(path.join(__dirname, '/public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views', 'index.html'))
})

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next)
})

module.exports = app
