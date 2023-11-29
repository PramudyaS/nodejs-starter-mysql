
class BaseController {

    static formatResponse(data, message = 'Success',meta , code = 200){
        return {
            data ,
            code,
            message,
            meta
        }
    }

    static paginate(page = 1 , perPage = 10){
        const limit = (page - 1) * perPage;
        const offset = page * perPage;

        return {
            limit,
            offset
        }
    }
}

module.exports = BaseController;