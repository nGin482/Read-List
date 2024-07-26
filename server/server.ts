require('dotenv').config()
import express from "express";
const cors = require('cors')

import { database } from "./database";
import { collectionsRouter, fandomRouter, storyRouter } from "./routes";

database.sync();

const app = express();
app.use(cors())
app.use(express.json({limit: '5mb'}))
app.use(express.static('build'))
app.use('/api/fandoms', fandomRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/stories', storyRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})