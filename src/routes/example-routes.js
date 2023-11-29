var { Router } = require('express')

var router = Router()
const ExampleController = require('../controllers/example-controller')

//Grouping router
router.post('/store', async (req,res) => {
    try {
        const result = await ExampleController.create(req.body);

        res.send({
            message : result.message,
            data : result.data
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            data : null
        })
    }
});

router.get('/', async (req,res) => {
    try {
        const result = await ExampleController.getAll(1, 10);

        res.send({
            message : result.message,
            data : result.data,
            meta : result.meta
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            data : null
        })
    }
});

router.get('/:id', async (req,res) => {
    try {
        const result = await ExampleController.show(req.params.id);

        res.send({
            message : result.message,
            data : result.data[0] ?? null,
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            data : null
        })
    }
});

router.patch('/:id', async (req,res) => {
    try {
        const result = await ExampleController.update(req.body,req.params.id);

        res.send({
            message : result.message,
            data : result.data ?? null,
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            data : null
        })
    }
});

router.delete('/:id', async(req,res) => {
    try {
        const result = await ExampleController.delete(req.params.id);

        res.send({
            message : result.message,
            data : null
        });
    } catch (error) {
        res.status(500).send({
            message : error.message,
            data : null
        });
    }
})

module.exports = router;