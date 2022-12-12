// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const {CreateNewUser} = require('./models/users');
const {CreateRepairOrderCounter} = require('./models/counter');

// Routes
const signupRoute = require('./routes/singup');
const loginRoute = require('./routes/login');
const testRoute = require('./routes/test');
const pingRoute = require('./routes/ping');
const addRepairOrdersRoute = require('./routes/add-repair-order');
const getRepairOrdersRoute = require('./routes/get-repair-order');
const editRepairOrdersRoute = require('./routes/edit-repair-order');
const getNextROIDRoute = require('./routes/get-next-ro-id');
const getRepairOrdersListRoute = require('./routes/get-repair-orders-list');

// Middleware
// const {protect} = require('./authMiddleware.js');

// DotEnv
dotenv.config();

// Connect to Database
let DbConnectString = process.env.DB;
console.log("Connecting to database : " + DbConnectString);
mongoose.connect(DbConnectString, () => { console.log("MONGOOSE_CONNECT_CALLBACK()"); });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// Initialize some tables
const wasAdminCreated = CreateNewUser("admin", process.env.DEFAULT_ADMIN_PASSWORD);
console.log("Admin creation result = " + wasAdminCreated);
CreateRepairOrderCounter();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json());
app.use(cors());

// Routes Setup
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/test", testRoute);
app.use("/api/ping", pingRoute);
app.use("/api/add-repair-order", addRepairOrdersRoute);
app.use("/api/get-repair-order", getRepairOrdersRoute);
app.use("/api/edit-repair-order", editRepairOrdersRoute);
app.use("/api/get-next-ro-id", getNextROIDRoute);
app.use("/api/get-repair-orders-list", getRepairOrdersListRoute);
// app.use("/api/get-item-list", /*protect,*/ getItemListRoute);

// Listen
let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is up and runnning on port ${port}`));