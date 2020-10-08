const Operacoes = require('../../infraestrutura/operations')

const Pets = new Operacoes('pet')

const resolvers = {
    Query: {
        pets: () => Pets.lista(),
        pet: (root, {id}) => Pets.buscaPorId(id),
    },
    Mutation: {
        adicionarPet: (root, params) => Pets.adiciona(params),
        atualizarPet: (root, params) => Pets.atualiza(params,
                params.id),
        deletarPet: (root, params) => Pets.deleta(params.id)

    },
}

module.exports = resolvers
