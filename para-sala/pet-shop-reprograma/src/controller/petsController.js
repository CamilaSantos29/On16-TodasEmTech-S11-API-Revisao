const pets = require('../models/pets.json')
const fs = require('fs')


const getPet = (req, res) => {
    const petId = req.params.id
    const petFound = pets.find(pet => pet.id == petId)
    if (petFound) {
        res.status(200).send(petFound)
    } else {
        res.status(404).send({ message: "Pet não encontrado" })
    }
}

const postPet = (req, res) => {
    const { id, nomeFantasia, endereco, telefone, atende } = req.body
    pets.push({ id: pets.length + 1, nomeFantasia, endereco, telefone, atende })

    fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) { // gravando novo pet no array de pets
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const petFound = pets.find(pet => pet.id == id) // recupero o pet que foi criado no array de pets      
            res.status(200).send(petFound)
        }
    })
res.status(200).send({message: "sucesso"})
}

const updateName = (req, res) => {
    try {
        const petId = req.params.id
        const nomeFantasia = req.body.nomeFantasia
        const petFound = pets.find(pet => pet.id == petId) 
        const petIndex = pets.indexOf(petFound) 

        if (petIndex >= 0) { 
            petFound.nomeFantasia = nomeFantasia 
            pets.splice(petIndex, 1, petFound) 

            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const petpdated = pets.find(pet => pet.id == petId) 
                    res.status(200).send(petpdated) 
                }
            })
        } else {
            res.status(404).send({ message: "não encontrado " })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deletePet = (req, res) => {
    try {
        const petId = req.params.id
        const petFound = pets.find(pet => pet.id == petId) 
        const petIndex = pets.indexOf(petFound) 

        if (petIndex >= 0) { 
            pets.splice(petIndex, 1) 
            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {8
                    console.log("Pet deletado com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para ser deletado" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o pet" })
    }
}
module.exports = {
    getPet,
    postPet,
    updateName,
    deletePet
}


