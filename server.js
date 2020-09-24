const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser');
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

app.use(express.static(path.join(__dirname, 'client-folder', 'build')));
app.use(express.static(path.join(__dirname, 'admin-dash', 'build')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api', (req, res) => {
    res.send("test from krish")
})

app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/module', moduleRoutes)

// app.get('/i', (req, res) => {
//     res.json("dsads")
// })


app.get('/i*', (req, res) => {
    console.log("jhasdjhasd")
    console.log(path.resolve(__dirname, 'admin-dash', 'build', 'index.html'))
    res.sendFile(path.resolve(__dirname, 'admin-dash', 'build', 'index.html'))
})

app.get('/*', (req, res) => {
    console.log("jhasdjhasd")
    console.log(path.resolve(__dirname, 'admin-dash', 'build', 'index.html'))
    res.sendFile(path.resolve(__dirname, 'client-folder', 'build', 'index.html'))
})

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect('mongodb://127.0.0.1:27017/learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(PORT, () => {
        console.log('server staarted')
    })
}).catch(err => {
    console.log("error with connecting db")
})