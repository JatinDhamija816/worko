import app from "./app.js";
import dotenv from 'dotenv'
import ConnectDB from "./database/db.js";

dotenv.config()
const PORT = process.env.PORT || 5000

ConnectDB()
    .then(() => {
        app.listen((PORT), () => {
            console.log(`Server Start at http://localhost:${PORT}`)
        })
    }).catch(() => {
        console.log('Error While Starting the Server')
    })