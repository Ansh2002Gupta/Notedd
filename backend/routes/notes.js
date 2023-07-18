const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        a: 'Ansh_notes',
        number: 23.2
    }
    res.json(obj)
})

module.exports = router