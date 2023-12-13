const express = require('express');
const cors = require('cors')
const sequelize = require('./Config/Database');
const User = require('./Models/Users');
const Role = require('./Models/Role');
const House = require('./Models/House');
const HouseType = require('./Models/HouseType');
const HouseOrders = require('./Models/HouseOrder');
const path=require('path');

const app = express();

const routes = require('./Routes/Routes');


require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
};

//*joins relationships
User.hasMany(House,{foreignKey:'UserId'});
House.belongsTo(User,{foreignKey:'UserId'});

app.use(cors(corsOptions))
app.use(express.json())

app.use('/realstate', routes);

//**Get img from the backend middleware */
app.use('/Image',express.static(path.join(__dirname,'Image')));


async function startServer() {
  try {

    await sequelize.authenticate();
    console.log('Database connected');

    await User.sync();
    await Role.sync();
    await HouseType.sync();
    await House.sync();
    await HouseOrders.sync();
    
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

startServer();