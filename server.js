// require('dotenv/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const uploadRoutes = require('./routes/upload')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const moduleRoutes = require('./routes/module')

const app = express();
const PORT = process.env.PORT || 3300

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

// //STATICALLY SERVE THE ADMIN DASHBOARD AND CLIENT FOLDER
// app.use(express.static(path.join(__dirname, 'client-folder', 'build')));
// app.use(express.static(path.join(__dirname, 'admin-dash', 'build')));

//STATICALLY SERVE IMAGES
app.use('/images', express.static(path.join(__dirname, 'images')));


//TEST ROUTE
app.get('/api', (req, res) => {
    res.send("test from krish")
})

app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/module', moduleRoutes)

//ALL CREATOR ROUTES
app.get('/i*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'admin-dash', 'build', 'index.html'))
})

//ALL REMAINING ROUTES i.e. CLIENT ROUTES
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-folder', 'build', 'index.html'))
})

//For Handling any errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//Connecting to MongoDB
mongoose.connect('mongodb+srv://krish:krish@cluster0.fdsor.gcp.mongodb.net/learning?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(res => {
    app.listen(PORT, () => {
        console.log('Server Started')
    })
}).catch(err => {
    console.log("Error with connecting to db")
})