const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MongoDB connection
const mongoDBUri = process.env.MONGO_URL;
mongoose.connect(mongoDBUri, {
    // Remove the deprecated options
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const customerRouter = require("./routes/customer-route");
const categoryRouter = require("./routes/category-route");
const itemRouter = require("./routes/item-route");  
const grnRouter = require("./routes/grn-route");
const OrderRouter = require("./routes/order-route");
const invoiceRouter = require("./routes/invoice-route");


app.use("/customer", customerRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/grn", grnRouter);
app.use("/order", OrderRouter);
app.use("/invoice", invoiceRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})