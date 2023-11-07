const express = require('express');
const cors = require('cors')
const sequelize = require('./Config/Database');
const User = require('./Models/Users');


const app = express();

const routes = require('./Routes/Routes');


require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };



app.use(cors(corsOptions))
app.use(express.json())

app.use('/realstate', routes);


async function startServer() {
  try {
    
    await sequelize.authenticate();
    console.log('Database connected');
 
 
    await User.sync();

  

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

startServer();