const express = require('express')
const connectDB = require("./database/db")
const path = require('path');
var cors = require('cors')
const app = express()
const port = 3000
// Middleware to parse JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//enable cors
app.use(cors())
app.options('*', cors())


// Connection to DB
connectDB()

// Define route paths in variables
const API_VERSION = '/api/v1';
const USER_ROUTE_PATH = `${API_VERSION}/users`;
const AUTH_ROUTE_PATH = `${API_VERSION}/auth`;
const JOB_ROUTE_PATH = `${API_VERSION}/jobs`;
const COMPANY_ROUTE_PATH = `${API_VERSION}/company`;

// demo api for testing
app.get('/api/v1/', (req, res) => {
    res.send('Hello World!')
  })

// Business api

//users api
app.use(USER_ROUTE_PATH, require('./routes/User.Route'))

// Auth apis
app.use(AUTH_ROUTE_PATH , require('./routes/Auth.Route'))

// jOBS apis
app.use(JOB_ROUTE_PATH , require('./routes/Job.Route'))

// COMPANY apis
app.use(COMPANY_ROUTE_PATH , require('./routes/Company.Route'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})