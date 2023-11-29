class QueryBuilder {
    constructor(table, connectionManager){
        this.query = `FROM ${table}`;
        this.connectionManager = connectionManager;
    }

    select(columns){
        this.query = `SELECT ${columns} ${this.query} `
        return this;
    }

    where(column, value){
        this.query += `WHERE ${column} = "${value}" `;
        return this;
    }

    orderBy(column, direction = 'ASC'){
        this.query += `ORDER BY ${column} ${direction} `;
        return this;
    }

    limit(count, offset){
        this.query += `LIMIT ${count},${offset} `;
        return this;
    }

    count(alias) {
        this.query = `SELECT COUNT(${alias}) ${this.query} `;
        return this;
    }   

    async paginate(page = 1, perPage = 10){
        try {
            const countQuery = `SELECT COUNT(*) AS num_rows FROM ${this.connectionManager.table}`;
            const countResult = await this.connectionManager.executeQuery(countQuery);
            const totalRows = countResult[0].num_rows;

            const totalPages = Math.ceil(totalRows / perPage);

            const offset = (page - 1) * perPage;

            this.limit(offset, perPage);

            return {
                totalRows,
                totalPages,
                currentPage : page,
                perPage,
                data : await this.get()
            }
        } catch (error) {
            console.error('Error executing query ', error);
            throw new Error(error.message);
        }
    }

    async get(){
        try {
            const result = await this.connectionManager.executeQuery(this.query);

            return result;
        } catch (error) {
            console.error('Error executing query ', error);
            throw new Error(error.message);
        }
    }
}

module.exports = QueryBuilder;