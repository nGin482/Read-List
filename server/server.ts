require('dotenv').config()
import express from "express";
const cors = require('cors')

import { database } from "./database";
import { apiRouter } from "./routes";
import { fandomRouter } from "./routes/FandomRoutes";

database.sync();

const app = express()
app.use(cors())
app.use(express.json({limit: '5mb'}))
app.use(express.static('build'))
app.use('/api/fandoms', fandomRouter);
app.use(apiRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})