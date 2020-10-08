const Operations = require('../infraestrutura/operations')

const Atendimentos = new Operations('atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimentos.lista()
    })

    app.get('/atendimentos/atendimento/:id', (req, res) => {
        const {id} = req.params

        Atendimentos.buscaPorId(id)
    })

    app.post('/atendimentos/atendimento', (req, res) => {
        const atendimento = req.body

        Atendimentos.adiciona(atendimento)
    })

    app.put('/atendimentos/atendimento/:id', (req, res) => {
        const {id} = req.params
        const atendimento = req.body

        Atendimentos.atualiza(atendimento, id)
    })

    app.delete('/atendimentos/atendimento/:id', (req, res) => {
        const {id} = req.params

        Atendimentos.deleta(id)
    })
}
