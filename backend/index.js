const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')

app.use(cors())
connectDB()
app.use(express.json())

app.post('/pay', async (req, res) => {
    const { planDetails } = req.body
    res.send(planDetails)
})
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))