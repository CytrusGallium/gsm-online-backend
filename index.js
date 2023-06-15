// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { CreateNewUser } = require('./models/users');
const { CreateRepairOrderCounter, CreateCateringOrderCounter } = require('./models/counter');
const path = require('path');
const { CreateCustomerSittingTableInBatch, IfNoCustomerSittingTableDoThis } = require('./models/customer-sitting-table');
const { LogHttpRequest } = require('./Middleware/RequestLogger');
const WebSocket = require('ws');
const net = require('net');

console.log("-------------------------------------------------------------------------------");
console.log("--------------------------REAKNOTRON BACKEND STARTUP---------------------------");
console.log("-------------------------------------------------------------------------------");

// ==========================================================================================
// Mizzapp Bridge
// ==========================================================================================
try {
    const tcpClient = net.createConnection({ port: 33333 }, () => {
        console.log('NET : Connected to server!');
        tcpClient.write('hello server\r\n');

        // ==================================================================================
        // Web Socket
        // ==================================================================================
        const webSocketServer = new WebSocket.Server({ port: 44444 });
        let sockets = [];
        webSocketServer.on('connection', (socket) => {
            sockets.push(socket);
            // socket.send("Hello, Client !");
            // When you receive a message, send that message to every socket.
            socket.on('message', (msg) => {
                // sockets.forEach(s => s.send(msg));
                console.log("WebSocket Message : " + msg);
            });
            // When a socket closes, or disconnects, remove it from the array.
            socket.on('close', () => {
                sockets = sockets.filter(s => s !== socket);
            });
        });

        tcpClient.on('data', (data) => {
            console.log("NET : Message Received : " + data.toString());
            // tcpClient.end();
            sockets.forEach((s) => {
                s.send(data.toString());
            });
        });
        // Websocket End =====================================================================
    });

    tcpClient.on('error', (err) => {
        console.error("NET : Error : " + JSON.stringify(err));
    });

    tcpClient.on('end', () => {
        console.log('NET : Disconnected from server.');
    });
} catch (error) {
    console.log("ERRO : NET or WebSocket Error.");
}
// ==========================================================================================
// Mizzapp Bridge END =======================================================================
// ==========================================================================================

// Routes
// const signupRoute = require('./routes/singup');
const loginRoute = require('./routes/login');
// const testRoute = require('./routes/test');
const pingRoute = require('./routes/ping');
const updateRepairOrderRoute = require('./routes/update-repair-order');
// const addRepairOrdersRoute = require('./routes/add-repair-order');
const getRepairOrderRoute = require('./routes/get-repair-order');
// const editRepairOrdersRoute = require('./routes/edit-repair-order');
// const getNextROIDRoute = require('./routes/get-next-ro-id');
const getRepairOrdersListRoute = require('./routes/Repair Order/get-repair-orders-list');
const getCustomerSittingTablesListRoute = require('./routes/Customer Sitting Table/get-customer-sitting-tables-list');
const generateEmptyRepairOrderRoute = require('./routes/Repair Order/generate-empty-repair-order');
const generateEmptyCateringOrderRoute = require('./routes/Catering Order/generate-empty-catering-order');
const newProductRoute = require('./routes/Product/new-product');
const getProductRoute = require('./routes/Product/get-product');
const updateProductRoute = require('./routes/Product/update-product');
const newCategoryRoute = require('./routes/Category/new-category');
const getCategoryListRoute = require('./routes/Category/get-category-list');
const getProductImageRoute = require('./routes/get-product-image');
const getProductListRoute = require('./routes/Product/get-product-list');
const getCateringOrdersListRoute = require('./routes/Catering Order/get-catering-orders-list');
const validateRepairOrderRoute = require('./routes/validate-repair-order');
const getCateringOrderRoute = require('./routes/Catering Order/get-catering-order');
const updateCateringOrderRoute = require('./routes/Catering Order/update-catering-order');
const updateCustomerSittingTableRoute = require('./routes/Customer Sitting Table/update-customer-sitting-table');
const deleteRepairOrderRoute = require('./routes/delete-repair-order');
const deleteCateringOrderRoute = require('./routes/Catering Order/delete-catering-order');
const getReceptionListRoute = require('./routes/Reception/get-reception-list');
const getReceptionListReadyRoute = require('./routes/Reception/get-reception-list-ready');
const getReceptionRoute = require('./routes/Reception/get-reception');
const newReceptionRoute = require('./routes/Reception/new-reception');
const performReceptionStorageRoute = require('./routes/Reception/perform-reception-storage');
const updateReceptionRoute = require('./routes/Reception/update-reception');
const getReceptionTotalRoute = require('./routes/Reception/get-reception-total');
const newProviderRoute = require('./routes/Provider/new-provider');
const getProviderListRoute = require('./routes/Provider/get-provider-list');
const getActiveTakeoutOrderListRoute = require('./routes/Catering Order/get-active-takeout-order-list');
const getUserListRoute = require('./routes/User/get-user-list');
const newUserRoute = require('./routes/User/new-user');
const newEmployeeRoute = require('./routes/Employee/new-employee');
const getEmployeeListRoute = require('./routes/Employee/get-employee-list');
const newEmployeeClockingEventRoute = require('./routes/Employee Clocking Event/new-employee-clocking-event');
const getEmployeeClockingEventListRoute = require('./routes/Employee Clocking Event/get-employee-clocking-event-list');
const addFeeTypeRoute = require('./routes/Fee Type/add-fee-type');
const getFeeTypeListRoute = require('./routes/Fee Type/get-fee-type-list');
const addFeeRoute = require('./routes/Fee/add-fee');
const getFeeListRoute = require('./routes/Fee/get-fee-list');
const getFeeStatsRoute = require('./routes/Fee/get-fee-stats');
const getDatabaseRoute = require('./routes/Database/get-database');
const installDatabaseRoute = require('./routes/Database/install-database');
const getRoListXlsRoute = require('./routes/Repair Order/get-ro-list-xls');
const roStatsRoute = require('./routes/Repair Order/ro-stats');
const deleteProductRoute = require('./routes/Product/delete-product');
const getHttpRequestlogRoute = require('./routes/Logs/get-http-request-log');
// const facebookPostTestRoute = require('./routes/Facebook/facebook-post-test');
const numicRoute = require('./routes/Computer Specs/Numic');
const computerSpecsListRoute = require('./routes/Computer Specs/computer-specs-list');
const computerSpecsToProductRoute = require('./routes/Computer Specs/computer-specs-to-product');
const computerSpecsbyIdRoute = require('./routes/Computer Specs/computer-specs-by-id');
const postOnFacebookRoute = require('./routes/Facebook/post-on-facebook');

// Multer START Config -----------------------------------------------------------------------------------------------------------
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads') // Error is null here, Uploads is the name of the folder where the received files will be stored.
    },
    filename: (req, file, cb) => {
        console.log("FILE = " + file);
        let filename = Date.now() + "_" + file.originalname;
        cb(null, filename);
    }
})

const upload = multer({ storage: storage }) // This is the Middleware object
// Multer END Config -------------------------------------------------------------------------------------------------------------

// Middleware
// const {protect} = require('./authMiddleware.js');

// DotEnv
dotenv.config();

// Mongoose connect callback
const MongooseConnectCallback = async () => {
    // Initialize some tables
    const wasAdminCreated = await CreateNewUser("admin", process.env.DEFAULT_ADMIN_PASSWORD, "ADMIN");
    console.log("Admin creation result : " + wasAdminCreated);
    CreateRepairOrderCounter();
    CreateCateringOrderCounter();
    IfNoCustomerSittingTableDoThis(() => CreateCustomerSittingTableInBatch(20));
    setTimeout(() => {console.log("-------------------------------------------------------------------------------");}, 2500);
}

// Connect to Database
let DbConnectString = process.env.DB;
console.log("Connecting to database : " + DbConnectString);
mongoose.connect(DbConnectString, MongooseConnectCallback);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// Middleware Setup
// app.all('*', LogHttpRequest);
// app.use(function(req,res,next){setTimeout(next,1000)});
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json());
app.use(cors());

// Routes Setup
// app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
// app.use("/api/test", testRoute);
app.use("/api/ping", pingRoute);
// app.use("/api/add-repair-order", addRepairOrdersRoute);
app.use("/api/get-repair-order", getRepairOrderRoute);
// app.use("/api/edit-repair-order", editRepairOrdersRoute);
// app.use("/api/get-next-ro-id", getNextROIDRoute);
app.use("/api/get-repair-orders-list", getRepairOrdersListRoute);
app.use("/api/get-customer-sitting-tables-list", getCustomerSittingTablesListRoute);
// app.use("/api/get-item-list", /*protect,*/ getItemListRoute);
app.use("/api/generate-empty-repair-order", generateEmptyRepairOrderRoute);
app.use("/api/generate-empty-catering-order", generateEmptyCateringOrderRoute);
app.use("/api/update-repair-order", LogHttpRequest, updateRepairOrderRoute);
app.use("/api/new-product", upload.single("picture"), newProductRoute);
app.use("/api/get-product", getProductRoute);
app.use("/api/update-product", upload.single("picture"), updateProductRoute);
app.use("/api/new-category", upload.single("picture"), newCategoryRoute);
app.use("/api/get-category-list", getCategoryListRoute);
app.use("/api/get-product-image", getProductImageRoute);
app.use("/api/get-product-list", getProductListRoute);
app.use("/api/get-catering-orders-list", getCateringOrdersListRoute);
app.use("/api/validate-repair-order", validateRepairOrderRoute);
app.use("/api/get-catering-order", getCateringOrderRoute);
app.use("/api/update-catering-order", updateCateringOrderRoute);
app.use("/api/update-customer-sitting-table", updateCustomerSittingTableRoute);
app.use("/api/delete-repair-order", deleteRepairOrderRoute);
app.use("/api/delete-catering-order", deleteCateringOrderRoute);
app.use("/api/get-reception-list", getReceptionListRoute);
app.use("/api/get-reception-list-ready", getReceptionListReadyRoute);
app.use("/api/get-reception", getReceptionRoute);
app.use("/api/get-reception-total", getReceptionTotalRoute);
app.use("/api/new-provider", newProviderRoute);
app.use("/api/get-provider-list", getProviderListRoute);
app.use("/api/new-reception", newReceptionRoute);
app.use("/api/perform-reception-storage", performReceptionStorageRoute);
app.use("/api/update-reception", updateReceptionRoute);
app.use("/api/get-active-takeout-order-list", getActiveTakeoutOrderListRoute);
app.use("/api/get-user-list", getUserListRoute);
app.use("/api/new-user", newUserRoute);
app.use("/api/new-employee", newEmployeeRoute);
app.use("/api/get-employee-list", getEmployeeListRoute);
app.use("/api/new-employee-clocking-event", newEmployeeClockingEventRoute);
app.use("/api/get-employee-clocking-event-list", getEmployeeClockingEventListRoute);
app.use("/api/add-fee-type", addFeeTypeRoute);
app.use("/api/get-fee-type-list", getFeeTypeListRoute);
app.use("/api/add-fee", addFeeRoute);
app.use("/api/get-fee-list", getFeeListRoute);
app.use("/api/get-fee-stats", getFeeStatsRoute);
app.use("/api/get-database", getDatabaseRoute);
app.use("/api/install-database", upload.single("file"), installDatabaseRoute);
app.use("/api/get-ro-list-xls", getRoListXlsRoute);
app.use("/api/ro-stats", roStatsRoute);
app.use("/api/delete-product", deleteProductRoute);
app.use("/api/get-http-request-log", getHttpRequestlogRoute);
// app.use("/api/facebook-post-test", facebookPostTestRoute);
app.use("/api/numic", numicRoute);
app.use("/api/computer-specs-list", computerSpecsListRoute);
app.use("/api/computer-specs-to-product", computerSpecsToProductRoute);
app.use("/api/computer-specs-by-id", computerSpecsbyIdRoute);
app.use("/api/post-on-facebook", postOnFacebookRoute);

// Listen
let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is up and runnning on port ${port}`));