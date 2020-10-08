const Operations = require('../infraestrutura/operations')

const Servicos = new Operations('servico')

module.exports = app => {
    app.get('/servicos', (req, res) => {
        Servicos.lista()
    })

    app.get('/servicos/servico/:id', (req, res) => {
        const {id} = req.params

        Servicos.buscaPorId(id)
    })

    app.post('/servicos/servico', (req, res) => {
        const servico = req.body

        Servicos.adiciona(servico)
    })

    app.put('/servicos/servico/:id', (req, res) => {
        const {id} = req.params
        const servico = req.body

        Servicos.atualiza(servico, id)
    })

    app.delete('/servicos/servico/:id', (req, res) => {
        const {id} = req.params

        Servicos.deleta(id)
    })
}
