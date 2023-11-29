const BaseModel = require("./base-model");

class ExampleModel extends BaseModel {
    constructor(){
        super('buku','id_buku')
    }
}

module.exports = ExampleModel;