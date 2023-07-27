const connectToMongo = require('./db')
const express = require('express')
connectToMongo()

//we will use port = 3000 for our react application.
const port = 5000
const app = express()

//if you want to use req.body then, you need to write the below command, else you will be errors.
app.use(express.json())

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.get('/', (req, res) => {
    res.send('Hello Ansh!')
})

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


