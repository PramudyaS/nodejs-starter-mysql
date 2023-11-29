var express = require('express')
var exampleRoutes = require('./src/routes/example-routes')

var env = require('dotenv')

env.config()

var app = express()

app.use(express.json())
app.use('/example',exampleRoutes)

const initializeServer = () => {
    try{
        var server = app.listen(8081, () => {
            var host = server.address().address;
            var port = server.address().port;
            
            console.log('listen http://%s:%s', host, port);
        })

    } catch (error) {
        console.error('Error initializing server ', error);
    }
}

initializeServer()