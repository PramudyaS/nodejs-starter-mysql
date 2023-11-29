var mysql = require('mysql2/promise')
var env = require('dotenv')


env.config()

const config = {
    host : process.env.HOST,
    port : process.env.PORT, 
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    connectionLimit : 10
}

const connection = mysql.createPool(config)

const setConnection =  async () => {
    try {
        const connection = await connection.getConnection(connection)
        console.log(connection)

        return connection
    } catch(error) {
        console.error('Error connect to DB', error)
        throw new Error(error)
    }
}

module.exports = {
    setCon
}