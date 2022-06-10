const express = require('express')

const router = express.Router()

const controller = require('../controller/seriesController')

router.get("/genero", controller.getGenero)
router.get("/:id", controller.getUMA)
router.post('/adicionar', controller.postSerie)
router.patch("/:id/name", controller.updateSerie)
router.delete("/:id", controller.deleteSerie)

module.exports = router;

