import express from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.js'

const app = express()

app.use(cors());
app.use(express.json())
app.use('', UserRoutes)

export default app