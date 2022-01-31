const PORT = process.env.PORT || 5000;
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())