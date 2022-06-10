const express = require('express')

const router = express.Router()

const controller = require('../controller/petsController')

router.get("/:id", controller.getPet)
router.post('/adicionar', controller.postPet)
router.patch("/:id/name", controller.updateName)
router.delete("/:id", controller.deletePet)

module.exports = router;