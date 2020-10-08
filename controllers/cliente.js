const Operations = require('../infraestrutura/operations')

const Clientes = new Operations('cliente')

module.exports = app => {
    app.get('/clientes', (req, res) => {
        Clientes.lista()
    })

    app.get('/clientes/cliente/:id', (req, res) => {
        const {id} = req.params

        Clientes.buscaPorId(id)
    })

    app.post('/clientes/cliente', (req, res) => {
        const cliente = req.body

        Clientes.adiciona(cliente)
    })

    app.put('/clientes/cliente/:id', (req, res) => {
        const {id} = req.params
        const cliente = req.body

        Clientes.atualiza(cliente, id)
    })

    app.delete('/clientes/cliente/:id', (req, res) => {
        const {id} = req.params

        Clientes.deleta(id)
    })
}
