const ExampleModel = require('../models/example-model')
const BaseController = require('./base-controller')

class ExampleController extends BaseController {

    static async create(request){
        //any validation
        const exampleModel = new ExampleModel();

        try {
            const result = await exampleModel.store(request);

            return this.formatResponse(request, "Success create data");
        } catch (error) {
            console.error('Error create data ', error);
            throw new Error(error.message);
        }
    }

    static async show(id){
        //any validation
        const exampleModel = new ExampleModel();

        try {
            const result = await exampleModel.findBy('id_buku', id);

            return this.formatResponse(result, "Success Get Data");
        } catch (error) {
            console.error('Error show data ', error);
            throw new Error(error.message)
        }
    }

    static async getAll(page = 1, limit = 10){
        const exampleModel = new ExampleModel();

        try {
            const {totalRows, totalPages, currentPage, perPage , data} = 
            await exampleModel.queryBuilder
                            .select(['id_buku','nama_buku','harga'])
                            .orderBy('id_buku','DESC')
                            .paginate(page,limit);
            
            const { ...meta } = {totalRows,totalPages,currentPage,perPage}
                            
            return this.formatResponse(data , "Success get data", meta);
        } catch (error) {
            console.error('Error get data ', error);
            throw new Error(error.message);
        }
    }

    static async update(data,id){
        const exampleModel = new ExampleModel();

        try{
            const result = await exampleModel.update(data, id);

            return this.formatResponse(data, "Success Update Data");
        } catch(error) {
            console.error('Error update data', error);
            throw new Error(error.message);
        }
    }

    static async delete(id){
        const exampleModel = new ExampleModel();

        try {
            const result = await exampleModel.delete('id_buku', id);

            return this.formatResponse(result, "Success Delete Data");
        } catch (error) {
            console.error('Error delete data ', error);
            throw new Error(error.message);
        }
    }
}

module.exports = ExampleController;