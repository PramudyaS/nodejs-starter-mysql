const ConnectionManager = require("../config/connection-manager")
const QueryBuilder = require('./query-builder')

class BaseModel extends ConnectionManager {
    constructor(table, primaryKey){
        super();
        this.table = table;
        this.primaryKey = primaryKey;
        this.queryBuilder = new QueryBuilder(table, this)
    }

    async store(data){
        const columns = Object.keys(data);
        const values  = Object.values(data);

        const placeholders = new Array(values.length).fill('?').join(', ');
        const query = `INSERT INTO ${this.table} (${columns}) VALUES(${placeholders})`;

        try {
            const result = await this.executeQuery(query, values);
            
            return result
        } catch(error) {
            console.error('Error store data to database ', error.message);
            throw new Error(error.message)
        }
    }

    async findBy(column, id){
        const query = `SELECT * FROM ${this.table} WHERE ${column} = ?`;

        try {
            const result = await this.executeQuery(query, [id]);

            return result;
        } catch(error) {
            console.error('Error get data from database ', error.message);
            throw new Error(error.message);
        }
    }

    async delete(column, id){
        const query = `DELETE FROM ${this.table} WHERE ${column} = ?`;

        try {
            const result = await this.executeQuery(query, [id]);
            
            return result;
        } catch(error) {
            console.error('Error delete data from database ', error);
            throw new Error(error.message);
        }
    }

    async update(data, id){
        const isExist = await this.findBy(this.primaryKey, id);

        if(isExist.length === 0){
            console.error('Data empty');
            throw new Error('Data not found');
        }

        const keys = Object.keys(data).filter(key => key !== this.primaryKey);
        const placeholders = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => data[key]);

        const query = `UPDATE ${this.table} SET ${placeholders} WHERE ${this.primaryKey} = ?`;

        try {
            const result = await this.executeQuery(query, [...values, id]);

            return result;
        } catch (error) {
            console.error('Error update data to database', error);
            throw new Error(error.message)
        }
    }

    async getAll(columns){
        const query = `SELECT ${columns} FROM ${this.table}`;

        try {
            const result = await this.executeQuery(query);

            return result;
        } catch (error) {
            console.error('Error get data from database', error);
            throw new Error(error.message);
        }
    }
    
    async get(){
        return await this.queryBuilder.get();
    }
}

module.exports = BaseModel;