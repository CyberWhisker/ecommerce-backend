require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// File Route Location
const UserRoutes = require('./routes/user')
const TechStackRoutes = require('./routes/techStack')
const InventoryRoutes = require('./routes/inventory')
const ProjectRoutes = require('./routes/project')
const TransactionRoutes = require('./routes/transaction')
const OrderRoutes = require('./routes/order')

const port = process.env.PORT

// Express app
const app = express()

// Enable CORS
const cors = require('cors');

//Security
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
}));

// Middleware
app.use(express.json())

// Routes
app.use('/api/user', UserRoutes)
app.use('/api/techStack', TechStackRoutes)
app.use('/api/inventory', InventoryRoutes)
app.use('/api/project', ProjectRoutes)
app.use('/api/transaction', TransactionRoutes)
app.use('/api/order', OrderRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen
        app.listen(port, () => console.log(`Connected to DB & Listening to port: ${port}!`))
    })
    .catch((error) => console.log(error))