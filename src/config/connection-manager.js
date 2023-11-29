const mysql = require('mysql2/promise');

var env = require('dotenv')

env.config()

const config = {
    host : process.env.HOST,
    port : process.env.PORT, 
    database : process.env.DATABASE,
    user : process.env.USERNAME,
    password : process.env.PASSWORD,
    connectionLimit : 10
}

class ConnectionManager {
    constructor(){
        this.pool = mysql.createPool(config)
    }

    async getConnection(){
        try{
            const connection = await this.pool.getConnection()

            return connection
        }catch(error){
            console.error('Error connect to database', error)
            throw new Error(error.message)
        }
    }

    async executeQuery(query, params = []){
        let connection

        try {
            connection = await this.getConnection()
            const [ results ] = await connection.execute(query, params)

            return results
        } catch(error){
            console.error('Error while executing query ', error)

            throw new Error(error.message)
        } finally {
            this.closeConnection()
        }

    }

    closeConnection(connection){
        if(connection){
            connection.releaseConnection();
            console.log('connection to database release')    
        }
    }

    async closePool() {
        try {
          await this.pool.end();
          console.log('Connection pool closed');
        } catch (error) {
          console.error('Error closing connection pool:', error.message);
          throw new Error(error.message) ;
        }
    }
}

module.exports = ConnectionManager