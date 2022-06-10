const series = require('../models/series.json')
const fs = require('fs')


const getUma = (req, res) => {
    const serieId = req.params.id
    const serieFound = series.find(serie => serie.id == serieId)
    if (serieFound) {
        res.status(200).send(serieFound)
    } else {
        res.status(404).send({ message: "Serie não encontrado" })
    }
}

const getGenero = (req, res) => {
    let serieRequest = req.query.genre
    console.log(serieRequest)

    let serieFound = series.filter(serie => serie.genre.includes(serieRequest))

    console.log(serieFound)

    if (serieFound.length > 0) {
        res.status(200).send(serieFound)
    } else {
        res.status(404).send({ message: "Nao encontramos estabelecimento que atenda seu bichinho" })
    }
}

const postSerie = (req, res) => {
    const { id, name, genre, synopsis, seasons } = req.body
    pets.push({ id: pets.length + 1, name, genre, synopsis, seasons })

    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const serieFound = series.find(serie => serie.id == id)
            res.status(200).send(serieFound)
        }
    })
    res.status(200).send({ message: "sucesso" })
}

const updateSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const name = req.body.name
        const serieFound = series.find(serie => serie.id == serieId)
        const serieIndex = series.indexOf(serieFound)

        if (serieIndex >= 0) {
            serieFound.name = name
            series.splice(serieIndex, 1, serieFound)

            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const serieUpdated = series.find(serie => serie.id == serieId)
                    res.status(200).send(serieUpdated)
                }
            })
        } else {
            res.status(404).send({ message: "Serie não encontrada" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId)
        const serieIndex = series.indexOf(serieFound)

        if (serieIndex >= 0) {
            series.splice(serieIndex, 1)
            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    8
                    console.log("Serie deletada!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Serie não encontrada" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a serie" })
    }
}

module.exports = {
    getGenero,
    getUma,
    postSerie,
    updateSerie,
    deleteSerie
}
