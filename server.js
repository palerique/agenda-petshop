const {GraphQLServer} = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

const Operacoes = require('./infraestrutura/operations')

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    }
    console.log('conectou no banco')
    Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente')
const Pets = new Operacoes('pet')

const resolvers = {
    Query: {
        status: () => 'Servidor respondendo',
        clientes: () => Clientes.lista(),
        cliente: (root, {id}) => Clientes.buscaPorId(id),
        pets: () => Pets.lista(),
        pet: (root, {id}) => Pets.buscaPorId(id),
    },
    Mutation: {
        adicionarCliente: (root, params) => Clientes.adiciona(params),
        atualizarCliente: (root, params) => Clientes.atualiza(params,
                params.id),
        deletarCliente: (root, params) => Clientes.deleta(params.id),

        adicionarPet: (root, params) => Pets.adiciona(params),
        atualizarPet: (root, params) => Pets.atualiza(params,
                params.id),
        deletarPet: (root, params) => Pets.deleta(params.id)

    },
}

const servidor = new GraphQLServer({
    resolvers,
    typeDefs: './schema.graphql',
})
servidor.start(() => {
    console.log('Servidor Ouvindo!!!')
})
