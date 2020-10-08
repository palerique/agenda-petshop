const Operacoes = require('../../infraestrutura/operations')

const Servicos = new Operacoes('servico')

const resolvers = {
    Query: {
        servicos: () => Servicos.lista(),
        servico: (root, {id}) => Servicos.buscaPorId(id),
    },
    Mutation: {
        adicionarServico: (root, params) => Servicos.adiciona(params),
        atualizarServico: (root, params) => Servicos.atualiza(params,
                params.id),
        deletarServico: (root, params) => Servicos.deleta(params.id)
    },
}

module.exports = resolvers
