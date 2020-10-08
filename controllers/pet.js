const Operations = require('../infraestrutura/operations')

const Pets = new Operations('pet')

module.exports = app => {
    app.get('/pets', (req, res) => {
        Pets.lista()
    })

    app.get('/pets/pet/:id', (req, res) => {
        const {id} = req.params

        Pets.buscaPorId(id)
    })

    app.post('/pets/pet', (req, res) => {
        const pet = req.body

        Pets.adiciona(pet)
    })

    app.put('/pets/pet/:id', (req, res) => {
        const {id} = req.params
        const pet = req.body

        Pets.atualiza(pet, id)
    })

    app.delete('/pets/pet/:id', (req, res) => {
        const {id} = req.params

        Pets.deleta(id)
    })
}
