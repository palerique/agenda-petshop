const Operacoes = require('../../infraestrutura/operations')

const Atendimentos = new Operacoes('atendimento')

const resolvers = {
    Query: {
        atendimentos: () => Atendimentos.lista(),
        atendimento: (root, {id}) => Atendimentos.buscaPorId(id),
    },
    Mutation: {
        adicionarAtendimento: (root, params) => Atendimentos.adiciona(params),
        atualizarAtendimento: (root, params) => Atendimentos.atualiza(params,
                params.id),
        deletarAtendimento: (root, params) => Atendimentos.deleta(params.id)

    },
}

module.exports = resolvers
